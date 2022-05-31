<script lang="ts">
	import type { directions } from '../../types/css_types'
	export let handleClick: ((e: MouseEvent) => void) | undefined = undefined
	export let variant: 'round' | 'box'
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
	class:round={variant === 'round'}
	class:box={variant === 'box'}
	style="border-width: {top}px {right}px {bottom}px {left}px; "
	{src}
	alt="Avatar"
	on:click={handleClick}
/>

<style lang="postcss">
	img {
		width: var(--width, 100px);
		height: var(--height, 100px);
		object-fit: cover;
		border-style: solid;
		box-shadow: 0 0 var(--blur, 3px) $secondary;
		transform: rotate(var(--rotation, 0deg));
		border-color: $secondary;
	}

	.round {
		border-top-left-radius: 49% 51%;
		border-top-right-radius: 47% 54%;
		border-bottom-right-radius: 53% 48%;
		border-bottom-left-radius: 46% 52%;
	}

	.box {
		border-radius: 95% 4% 92% 5%/4% 95% 5% 95%;
	}

	.hover:hover {
		box-shadow: 0 0 var(--blur, 3px) $thirtary;
		border-color: $thirtary;
	}
</style>
