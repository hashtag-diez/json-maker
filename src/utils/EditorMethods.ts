import type { PreviewType } from "src/types/Preview.type";
import { ValueType } from '../types/Preview.type'
const associationStringValueType: Record<string, ValueType> = {
  String: ValueType.STRING,
  Number: ValueType.NUMBER,
  Boolean: ValueType.BOOLEAN,
  Array: ValueType.ARRAY,
  Object: ValueType.OBJECT
}
export const getLastParent = (listPreview: PreviewType[]): number => {
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
export function insertChildPreview (listPreview: PreviewType[], item: PreviewType): boolean {
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
export const updateListPreview = (hasParent: boolean, listPreview: PreviewType[], id: number, name: string, type: string, value: string | PreviewType[]) : PreviewType[] => {
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
  return oldListPreview
}