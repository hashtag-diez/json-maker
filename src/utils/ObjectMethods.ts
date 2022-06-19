import type { NodeType } from "src/types/Node.type";
import { ValueType } from '../types/Node.type'

export const findNode = (id:number, listNode: NodeType[]) : NodeType[] => {
  let res: NodeType[] = []
  for(let i = 0; i<listNode.length; i++){
    const currNode = listNode[i]
    if(currNode.id == id){
      res = currNode.value as NodeType[]
      break;
    }
    if(currNode.type == ValueType.OBJECT){
      const childNodes = currNode.value as NodeType[]
      res = findNode(id, childNodes)
      if(res != []){
        break;
      }
    }
  }
  return res
}