import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
}) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect
        rx="2"
        width="32"
        height="32"
        className={clsx(
          'transition-all duration-300',
          invert ? 'fill-ivory' : 'fill-burgundy-900',
          filled ? 'opacity-10' : 'opacity-0 group-hover/logo:opacity-10',
        )}
      />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        className={clsx(
          'text-[20px] font-bold',
          invert ? 'fill-ivory' : 'fill-burgundy-900',
        )}
        style={{ fontFamily: 'Georgia, "Noto Serif", serif' }}
      >
        B
      </text>
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 32"
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <Logomark
        preserveAspectRatio="xMinYMid meet"
        invert={invert}
        filled={filled}
      />
      <text
        x="40"
        y="23"
        className={clsx(
          'text-[18px]',
          invert ? 'fill-ivory' : 'fill-burgundy-900',
        )}
        style={{ fontFamily: 'Georgia, "Noto Serif", serif' }}
      >
        Bahá&apos;í Winnipeg
      </text>
    </svg>
  )
}
