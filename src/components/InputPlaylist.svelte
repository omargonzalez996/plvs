<script>
	import { onMount } from 'svelte';
	import { getPlayListID, getPlaylistUrls } from '../API/playlistApi';
	import { validatePlaylist, activateButton } from '../API/functions';
	import Icon from '@iconify/svelte';

	export let loadedPL;
	export let playlistData;

	let inputString = '';
	let validPl = 0;
	let buttonActive = false;
	let isLoading = true;

	onMount(() => {
		isLoading = false;
	});

	function handleInputChange(event) {
		validPl = validatePlaylist(event.target.value);
		buttonActive = activateButton(validPl);
	}

	const loadPlaylist = async () => {
		isLoading = true;
		try {
			buttonActive = false;
			let playlistID = await getPlayListID(inputString);
			await getPlaylistUrls(playlistID).then((data) => {
				playlistData = data;
				console.log(playlistData);
				loadedPL = true;
				isLoading = false;
			});
		} catch (error) {
			console.log(error);
			isLoading = false;
		}
	};
</script>

<div>
	<div class="playlist-input-container">
		{#if isLoading}
			<Icon icon="eos-icons:loading" />
		{:else}
			<input
				class:input={validPl === 0}
				class:correct={validPl === 1}
				class:incorrect={validPl === 2}
				placeholder="playlist URL"
				on:change={handleInputChange}
				name="playlist-input"
				type="text"
			/>
			<div class="under-input">
				<div class="left">
					<button class="button" disabled={!buttonActive} on:click={loadPlaylist}
						>Load Playlist</button
					>
				</div>
				<div class="right">
					{#if validPl === 0}
						<Icon icon="ph:playlist" style="color:black font-size: 60px" />
						<p class="input-info">Waiting input...</p>
					{/if}
					{#if validPl === 1}
						<Icon icon="gg:check-r" style="color:green" />
						<p class="input-info">Valid Playlist URL</p>
					{/if}
					{#if validPl === 2}
						<Icon icon="icomoon-free:cross" style="color:red" />
						<p class="input-info">Invalid Playlist URL</p>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.playlist-input-container {
		font-family: 'Open Sans', sans-serif;
		display: block;
		margin: 0 auto;
		& input {
			border: 1px solid gray;
			border-radius: 10px;
			padding: 10px;
			background-color: white;
			font-size: 13px;
			width: 96%;
			color: gray;
			&:focus {
				outline: none;
			}
		}
	}
	.correct {
		transition: 0.3s ease;
		outline: 2px solid lightgreen;
	}
	.incorrect {
		transition: 0.3s ease;
		outline: 2px solid red;
	}
	.under-input {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
		padding: 0px;
	}
	.left {
		padding-top: 10px;
		width: 90%;
	}
	.right {
		padding: 10px;
		width: 47%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.input-info {
		color: red;
	}

	.button {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
		color: #000;
		cursor: pointer;
		border: 3px solid;
		padding: 0.25em 0.5em;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
		position: relative;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	.button:active {
		box-shadow: 0px 0px 0px 0px;
		top: 5px;
		left: 5px;
	}
	.button:disabled {
		filter: contrast(30%);
		box-shadow: 0px 0px 0px 0px;
		top: 5px;
		left: 5px;
		pointer-events: none;
	}
</style>
