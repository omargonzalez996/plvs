<script>
	import VsArena from '../components/VsArena.svelte';
	import InputPlaylist from '../components/InputPlaylist.svelte';
	import { getPlayListID, getPlaylistUrls } from '../API/playlistApi';
	let loadedPL = false;
	let playlistData = [];

	const loadPlaylist = async (inputString) => {
		try {
			console.log('nope: ', inputString);
			let playlistID = await getPlayListID(inputString);
			await getPlaylistUrls(playlistID).then((data) => {
				playlistData = data;
				console.log(playlistData);
				loadedPL = true;
			});
		} catch (error) {
			console.log(error);
			loadedPL = false;
		}
	};
</script>

<div class="body">
	<div class="main-window">
		<div class="logo-title">
			<h1>PlaylistVS</h1>
			<p>v0.1</p>
		</div>
		{#if loadedPL}
			<VsArena {playlistData} />
		{:else}
			<InputPlaylist {loadPlaylist} />
		{/if}
	</div>
</div>

<style>
	:root {
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
		height: 100vh;
	}
	.body {
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 320px;
		min-height: 100vh;
	}
	.main-window {
		color: black;
		background-color: white;
		border-radius: 10px;
		min-width: 600px;
		min-height: 200px;
		display: block;
		align-items: center;
		justify-content: center;
		padding: 20px;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}
	.logo-title {
		display: flex;
		justify-content: center;
	}
</style>
