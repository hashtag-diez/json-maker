<script lang="ts">
	import type { NodeType } from 'src/types/Node.type';
	import { deleteItem } from '../utils/EditorMethods';
	import { findNode } from '../utils/ObjectMethods';
	import Fa from 'svelte-fa/src/fa.svelte';
	import Editor from '../components/Editor.svelte';
	import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons/index.es';
	import { afterUpdate } from 'svelte';
	export let id: number;
	export let nbEditor: number[];
	export let listNode: NodeType[];
	export let entity: NodeType;

	let nbChildEditor: number[] = [];
	let childNodes: NodeType[] = findNode(id, listNode);

	afterUpdate(() => {
		console.log(id)
		console.log(listNode)
		childNodes = findNode(id, listNode);
		console.log(childNodes)
	});
	const addNewEditor = () => {
		const oldNbEditor = nbChildEditor;
		oldNbEditor.push(Date.now());
		nbChildEditor = oldNbEditor;
	};
	const handleDeletion = () => {
		const [oldListNode, oldNbEdtior] = deleteItem(nbEditor, listNode, id);
		listNode = oldListNode;
		nbEditor = oldNbEdtior;
	};
</script>

<div class="object">
	<div class="objectHeader">
		<aside>
			<div class="chevronWrapper">
				<Fa size="1x" scale={0.8} icon={faChevronDown} color="#ffffff" />
			</div>

			<p>
				{entity.label}
			</p>
		</aside>
		<aside class="counter">
			{'{ ' + childNodes.length + ' }'}
			<div style="margin-left: 10px" on:click={() => handleDeletion()}>
				<Fa style="cursor: pointer;" icon={faXmark} color="#95a5a6" />
			</div>
		</aside>
	</div>
	<div class="childNodes">
		{#each nbChildEditor as childId}
			<Editor id={childId} parentId={id} bind:listNode bind:nbEditor={nbChildEditor} />
		{/each}
		{#if nbChildEditor.length == childNodes.length}
			<button on:click={() => addNewEditor()}> + ADD </button>
		{/if}
	</div>
</div>

<style>
	.object {
		display: flex;
		flex-direction: column;
		margin: 10px 0px;
	}
	.childNodes {
		margin-left: 25px;
	}
	.counter {
		color: #95a5a6;
		font-weight: 500;
	}
	.objectHeader {
		width: 90%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: #ffffff;
		padding: 3px 10px;
		margin: 10px 0px;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}
	.objectHeader aside {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.chevronWrapper {
		padding: 1px 3px;
		background: #d8d9ea;
		border-radius: 5px;
		margin-right: 10px;
	}
	button {
		cursor: pointer;
		font-family: 'Fredoka', sans-serif;
		background-color: transparent;
		border: 0;
		color: #b4b2be;
		font-size: 16px;
		margin-top: 10px;
    margin-bottom: 10px;
	}
</style>
