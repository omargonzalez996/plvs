<script>
	import { onMount } from 'svelte';
	import { RandomIndex } from '../API/functions';
	import Icon from '@iconify/svelte';
	import Control from './Control.svelte';

	export let playlistData, setWinner;

	let leftVideo = {};
	let rightVideo = {};
	let contenders = [];
	let losers = [];
	let lIndex;
	let rIndex;
	let roundCount = 0;
	let contendersCount = 0;
	let losersCount = 0;
	let isLoading = true;

	onMount(() => {
		contenders = playlistData;
		contendersCount = contenders.length;
		if (contendersCount >= 2) {
			sortVids().then(() => {
				control();
			});
		}
	});

	const control = () => {
		console.log(`round: ${roundCount}`);
		console.log(`remaining: ${contendersCount}`);
		console.log(`losers: ${losersCount}`);
	};

	const sortVids = () => {
		return new Promise((resolve, reject) => {
			try {
				isLoading = true;
				if (contendersCount > 1) {
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
			isLoading = true;
			losers.push(loserIndex);
			losersCount = losers.length;
			contenders.splice(loserIndex, 1);
			contendersCount = contenders.length;
			if (contendersCount > 1) {
				sortVids().then(() => {
					control();
				});
			} else {
				setWinner(contenders[0]);
			}
			isLoading = false;
		} catch (error) {
			if (res) {
				isLoading = false;
				return console.log(res);
			}
			isLoading = false;
			return console.log(error);
		}
	};
</script>

<div>
	<Control {losersCount} {contendersCount} {roundCount} />
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
					<button disabled={isLoading} class="button" on:click={removeLoser(rIndex)}>CHOOSE</button>
				</div>
			</div>
			<h3 class="middle-vs">VS</h3>
			<div class="right-corner">
				<div class="vid-title-container">
					{#if rightVideo.title}
						<p class="vid-title">{`${rightVideo.title}`}</p>
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
					<button disabled={isLoading} class="button" on:click={removeLoser(lIndex)}>CHOOSE</button>
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
	.btn-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
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
	.button:hover {
		color: rgb(150, 15, 78);
		transition: ease-in-out;
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
