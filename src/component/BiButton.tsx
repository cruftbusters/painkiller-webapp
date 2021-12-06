import React from 'react'

interface BiButtonProps {
  button1Props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
  button2Props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
}

export default function BiButton({
  button1Props,
  button2Props,
}: BiButtonProps) {
  return (
    <div style={{ display: 'flex' }}>
      <button
        style={{
          width: '100%',
          borderRadius: '0.25rem 0 0 0.25rem',
          border: '1px solid gray',
          borderRight: 0,
          fontSize: 'inherit',
        }}
        {...button1Props}
      />
      <button
        style={{
          width: '100%',
          borderRadius: '0 0.25rem 0.25rem 0',
          border: '1px solid gray',
          fontSize: 'inherit',
        }}
        {...button2Props}
      />
    </div>
  )
}
