import { Children, ReactNode } from 'react'

interface StackChildrenProps {
  children: ReactNode
}

export default function StackChildren({ children }: StackChildrenProps) {
  return (
    <div
      style={{
        flex: '1 1 auto',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {Children.map(children, (child) => (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
