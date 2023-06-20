<script>
	import { onMount } from 'svelte';
	import { RandomIndex } from '../API/functions';
	import Icon from '@iconify/svelte';

	export let playlistData;

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
</script>

<div class="arena-container">
	{#if isLoading}
		<div class="loading-icon">
			<Icon icon="eos-icons:loading" />
		</div>
	{:else}
		<div>
			<div>
				<iframe
					width="300"
					height="200"
					title={`${leftVideo.title}`}
					src={leftVideo.videoUrl}
					frameborder="0"
				/>
			</div>
			<div>
				<iframe
					width="300"
					height="200"
					title={`${rightVideo.title}`}
					src={rightVideo.videoUrl}
					frameborder="0"
				/>
			</div>
		</div>
	{/if}
</div>
