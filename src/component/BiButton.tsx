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
  const buttonRadius = '0.25rem'
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        style={{
          width: '100%',
          borderRadius: `${buttonRadius} ${buttonRadius} 0 0`,
          border: '1px solid gray',
          borderBottom: 0,
          fontSize: 'inherit',
        }}
        {...button1Props}
      />
      <button
        style={{
          width: '100%',
          borderRadius: `0 0 ${buttonRadius} ${buttonRadius}`,
          border: '1px solid gray',
          fontSize: 'inherit',
        }}
        {...button2Props}
      />
    </div>
  )
}
