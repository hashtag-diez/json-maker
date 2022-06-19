<script lang="ts">
	export let nbEditor: number[];
	export let listNode: NodeType[];
	export let entity: NodeType;
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faHashtag,
		faHeading,
		faToggleOff,
		faList,
		faXmark
	} from '@fortawesome/free-solid-svg-icons/index.es';
	import type { SvelteComponent } from 'svelte';
	import { deleteItem } from '../utils/EditorMethods';
	import type { NodeType } from 'src/types/Node.type';
	const handleDeletion = () => {
		const [oldListNode, oldNbEdtior] = deleteItem(nbEditor, listNode, entity.id);
		listNode = oldListNode;
		nbEditor = oldNbEdtior;
	};
	const AssociationTypeIcon: Record<string, SvelteComponent> = {
		String: faHeading,
		Array: faList,
		Number: faHashtag,
		Boolean: faToggleOff
	};
	const AssociationTypeColor: Record<string, string> = {
		Number: '#2594E5',
		Array: '#9367CA',
		String: '#4EAB84',
		Boolean: '#F7874D'
	};
</script>

<div class="object">
	<div class="objectHeader">
		<aside>
			<div class="chevronWrapper">
				<Fa
					size="1x"
					scale={0.8}
					icon={AssociationTypeIcon[entity.type]}
					color={AssociationTypeColor[entity.type]}
				/>
			</div>
			<p style={'color: ' + AssociationTypeColor[entity.type] + ';'}>
				{entity.label}
			</p>
		</aside>
    <p>
      {entity.value}
    </p>
		<aside class="counter">
			<div style="margin-left: 10px" on:click={() => handleDeletion()}>
				<Fa style="cursor: pointer;" icon={faXmark} color="#95a5a6" />
			</div>
		</aside>
	</div>
</div>

<style>
	.object {
		display: flex;
		flex-direction: column;
		margin: 10px 0px;
    color: #95a5a6;
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
</style>
