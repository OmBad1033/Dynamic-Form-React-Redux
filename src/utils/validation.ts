import type { FieldSchema } from '../types/form'

export type ValidationError = string

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*\d).{8,}$/

export function validateField(field: FieldSchema, value: unknown): ValidationError[] {
  const errs: ValidationError[] = []
  const v = value == null ? '' : String(value)

  if (field.required || field.validation?.notEmpty) {
    if (!v) errs.push(`${field.label} is required`)
  }
  const min = field.validation?.minLength
  if (min != null && v && v.length < min) errs.push(`${field.label} must be at least ${min} chars`)
  const max = field.validation?.maxLength
  if (max != null && v && v.length > max) errs.push(`${field.label} must be at most ${max} chars`)
  if (field.validation?.email && v && !emailRegex.test(v)) errs.push(`${field.label} must be a valid email`)
  if (field.validation?.password && v && !passwordRegex.test(v))
    errs.push(`${field.label} must be 8+ chars and contain a number`)

  return errs
}

