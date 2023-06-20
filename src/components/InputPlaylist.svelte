<script>
	import { validatePlaylist, activateButton } from '../API/functions';
	import Icon from '@iconify/svelte';

	export let loadPlaylist;

	let inputString = '';
	let validPl = 0;
	let buttonActive = false;
	let isLoading = false;

	function handleInputChange(event) {
		inputString = event.target.value;
		validPl = validatePlaylist(inputString);
		buttonActive = activateButton(validPl);
	}

	const sendPL = () => {
		try {
			isLoading = true;
			buttonActive = false;
			loadPlaylist(inputString);
			isLoading = false;
		} catch (error) {
			console.log(error);
			isLoading = false;
		}
	};
</script>

<div>
	<div class="playlist-input-container">
		{#if isLoading}
			<div class="loading-icon">
				<Icon icon="eos-icons:loading" />
			</div>
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
					<button class="button" disabled={!buttonActive} on:click={sendPL}>Load Playlist</button>
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
		color: gray;
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
	.loading-icon {
		color: #5a5a5a;
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		font-size: 40px;
	}
</style>
