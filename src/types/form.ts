export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'

export type ValidationRule = {
  notEmpty?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  password?: boolean // placeholder for custom password rule
}

export type DerivedConfig = {
  isDerived?: boolean
  parents?: string[] // field ids of parents
  expression?: string // safe expression to compute the value
}

export type FieldSchema = {
  id: string
  name: string // unique key used in form values
  label: string
  type: FieldType
  required?: boolean
  defaultValue?: unknown
  options?: string[] // for select/radio/checkbox group
  validation?: ValidationRule
  derived?: DerivedConfig
  order: number
}

export type FormSchema = {
  id: string
  name: string
  createdAt: number
  fields: FieldSchema[]
}

