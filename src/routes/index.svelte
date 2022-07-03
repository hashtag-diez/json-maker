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
</script>

<section style="background-color: #2b1354; color: #6536B7" >
  <h2>Edit JSON</h2>
  <main id="test">
    {"{"}
    <div class="emsp">
    {#each listNode as item, i}
      <div class="emsp">
        <Node id={item.id} label={item.label} value={item.value} type={item.type} />{i !== listNode.length - 1 ? "," : ""}
      </div>
    {/each}
    </div>
    {"}"}
  </main>
</section>


<section style="background: linear-gradient(#EBEAEF, #F6F8FE);">
  <h2 style="color: black;">Edit JSON</h2>
  <div>
    {#each nbEditor as id}
      <Editor id={id} parentId={0} bind:listNode bind:nbEditor />    
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
    height: 100vh;
    width: 50%;
    padding: 20px 30px;
  }
  main#test *{
    font-family: 'Fira Code', monospace;
  }
  button{
    cursor: pointer;
    font-family: 'Fredoka', sans-serif;
    background-color: transparent;
    border: 0;
    color: #B4B2BE;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  h2{
    margin-bottom: 10px; 
    font-family: "Fredoka", sans-serif; 
    color: white;
    font-weight: 600;
    font-size: 26px;
  }
  .emsp{
    margin-left: 25px;
  }
</style>