<script lang="ts">
  import type { NodeType } from "src/types/Node.type";
  import DisplayArray from "./Preview/DisplayArray.svelte";
  import DisplayBoolean from "./Preview/DisplayBoolean.svelte";
  import DisplayNumber from "./Preview/DisplayNumber.svelte";
  import DisplayObject from "./Preview/DisplayObject.svelte";
  import DisplayString from "./Preview/DisplayString.svelte";

  import { afterUpdate, SvelteComponent, SvelteComponentTyped } from "svelte";
  import { ValueType } from '../types/Node.type'  
  export let id: number
  export let label: string
  export let value:  null | string | number | boolean | NodeType[] | Array<number | string | boolean | NodeType>;
  export let type: ValueType
  let childNodes: NodeType[]
  if(type== ValueType.OBJECT){
     childNodes = value as NodeType[]
  }
  const associationValueType: Record<string, ValueType> = {
    "DisplayObject": ValueType.OBJECT, 
    "DisplayString": ValueType.STRING, 
    "DisplayBoolean": ValueType.BOOLEAN, 
    "DisplayNumber": ValueType.NUMBER, 
    "DisplayArray": ValueType.ARRAY,
  }
  const associationValueComponent: Record<string, typeof SvelteComponent> = {
    "DisplayString": DisplayString,     
    "DisplayObject": DisplayObject, 
    "DisplayBoolean": DisplayBoolean, 
    "DisplayNumber": DisplayNumber, 
    "DisplayArray": DisplayArray,
  }
  function getKeyByValue(value: ValueType): string {
  const res = Object.keys(associationValueType).find(key => associationValueType[key] == value)
  if(res === undefined){
    return "DisplayNumber"
  }
  return res;
}
  afterUpdate(() => {
    if(type== ValueType.OBJECT){
     childNodes = value as NodeType[]
    }    
  })
</script>
  <span> "{label}" </span>  : <svelte:component this={associationValueComponent[getKeyByValue(type)]} value={(type === ValueType.OBJECT ? childNodes : value)} />
<style>
  span{
    color: #E685D5;
  }
</style>
