<script lang="ts">
  import type { NodeType } from "src/types/Node.type";
  import { addNewItem, deleteItem } from "../utils/EditorMethods"
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons/index.es'
  import ObjectBlock from "./ObjectBlock.svelte";
import PrimitiveBlock from "./PrimitiveBlock.svelte";

  export let listNode: NodeType[];
  export let nbEditor: number[];
  export let parentId: number;
  export let id: number;
  let entity: NodeType
  let edited: boolean = false
  let name: string = ""
  let value: string | NodeType[] = ""
  let type: string = ""

  const handleNewItem = () => {
    const [newItem, oldListNode] = addNewItem(parentId, listNode, id, name, type, value)
    listNode = oldListNode
    edited = true
    entity = newItem
  }
  const handleDeletion = () => {
    const [ oldListNode, oldNbEdtior ] = deleteItem(nbEditor, listNode, id)
    listNode = oldListNode
    nbEditor = oldNbEdtior
  }
</script>
  {#if !edited}
    <form style="display: flex; gap: 10px">
      <input bind:value={name} type="text" name="" placeholder="Name" id="">
      <select bind:value={type} name="" id="">
        <option value="">type</option>
        <option value="Object">Object</option>
        <option value="String">String</option>
        <option value="Number">Number</option>
        <option value="Array">Array</option>
        <option value="Boolean">Boolean</option>
      </select>
      {#if type === ""} 
        <input bind:value={value} type="text" placeholder="Value" name="" id="" disabled>
      {:else if (type === "String" || type === "Array") }
        <input bind:value={value} type="text" placeholder="Value" name="" id="">
      {:else if (type === "Number")}
        <input bind:value={value} type="number" placeholder="Value" name="" id="">
      {:else if (type === "Boolean")}
        <select bind:value={value} name="" id="">
          <option value="">Value</option>
          <option value={true} selected>true</option>
          <option value={false}>false</option>  
        </select>    
      {/if}  
      {#if !edited && name!=="" && (type === "Object" || (type !== "Object" && value!=="")) && type!==""}
        <div class="validate" on:click={() => handleNewItem()}>
          <Fa 
            icon={faCheck} 
            style="cursor: pointer;"
            color="#ffffff"  
          />
        </div>
      {/if}
      <div
      on:click={() => handleDeletion()}
      >
        <Fa 
          style="cursor: pointer;"
          icon={faXmark} 
          color="#95a5a6"  
        /> 
      </div>
  </form>
    {:else if type=="Object"}
        <ObjectBlock id={id} bind:listNode={listNode} bind:nbEditor={nbEditor} bind:entity={entity}/>
    {:else}
        <PrimitiveBlock bind:listNode={listNode} bind:nbEditor={nbEditor} bind:entity={entity}/>
    {/if}

<style>
  form{
    background: #ffffff;
    padding: 7px;
    margin: 10px 0px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  form input:first-child{
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px
  }
  input[type="text"], input[type="number"], select{
    font-family: 'Fredoka', sans-serif;
    padding: 10px;
    background-color: #F1F5FD;
    border: 0;
    color: #34495e;
    padding-left: 12px;
    font-size: 16px;
  }
  input[type="text"]:focus, input[type="number"]:focus, select:focus{
    background-color: #E1E8F6;
    outline: none;
  }
  input[type="text"]::placeholder, input[type="number"]::placeholder{
    color: #95a5a6;
  }
  .validate{
    display: grid;
    place-items: center;
    padding: 13px 15px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #367AFC;
  }
</style>