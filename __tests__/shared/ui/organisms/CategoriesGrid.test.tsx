import { render, screen, fireEvent } from '@testing-library/react'
import CategoriesGrid from '@organisms/CategoriesGrid'

// Mockear hooks y store
jest.mock('@store/categoryStore', () => ({
  useCategoryStore: jest.fn()
}))

jest.mock('@hooks/usePersistCategory', () => ({
  useUpdateCategory: jest.fn(),
  useDeleteCategory: jest.fn()
}))

const mockUpdateCategory = jest.fn()
const mockRemoveCategory = jest.fn()

const sampleCategories = [
  { id: 1, name: 'Comida' },
  { id: 2, name: 'Viajes' }
]

describe('CategoriesGrid', () => {
  beforeEach(() => {
    // Reset mocks antes de cada test
    jest.clearAllMocks()

    const { useCategoryStore } = require("@store/categoryStore");
    useCategoryStore.mockImplementation((selector:any) =>
      selector({
        updateCategory: mockUpdateCategory,
        removeCategory: mockRemoveCategory,
        categories: sampleCategories
      })
    )

    const { useUpdateCategory, useDeleteCategory } = require("@hooks/usePersistCategory");
    useUpdateCategory.mockReturnValue({
      mutateAsync: jest.fn()
    })
    useDeleteCategory.mockReturnValue({
      mutateAsync: jest.fn()
    })
  })

  it('muestra EmptyCard si no hay categorías filtradas', () => {
    render(<CategoriesGrid filteredCategories={[]} />)

    expect(
      screen.getByText('No se encontraron categorías que coincidan con tu búsqueda.')
    ).toBeInTheDocument()
  })

  it('renderiza una lista de categorías', () => {
    render(<CategoriesGrid filteredCategories={sampleCategories} />)

    expect(screen.getByText('Comida')).toBeInTheDocument()
    expect(screen.getByText('Viajes')).toBeInTheDocument()
  })

  it('permite editar el nombre de una categoría', () => {
    render(<CategoriesGrid filteredCategories={sampleCategories} />)

    const editButtons = screen.getAllByLabelText('Editar categoría')
    fireEvent.click(editButtons[0])

    const input = screen.getByDisplayValue('Comida')
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Comida Editada' } })

    const saveButton = screen.getByLabelText('Guardar categoría')
    fireEvent.click(saveButton)

    expect(mockUpdateCategory).toHaveBeenCalledWith({
      id: 1,
      name: 'Comida Editada'
    })
  })

  it('permite cancelar la edición', () => {
    render(<CategoriesGrid filteredCategories={sampleCategories} />)

    fireEvent.click(screen.getAllByLabelText('Editar categoría')[0])
    fireEvent.click(screen.getByLabelText('Cancelar edición'))

    expect(screen.getByText('Comida')).toBeInTheDocument()
  })

  it('permite eliminar una categoría', () => {
    render(<CategoriesGrid filteredCategories={sampleCategories} />)

    const deleteButtons = screen.getAllByLabelText('Eliminar categoría')
    fireEvent.click(deleteButtons[0])

    expect(mockRemoveCategory).toHaveBeenCalledWith(1)
  })
})
