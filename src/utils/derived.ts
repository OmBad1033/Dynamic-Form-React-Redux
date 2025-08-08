import type { FieldSchema } from '../types/form'

export function dateDiffYears(dateString: string | undefined | null): number | '' {
  if (!dateString) return ''
  const d = new Date(dateString)
  if (Number.isNaN(d.valueOf())) return ''
  const now = new Date()
  let years = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--
  return years
}

// Safe evaluator: expose only a small set of helpers and parent values
export function evalDerived(
  field: FieldSchema,
  values: Record<string, unknown>,
): unknown {
  if (!field.derived?.isDerived) return undefined
  const parents = field.derived.parents || []
  const expr = field.derived.expression || ''
  const scope: Record<string, unknown> = {}
  for (const p of parents) scope[p] = values[p]
  scope.dateDiffYears = dateDiffYears
  scope.parseInt = parseInt
  scope.parseFloat = parseFloat
  scope.Math = Math
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('scope', `with (scope) { return (${expr}); }`)
    return fn(scope)
  } catch {
    return ''
  }
}

