<script lang="ts">
  import type { PreviewType } from "src/types/Preview.type";
import { afterUpdate } from "svelte";
  import { ValueType } from '../types/Preview.type'  
  export let id: number
  export let label: string
  export let value: string | number | boolean | PreviewType[] | Array<number | string | boolean | PreviewType>;
  export let type: ValueType
  let childNodes: PreviewType[]
  if(type== ValueType.OBJECT){
     childNodes = value as PreviewType[]
  }
  afterUpdate(() => {
    if(type== ValueType.OBJECT){
     childNodes = value as PreviewType[]
    }    
    console.log("Node n°", id, ", changement opéré ! Contenu de childNodes : ", childNodes)
  })
</script>
<p>
  {label} :
  {#if type== ValueType.OBJECT}
    {"{"}
    <br>
    {#each childNodes  as item}
    <div class="emsp">
      <svelte:self id={item.id} label={item.label} value={item.value} type={item.type}  />    
    </div>
    {/each}
    {"}"}
  {:else if value != null}
    {value}
  {/if}
</p>
<style>
  .emsp{
    margin-left: 15px;
  }
  p{
    font-family: 'Fredoka', sans-serif;
    margin: 0;
    color: white;
  }
</style>