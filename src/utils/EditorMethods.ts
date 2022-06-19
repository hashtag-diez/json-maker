import type { NodeType } from "src/types/Node.type";
import { ValueType } from '../types/Node.type'
const associationStringValueType: Record<string, ValueType> = {
  String: ValueType.STRING,
  Number: ValueType.NUMBER,
  Boolean: ValueType.BOOLEAN,
  Array: ValueType.ARRAY,
  Object: ValueType.OBJECT
}
function insertChildNode (listNode: NodeType[], item: NodeType): boolean {
  let inserted = false
  for( let i = 0; i < listNode.length; i++){
    const node = listNode[i]
    if(node.type == ValueType.OBJECT){
      const nodeNodeList = node.value as NodeType[]
      if(node.id == item.parentId){
        nodeNodeList.push(item)
        inserted = true
        break;
      } else {
        inserted = insertChildNode(nodeNodeList, item)
        if(inserted){
          break;
        }
      }        
    }
  }
  return inserted
}
export const addNewItem = (parentId: number, listNode: NodeType[], id: number, name: string, type: string, value: string | NodeType[]) : [NodeType, NodeType[]] => {
  const oldListNode = listNode
  let newItem: NodeType = {
      id: id,
      label: name,
      type: associationStringValueType[type],
      value: (associationStringValueType[type] == ValueType.OBJECT ? [] :  value),
      parentId: parentId
    }
  if(parentId != 0){
    insertChildNode(oldListNode, newItem)
  } else {
    oldListNode.push({
      id: id,
      label: name,
      type: associationStringValueType[type],
      value: (associationStringValueType[type] == ValueType.OBJECT ? [] :  value),
      parentId: parentId
    })
  }
  return [newItem, oldListNode]
}

export const deleteItem = (nbEditor: number[], listNode: NodeType[], id: number) : [NodeType[], number[]] => {
  let oldNbEditor = nbEditor
  oldNbEditor = oldNbEditor.filter(editorId => editorId !== id)
  const oldListNode = listNode.filter(item => {
    if(item.type === ValueType.OBJECT){
      if(item.id === id){
        const childNodes = item.value as NodeType[]
        const childNodesId = childNodes.map(item => item.id)
        console.log("Liste des ids des enfants = ", childNodesId)
        oldNbEditor = oldNbEditor.filter(editorId => childNodesId.find(childId => editorId == childId)==undefined)
      } else {
        const childNodes = item.value as NodeType[]
        const [newChildNodes, newNbEditor] = deleteItem(oldNbEditor, childNodes, id)
        item.value = newChildNodes
        oldNbEditor = newNbEditor
      }
    }
    return item.id !== id
  })
  return [oldListNode, oldNbEditor]
}