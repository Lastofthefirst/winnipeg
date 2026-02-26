import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-burgundy-200' : 'text-burgundy-600',
      )}
    >
      <strong className={invert ? 'text-ivory' : 'text-burgundy-900'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Bahá'í Centre" invert={invert}>
          521 McMillan Ave
          <br />
          Winnipeg, MB R3L 0N4
          <br />
          <span className="mt-1 block">(204) 452-0139</span>
          <span className="block">LSA@winnipegbahais.org</span>
        </Office>
      </li>
    </ul>
  )
}
