<script lang="ts">
  import type { NodeType } from "src/types/Node.type";
import { afterUpdate } from "svelte";
  import { ValueType } from '../types/Node.type'  
  export let id: number
  export let label: string
  export let value: string | number | boolean | NodeType[] | Array<number | string | boolean | NodeType>;
  export let type: ValueType
  let childNodes: NodeType[]
  if(type== ValueType.OBJECT){
     childNodes = value as NodeType[]
  }
  afterUpdate(() => {
    if(type== ValueType.OBJECT){
     childNodes = value as NodeType[]
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