<script>
	import Icon from '@iconify/svelte';
	export let winnerObj, isOpen;

	function closeModal() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="modal">
		<div class="modal-content">
			<div class="modal-title">
				<div class="icon-container">
					<Icon icon="mdi:crown" />
				</div>
				<h3 class="title">WINNER</h3>
			</div>
			<div class="winner-display">
				<div class="vid-title-container">
					{#if winnerObj.title}
						<p class="vid-title">{`${winnerObj.title}`}</p>
					{/if}
				</div>
				{#if !winnerObj}
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/dQw4w9WgXcQ"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay;  web-share"
					/>
				{:else}
					<iframe
						class="ifram"
						width="640"
						height="360"
						title="leftIframe"
						src={winnerObj.videoUrl}
						frameborder="0"
					/>
				{/if}
			</div>
			<div class="winner-confirmation">
				<button class="button" on:click={closeModal}>OK</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: black;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
	.modal-content {
		background-color: #fff;
		padding: 20px;
		display: block;
		border-radius: 10px;
	}
	.modal-title {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-container {
		background-color: transparent;
		font-size: 50px;
		color: rgb(212, 212, 0);
	}
	.title {
		font-family: 'Open Sans', sans-serif;
		font-size: 30px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
		color: #000;
	}
	.winner-display {
		background-color: #fff;
	}
	.vid-title-container {
		display: flex;
		justify-content: center;
	}
	.vid-title {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
	}
	.ifram {
		background-color: transparent;
		border: 5px black solid;
	}
	.winner-confirmation {
		margin: 10px;
		display: flex;
		justify-content: center;
	}
	.button {
		width: 200px;
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
		border-radius: 10px;
		color: #000;
		cursor: pointer;
		border: 3px solid;
		padding: 0.5em;
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
</style>
