export enum ValueType{
  ARRAY = "Array",
  STRING = "String",
  NUMBER = "Number",
  BOOLEAN = "Boolean",
  OBJECT = "Object"
}
export type PreviewType = {
  id: number;
  parentId: number | null;
  label: string;
  type: ValueType;
  value: null | string | number | boolean | PreviewType[] | Array<number | string | boolean | PreviewType>;
};

export interface PreviewStringType extends PreviewType {
  value: string
}
export interface PreviewNumberType extends PreviewType {
  value: number
}
export interface PreviewBooleanType extends PreviewType {
  value: boolean
}
export interface PreviewArrayType extends PreviewType {
  value: Array<number | string | boolean | PreviewType>;
}
export interface PreviewObjectType extends PreviewType {
  value: PreviewType[]
}