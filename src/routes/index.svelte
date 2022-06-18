<script lang="ts">  
  import type { PreviewType } from "src/types/Preview.type";
  import { ValueType } from '../types/Preview.type'
  import { afterUpdate } from 'svelte';
  import Editor from '../components/Editor.svelte'
  import Preview from '../components/Preview.svelte'
  let nbEditor: number[] = []
  let listPreview: PreviewType[] = []

  const addNewEditor = () => {
    const oldNbEditor = nbEditor
    oldNbEditor.push(Date.now())
    nbEditor = oldNbEditor
  }
  const countNodes = (listNodes: PreviewType[]) : number => {
    let res = 0
    listNodes.forEach(node => {
      res++
      if(node.type == ValueType.OBJECT){
        const childNodes = node.value as PreviewType[]
        res += countNodes(childNodes)
      }
    })
    return res
  }
  afterUpdate(() => {
    console.log(listPreview)
  })
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
  {#if nbEditor.length == countNodes(listPreview)}
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