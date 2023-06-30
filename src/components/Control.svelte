<script>
	import SvelteTooltip from 'svelte-tooltip';
	export let losersCount, contendersCount, roundCount;
</script>

<div class="control-container">
	<div class="remaining">
		<SvelteTooltip tip="Elements still in the pool of contenders" bottom color="#fff">
			<h3>{`REMAINING: ${contendersCount}`}</h3>
		</SvelteTooltip>
	</div>
	<div class="round">
		<h3>{`ROUND: ${roundCount}`}</h3>
	</div>
	<div class="eliminated">
		<SvelteTooltip tip="Elements that have alread lost a match" bottom color="#fff">
			<h3>{`ELIMINATED: ${losersCount}`}</h3>
		</SvelteTooltip>
	</div>
</div>

<style>
	.control-container {
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		letter-spacing: 2px;
		text-decoration: none;
		text-transform: uppercase;
		position: fixed;
		top: 60px;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.remaining {
		background-color: white;
		padding: 25px;
		border: 3px solid;
		border-radius: 10px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
	.round {
		background-color: white;
		height: 20px;
		padding: 25px;
		border: 3px solid;
		border-radius: 10px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 50px;
		margin-right: 50px;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
	.eliminated {
		background-color: white;
		height: 20px;
		padding: 25px;
		border: 3px solid;
		border-radius: 10px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
	}
</style>
