<script lang="ts">  
  import type { NodeType } from "src/types/Node.type"
  import { ValueType } from '../types/Node.type'
  import { afterUpdate } from 'svelte';
  import Editor from '../components/Editor.svelte'
  import Node from '../components/Node.svelte'
  let nbEditor: number[] = []
  let listNode: NodeType[] = []

  const addNewEditor = () => {
    const oldNbEditor = nbEditor
    oldNbEditor.push(Date.now())
    nbEditor = oldNbEditor
  }
  afterUpdate(() => {
    console.log(listNode)
  })
</script>

<section style="background-color: #2b1354 ;">
  {#each listNode as item}
    <Node id={item.id} label={item.label} value={item.value} type={item.type}  />    
  {/each}
</section>

<section style="background: linear-gradient(#EBEAEF, #F6F8FE);">
  <div style="margin-bottom: 10px;">
    <b>Edit JSON</b>
  </div>
  <div>
    {#each nbEditor as id}
      <Editor id={id} parentId={0} bind:listNode={listNode} bind:nbEditor={nbEditor} />    
    {/each}
  </div>
  {#if nbEditor.length == listNode.length}
    <button on:click={() => addNewEditor()}>
      + ADD
    </button>
  {/if}
</section>

<style>
  section{
    font-family: 'Fredoka', sans-serif;
    height: 50vh;
    width: 100%;
    padding: 20px 30px;
  }
  section b {
    font-weight: 600;
    font-size: 26px;
  }
  button{
    cursor: pointer;
    font-family: 'Fredoka', sans-serif;
    background-color: transparent;
    border: 0;
    color: #B4B2BE;
    font-size: 16px;
  }
</style>