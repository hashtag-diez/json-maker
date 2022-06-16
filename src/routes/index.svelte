<script lang="ts">
  import { afterUpdate } from 'svelte';
  import Editor from '../components/Editor.svelte'
  import Preview from '../components/Preview.svelte'
  let nbEditor: number[] = []
  let listPreview: object[]= []

  afterUpdate(() => {
    console.log(listPreview)
  })    
  const addNewEditor = () => {
    const oldNbEditor = nbEditor
    oldNbEditor.push(Date.now())
    nbEditor = oldNbEditor
  }
</script>

<section style="background-color: #2b1354 ;">
  {#each listPreview as item}
    <Preview id={item.id} label={item.label} value={item.value} type={item.type}  />    
  {/each}
</section>

<section>
  <b>Edit JSON</b>
  <div>
    {#each nbEditor as id}
    <Editor id={id} bind:listPreview={listPreview} />    
    {/each}
  </div>
  {#if nbEditor.length == listPreview.length}
    <button on:click={addNewEditor}>
      + ADD
    </button>
  {/if}
</section>

<style>
  section{
    height: 50vh;
    width: 100%;
    padding: 20px 30px;
  }
</style>