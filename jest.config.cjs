module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "^@atoms/(.*)$": "<rootDir>/app/shared/ui/atoms/$1",
    "^@molecules/(.*)$": "<rootDir>/app/shared/ui/molecules/$1",
    "^@organisms/(.*)$": "<rootDir>/app/shared/ui/organisms/$1",
    "^@store/(.*)$": "<rootDir>/app/shared/store/$1",
    "^@hooks/(.*)$": "<rootDir>/app/shared/hooks/$1",

    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(svg|png|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // transformá archivos TS/TSX con ts-jest
  },
  transformIgnorePatterns: ["node_modules/(?!(your-esm-package)/)"],
};
