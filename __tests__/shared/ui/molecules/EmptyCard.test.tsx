import React from 'react'
import { render, screen } from '@testing-library/react'
import EmptyCard from '~/shared/ui/molecules/EmptyCard'

describe('EmptyCard', () => {
  it('should render the message prop correctly', () => {
    const message = 'No hay datos disponibles'
    render(<EmptyCard message={message} />)

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('should have the correct styling classes', () => {
    const message = 'Mensaje de prueba'
    const { container } = render(<EmptyCard message={message} />)

    expect(container.firstChild).toHaveClass('p-8', 'text-center')

    const text = screen.getByText(message)
    expect(text).toHaveClass('text-muted-foreground')
  })
})
