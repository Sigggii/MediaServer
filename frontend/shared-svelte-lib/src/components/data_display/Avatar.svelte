<script lang="ts">
	import type { directions } from '../../types/css_types'
	export let handleClick: ((e: MouseEvent) => void) | undefined = undefined
	export let width: number
	export let src: string
	export let hover = true
	export let { top, right, bottom, left }: directions = {
		top: 5,
		right: 4,
		bottom: 3,
		left: 2
	}
</script>

<img
	class:hover
	style="width: {width}px; border-width: {top}px {right}px {bottom}px {left}px; "
	{src}
	alt="Avatar"
	on:click={handleClick}
/>

<style lang="postcss">
	img {
		border-top-left-radius: 49% 51%;
		border-top-right-radius: 47% 54%;
		border-bottom-right-radius: 53% 48%;
		border-bottom-left-radius: 46% 52%;
		border-style: solid;
		box-shadow: 0 0 var(--blur, 3px) $secondary;
		border-color: $secondary;
	}

	.hover:hover {
		border-color: $thirtary;
	}
</style>
