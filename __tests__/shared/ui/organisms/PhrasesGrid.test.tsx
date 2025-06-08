import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PhrasesGrid from '@organisms/PhrasesGrid'

jest.mock('@store/phraseStore', () => ({
  usePhraseStore: jest.fn(),
}))
jest.mock('@store/categoryStore', () => ({
  useCategoryStore: jest.fn(),
}))
jest.mock('@hooks/usePersistPhrase', () => ({
  useUpdatePhrase: jest.fn(),
  useDeletePhrase: jest.fn(),
}))

const mockUpdatePhrase = jest.fn()
const mockRemovePhrase = jest.fn()

const samplePhrases = [
  {
    id: 1,
    description: 'Frase inspiradora',
    date: new Date('2024-01-01'),
    categoryId: 1,
    isFavorite: false,
  },
]

const sampleCategories = [{ id: 1, name: 'Motivación' }]

describe('PhrasesGrid', () => {
  beforeEach(() => {
    require('@store/phraseStore').usePhraseStore.mockImplementation((fn:any) =>
      fn({
        updatePhrase: mockUpdatePhrase,
        removePhrase: mockRemovePhrase,
      })
    )

    require('@store/categoryStore').useCategoryStore.mockImplementation(
      (fn:any) => fn({ categories: sampleCategories })
    )

    require('@hooks/usePersistPhrase').useUpdatePhrase.mockReturnValue({
      mutateAsync: jest.fn(),
    })

    require('@hooks/usePersistPhrase').useDeletePhrase.mockReturnValue({
      mutateAsync: jest.fn(),
    })
  })

  it('renderiza correctamente una frase', () => {
    render(<PhrasesGrid phrases={samplePhrases} />)

    expect(screen.getByText('Frase inspiradora')).toBeInTheDocument()
    expect(screen.getByText('Motivación')).toBeInTheDocument()
  })

  it('muestra mensaje cuando no hay frases', () => {
    render(<PhrasesGrid phrases={[]} />)

    expect(
      screen.getByText('No se encontraron frases que coincidan con tu búsqueda.')
    ).toBeInTheDocument()
  })

  it('permite editar una frase', async () => {
    render(<PhrasesGrid phrases={samplePhrases} />)

    const editButton = screen.getByLabelText('Editar frase')
    fireEvent.click(editButton)

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Nueva frase' } })

    const saveButton = screen.getByLabelText('Guardar frase')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockUpdatePhrase).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          description: 'Nueva frase',
        })
      )
    })
  })

  it('permite cancelar la edición', () => {
    render(<PhrasesGrid phrases={samplePhrases} />)

    const editButton = screen.getByLabelText('Editar frase')
    fireEvent.click(editButton)

    expect(screen.getByRole('textbox')).toBeInTheDocument()

    const cancelButton = screen.getByLabelText('Cancelar edición')
    fireEvent.click(cancelButton)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('elimina una frase al hacer click en el botón correspondiente', async () => {
    render(<PhrasesGrid phrases={samplePhrases} />)

    const deleteButton = screen.getByLabelText('Eliminar frase')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(mockRemovePhrase).toHaveBeenCalledWith(1)
    })
  })

  it('marca una frase como favorita', async () => {
    const mockMutateAsync = jest.fn()
    require('@hooks/usePersistPhrase').useUpdatePhrase.mockReturnValue({
      mutateAsync: mockMutateAsync,
    })

    render(<PhrasesGrid phrases={samplePhrases} />)

    const favButton = screen.getByLabelText('Marcar como favorita')
    fireEvent.click(favButton)

    await waitFor(() => {
      expect(mockUpdatePhrase).toHaveBeenCalledWith(
        expect.objectContaining({ isFavorite: true })
      )
    })
  })
})
