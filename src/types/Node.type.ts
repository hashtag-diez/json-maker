export enum ValueType{
  ARRAY = "Array",
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  OBJECT = "Object"
}
export type NodeType = {
  id: number;
  parentId: number | null;
  label: string;
  type: ValueType;
  value: null | string | number | boolean | NodeType[] | Array<number | string | boolean | NodeType>;
};

export interface NodeStringType extends NodeType {
  value: string
}
export interface NodeNumberType extends NodeType {
  value: number
}
export interface NodeBooleanType extends NodeType {
  value: boolean
}
export interface NodeArrayType extends NodeType {
  value: Array<number | string | boolean | NodeType>;
}
export interface NodeObjectType extends NodeType {
  value: NodeType[]
}