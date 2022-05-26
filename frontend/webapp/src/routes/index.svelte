<script lang="ts">
	import { media } from '../base/stores/media.js'
	import Avatar from 'shared-svelte-lib/src/components/Avatar.svelte'
	const url = 'https://vampster.com/wp-content/uploads/Lord-Of-The-Lost-Judas-800x750.jpg'
</script>

{#if $media.xl}
	<Avatar src={url} pixelWidth={300} />
{:else}
	<Avatar src={url} pixelWidth={100} />
{/if}
