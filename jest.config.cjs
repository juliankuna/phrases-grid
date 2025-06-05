module.exports = {
  preset: 'ts-jest', // clave para que Jest compile TS
  testEnvironment: 'jsdom', // para testing de React (browser-like)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // tu setup file
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // si usás estilos
    '\\.(svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js' // mocks para imágenes, ajustá según corresponda
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // transformá archivos TS/TSX con ts-jest
  },
  transformIgnorePatterns: ['node_modules/(?!(your-esm-package)/)'], // si necesitás transformar algún módulo ESM
}
