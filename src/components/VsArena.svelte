<script>
	import { onMount } from 'svelte';
	import { RandomIndex } from '../API/functions';
	import Icon from '@iconify/svelte';

	export let playlistData, setWinner;

	let leftVideo = {};
	let rightVideo = {};
	let contenders = [];
	let losers = [];
	let lIndex;
	let rIndex;
	let roundCount = 0;
	let isLoading = true;
	onMount(() => {
		contenders = playlistData;
		if (contenders.length >= 2) {
			sortVids().then(() => {
				control();
			});
		}
	});

	const control = () => {
		console.log(`round: ${roundCount}`);
		console.log(`remaining: ${contenders.length}`);
		console.log(`losers: ${losers.length}`);
	};

	const sortVids = () => {
		return new Promise((resolve, reject) => {
			try {
				isLoading = true;
				if (contenders.length > 1) {
					roundCount++;
					do {
						lIndex = RandomIndex(contenders);
						rIndex = RandomIndex(contenders);
					} while (lIndex == rIndex);
					leftVideo = contenders[lIndex];
					rightVideo = contenders[rIndex];
					console.log('leftVideo', leftVideo);
					console.log('rightVideo', rightVideo);
					isLoading = false;
				} else {
					//ended = true;
					console.log('Winner: ', contenders);
					isLoading = false;
				}
				resolve();
			} catch (error) {
				isLoading = false;
				reject(console.log(error));
			}
		});
	};

	const removeLoser = (loserIndex) => {
		try {
			losers.push(loserIndex);
			contenders.splice(loserIndex, 1);
			if (contenders.length > 1) {
				sortVids().then((res) => {
					console.log(res);
					control();
				});
			} else {
				setWinner(contenders[0]);
			}
		} catch (error) {
			if (res) {
				return console.log(res);
			}
			return console.log(error);
		}
	};
</script>

<div>
	{#if isLoading}
		<div class="loading-icon">
			<Icon icon="eos-icons:loading" />
		</div>
	{:else}
		<div class="arena-container">
			<div class="left-corner">
				<div class="vid-title-container">
					{#if leftVideo.title}
						<p class="vid-title">{`${leftVideo.title}`}</p>
					{/if}
				</div>
				<iframe
					class="ifram"
					width="640"
					height="360"
					title="leftIframe"
					src={leftVideo.videoUrl}
					frameborder="0"
				/>
				<div class="btn-container">
					<button class="button" on:click={removeLoser(rIndex)}>CHOOSE</button>
				</div>
			</div>
			<h3 class="middle-vs">VS</h3>
			<div class="right-corner">
				<div class="vid-title-container">
					{#if rightVideo.title}
						<p class="vid-title">{`${leftVideo.title}`}</p>
					{/if}
				</div>
				<iframe
					class="ifram"
					width="640"
					height="360"
					title="rightIframe"
					src={rightVideo.videoUrl}
					frameborder="0"
				/>
				<div class="btn-container">
					<button class="button" on:click={removeLoser(lIndex)}>CHOOSE</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.arena-container {
		padding: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.left-corner {
		display: block;
		align-items: center;
	}
	.right-corner {
		display: block;
		align-items: center;
	}
	.ifram {
		width: 100%;
		min-height: 320px;
	}
	.vid-title-container {
		height: 50px;
		margin-bottom: 5px;
	}
	.vid-title {
		font-size: 16px;
		text-align: center;
	}
	.button {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
		color: #000;
		border-radius: 10px;
		cursor: pointer;
		border: 3px solid;
		padding: 0.25em 0.5em;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
		position: relative;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}
	.btn-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
	}
	/*
	.button-right {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		border-radius: 10px;
		text-transform: uppercase;
		color: #000;
		cursor: pointer;
		border: 3px solid;
		padding: 0.25em 0.5em;
		box-shadow: -1px 1px 0px 0px, -2px 2px 0px 0px, -3px 3px 0px 0px, -4px 4px 0px 0px,
			-5px 5px 0px 0px;
		position: relative;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}
	*/
	.button:active {
		box-shadow: 0px 0px 0px 0px;
		top: 5px;
		left: 5px;
	}
	/*
	.button-right:active {
		box-shadow: 0px 0px 0px 0px;
		top: 5px;
		right: 5px;
	}
	*/

	.middle-vs {
		margin-left: 10px;
		margin-right: 10px;
		font-size: 20px;
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
