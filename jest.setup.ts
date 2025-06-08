import '@testing-library/jest-dom'
import './__mocks__/importMeta'

window.HTMLElement.prototype.scrollIntoView = jest.fn();