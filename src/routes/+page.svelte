<script>
	import VsArena from '../components/VsArena.svelte';
	import InputPlaylist from '../components/InputPlaylist.svelte';
	let loadedPL = false;
	let playlistData = [];
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
			<InputPlaylist {loadedPL} {playlistData} />
		{/if}
	</div>
</div>

<style>
	:root {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
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
		border-radius: 20px;
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
