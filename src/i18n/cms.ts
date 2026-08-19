/**
 * Merge CMS-editable fields over dictionary defaults.
 * CMS values take precedence; dictionary provides safe fallbacks.
 */
export function mergeCms<T extends Record<string, unknown>>(defaults: T, cms: Partial<T>): T {
  return { ...defaults, ...cms }
}
