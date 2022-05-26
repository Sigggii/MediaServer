<script lang="ts">
	export let src: string;
	export let pixelWidth: number;
</script>

<div style="width: {pixelWidth + 'px'}">
	<img {src} alt="Avatar" />
</div>

<style>
	img {
		width: 100%;
		border-radius: 50%;
	}
</style>
