<script lang="ts">
	import { clickOutside } from '../../../actions/click_outside'
	import type { ISelectItem } from './model'
	import SelectItem from './SelectItem.svelte'

	export let selectedItem: string
	export let selectItems: ISelectItem[]
	export let label: string

	let atLeastOpenedOnce = false
	let showListContainer = false
	let selectedItemTitle = selectItems.find((item) => item.value === selectedItem)?.title ?? ''
	$: isItemSelected = selectedItemTitle !== ''

	const handleClick = () => {
		showListContainer = !showListContainer
		atLeastOpenedOnce = true
	}

	const handleCloseList = () => {
		showListContainer = false
	}

	const handleSelect = (item: ISelectItem) => {
		selectedItemTitle = item.title
		selectedItem = item.value
	}
</script>

<div class="select" use:clickOutside={handleCloseList}>
	<div
		class="selected-value-container"
		class:show-list-header={showListContainer}
		on:click={handleClick}
	>
		<span
			class="label selected-value"
			class:label-move={isItemSelected || showListContainer}
			class:label-move-reverse={!isItemSelected && !showListContainer && atLeastOpenedOnce}
			>{label}</span
		>
		<span
			class="selected-value"
			class:selected-value-display-none={!isItemSelected && !showListContainer}
			class:selected-value-diplay-hidden={!isItemSelected && showListContainer}
			>{isItemSelected ? selectedItemTitle : label}</span
		>
		<span class="arrow" style="align-self: end;">{showListContainer ? '\u25B2' : '\u25BC'}</span>
	</div>
	<div
		on:click={handleCloseList}
		class="select-list-container"
		class:show-list-container={showListContainer}
	>
		{#each selectItems as item}
			<SelectItem
				selected={item.value === selectedItem}
				title={item.title}
				on:selected-item={() => handleSelect(item)}
			/>
		{/each}
	</div>
</div>

<style lang="postcss">
	.select {
		min-width: var(--min-width, 100px);
		font-size: var(--font-size, x-large);
		display: grid;
		grid-template-rows: [header] 40px [body] auto [end];
		position: absolute;
	}

	.selected-value-container {
		grid-row-start: header;
		grid-row-end: body;
		display: inline-flex;
		border-style: solid;
		border-radius: 0 0 5% 2% / 0 0 2% 5%;
		border-width: 0 0 2px 0;
		box-shadow: 0px 4px 3px -5px $secondary;
		border-color: $secondary;
		color: $secondary;
	}

	.selected-value {
		margin-right: 10px;
		align-self: end;
	}

	.selected-value-display-none {
		display: none;
	}

	.selected-value-diplay-hidden {
		visibility: hidden;
	}

	.arrow {
		font-size: small;
		margin-bottom: 4px;
		margin-left: auto;
	}

	.select-list-container {
		grid-row-start: body;
		grid-row-end: end;
		display: none;
		border-style: solid;
		border-width: 0 0 2px 0;
		border-radius: 0 0 5% 2% / 0 0 2% 2%;
		box-shadow: 0px 4px 3px -5px $secondary;
		border-color: $secondary;
	}

	/* if dropdown-list open */

	.show-list-container {
		display: inline-block;
	}

	.show-list-header {
		border-width: 0 0 0 0;
		box-shadow: 0 0 0 $secondary;
	}

	/*Label*/
	.label {
		color: gray;
	}

	.label-move {
		position: absolute;
		animation-name: move;
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
		color: $thirtary;
	}

	.label-move-reverse {
		animation-name: move-reverse;
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
	}

	@keyframes move {
		from {
			transform: translate();
			color: gray;
		}
		to {
			transform: translate(0px, -25px);
			color: $thirtary;
		}
		100% {
			font-size: small;
		}
	}

	@keyframes move-reverse {
		from {
			transform: translate(0px, -25px);
			font-size: small;
			color: $thirtary;
		}
		to {
			transform: translate();
			font-size: var(--font-size, x-large);
			color: gray;
		}
	}
</style>
