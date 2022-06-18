<script lang="ts">
  import type { PreviewType } from "src/types/Preview.type";
  import { ValueType } from '../types/Preview.type'
  export let listPreview: PreviewType[];
  export let id: number;
  let edited: boolean = false
  let name: string = ""
  let value: string | PreviewType[] = null
  let type: string = ""
  let hasParent: boolean = false
  const associationStringValueType: Record<string, ValueType> = {
    String: ValueType.STRING,
    Number: ValueType.NUMBER,
    Boolean: ValueType.BOOLEAN,
    Array: ValueType.ARRAY,
    Object: ValueType.OBJECT
  }
  const getLastParent = (listPreview: PreviewType[]) => {
    let res = -1
    listPreview.forEach(item => {
      if(item.type == ValueType.OBJECT){
        const childNodes = item.value as PreviewType[]
        const innerParentId = getLastParent(childNodes)
        res = (innerParentId == -1 ? item.id : innerParentId)
      }
    })
    console.log(res)
    return res
  }
  function insertChildPreview (listPreview: PreviewType[], item: PreviewType): boolean {
    let inserted = false
    for( let i = 0; i < listPreview.length; i++){
      const node = listPreview[i]
      if(node.type == ValueType.OBJECT){
        const nodePreviewList = node.value as PreviewType[]
        if(node.id == item.parentId){
          nodePreviewList.push(item)
          inserted = true
          break;
        } else {
          inserted = insertChildPreview(nodePreviewList, item)
          if(inserted){
            break;
          }
        }        
      }
    }
    return inserted
  }
  const updateListPreview = () => {
    const oldListPreview = listPreview
    let parentId = null
    let newItem: PreviewType = {
        id: id,
        label: name,
        type: associationStringValueType[type],
        value: (associationStringValueType[type] == ValueType.OBJECT ? [] :  value),
        parentId: parentId
      }
    if(hasParent){
      newItem.parentId = getLastParent(oldListPreview)
      insertChildPreview(oldListPreview, newItem)
    } else {
      oldListPreview.push({
        id: id,
        label: name,
        type: associationStringValueType[type],
        value: (associationStringValueType[type] == ValueType.OBJECT ? [] :  value),
        parentId: parentId
      })
    }
    listPreview = oldListPreview
    edited = true
  }
</script>
<div style="display: flex; gap: 10px">
  <input bind:value={name} type="text" name="" placeholder="Name" id="">
  <div>
    <input bind:checked={hasParent} type="checkbox" name="hasParent" id="">
    <label for="hasParent">parent ?</label>
  </div>
  <select bind:value={type} name="" id="">
    <option value="">type</option>
    <option value="Object">Object</option>
    <option value="String">String</option>
    <option value="Number">Number</option>
    <option value="Array">Array</option>
    <option value="Boolean">Boolean</option>
  </select>
  {#if type !== 'Object'} 
    <input bind:value={value} type="text" placeholder="Value" name="" id="">
  {/if}  
  {#if !edited && name!=="" && (type === "Object" || (type !== "Object" && value!=="")) && type!==""}
    <button on:click={() => updateListPreview()}>GO</button>
  {/if}  
</div>