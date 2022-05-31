<script lang="ts">
	import Avatar from 'shared-svelte-lib/src/components/data_display/Avatar.svelte'
	import Select from 'shared-svelte-lib/src/components/inputs/select/Select.svelte'
	import type { ISelectItem } from '../../../shared-svelte-lib/src/components/inputs/select/model'

	const selectItems: ISelectItem[] = [
		{ value: '', title: '' },
		{ value: '1', title: 'Album' },
		{ value: '2', title: 'Single' },
		{ value: '3', title: 'Hörbuch' }
	]
	const src = 'https://f4.bcbits.com/img/a0235684232_7.jpg'

	let selectedItem = ''
</script>

<Avatar variant={'round'} {src} />
<Select label={'Kategorie'} bind:selectedItem {selectItems} />
