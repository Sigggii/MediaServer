<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let title: string
	export let selected: boolean
	const dipatch = createEventDispatcher<{ 'selected-item': undefined }>()

	const handleClick = () => {
		dipatch('selected-item')
	}
</script>

<div class:selected on:click={handleClick}>{title}</div>

<style lang="postcss">
	div {
		color: $secondary;
	}

	div:hover,
	.selected {
		border-style: solid;
		border-width: 0 2px 0 2px;
		border-radius: 2%;
	}

	div:hover {
		border-color: $secondary;
	}

	.selected {
		border-color: $thirtary;
	}
</style>
