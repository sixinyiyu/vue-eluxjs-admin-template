export interface SchemaItem {
  name: string;
  title: string;
  required: boolean;
  component: string;
  defaultValue: string | number | undefined;
  value?: string | number | undefined;
  width?: number | undefined;
  placeholder?: string;
  allowClear?: boolean;
  multiple?: boolean;
  options?: Option[] | undefined;
  col?: number;
  cite?: number;
}

export interface Option {
  label: string;
  value: string | number;
}
