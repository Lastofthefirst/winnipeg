import clsx from 'clsx'

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'address'> & { invert?: boolean }) {
  return (
    <address
      {...props}
      className={clsx(
        'not-italic',
        invert ? 'text-burgundy-200' : 'text-burgundy-600',
        props.className,
      )}
    >
      <strong
        className={clsx(
          'font-display text-lg font-semibold',
          invert ? 'text-white' : 'text-burgundy-900',
        )}
      >
        Bahá&apos;í Centre of Winnipeg
      </strong>
      <p className="mt-3 text-sm">
        521 McMillan Ave
        <br />
        Winnipeg, MB R3L 0N4
      </p>
      <p className="mt-3 text-sm">
        (204) 452-0139
        <br />
        LSA@winnipegbahais.org
      </p>
    </address>
  )
}
