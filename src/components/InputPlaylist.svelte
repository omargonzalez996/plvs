<script>
	export let loadedPL;
	export let playlistData;
	import { getPlayListID, getPlaylistUrls } from '../API/playlistApi';
	import { validatePlaylist } from '../API/functions';
	let inputString = '';
	let validPl = 0;
	let buttonActive = false;

	function handleInputChange(event) {
		validPl = validatePlaylist(event.target.value);

	}

	const loadPlaylist = async () => {
		try {
			buttonActive = false;
			let playlistID = await getPlayListID(inputString);
			await getPlaylistUrls(playlistID).then((data) => {
				playlistData = data;
				loadedPL = true;
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div>
	<div class="playlist-input-container">
		<input
			class:incorrect{validPl}
			placeholder="playlist URL"
			on:change={handleInputChange}
			name="playlist-input"
			type="text"
		/>
		<div class="under-input">
			<div class="left">
				<button disabled={!buttonActive} onClick={() => loadPlaylist()}>Load Playlist</button>
			</div>
			<div class="right">
				<p class="input-info">{validPl == 0 ? null : validPl == 2 ? 'Invalid URL' : null}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.playlist-input-container {
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
</style>
