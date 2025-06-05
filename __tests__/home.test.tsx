import { render, screen } from '@testing-library/react'
import { HomePage } from '~/pages/Home'

jest.mock('./logo-dark.svg', () => 'logo-dark.svg')
jest.mock('./logo-light.svg', () => 'logo-light.svg')

describe('HomePage', () => {
  it('renders light and dark logos', () => {
    const { container } = render(<HomePage />)

      const logoLight = screen.getByTestId('logo-light')
      expect(logoLight).toBeInTheDocument()
      expect(logoLight).toHaveAttribute('src', 'logo-light.svg')

      const logoDark = screen.getByTestId('logo-dark')
      expect(logoDark).toBeInTheDocument()
      expect(logoDark).toHaveAttribute('src', 'logo-light.svg')


    // ejemplo para el container si querés validar algo con querySelector
    const allSvgs = container.querySelectorAll('svg')
    expect(allSvgs.length).toBeGreaterThanOrEqual(2)
  })

  it('renders all navigation links with correct hrefs and texts', () => {
    render(<HomePage />)

    const links = screen.getAllByRole('link')

    expect(links).toHaveLength(2)

    expect(links[0]).toHaveAttribute('href', 'https://reactrouter.com/docs')
    expect(links[0]).toHaveTextContent('React Router Docs')
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveAttribute('rel', 'noreferrer')

    expect(links[1]).toHaveAttribute('href', 'https://rmx.as/discord')
    expect(links[1]).toHaveTextContent('Join Discord')
  })

  it('renders the "What\'s next?" paragraph', () => {
    render(<HomePage />)
    const text = screen.getByText("What's next?")
    expect(text).toBeInTheDocument()
  })
})
