<script>
	import VsArena from '../components/VsArena.svelte';
	import InputPlaylist from '../components/InputPlaylist.svelte';
	import Winner from '../components/Winner.svelte';
	import { getPlayListID, getPlaylistUrls } from '../API/playlistApi';

	let loadedPL = false;
	let playlistData = [];
	let winnerObj = {
		title: 'Rick Astley - Never Gonna Give You Up',
		videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
	};
	let isOpen = true;

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

	const setWinner = (winner) => {
		try {
			winnerObj = winner;
		} catch (error) {
			console.log(error);
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
			<VsArena {playlistData} {setWinner} />
		{:else}
			<InputPlaylist {loadPlaylist} />
		{/if}
	</div>
	<Winner {isOpen} {winnerObj} />
	<div class="footer">
		<p>GonzDev.2023</p>
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
		padding: 25px;
		border: 3px solid;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
	.logo-title {
		display: flex;
		justify-content: center;
	}
	.footer {
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%, -50%);
		color: black;
		background-color: #fff;
		border-radius: 10px;
		padding-left: 10px;
		padding-right: 10px;
		border: 3px solid;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
