module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(types|lib|components|utils)/(.*)$': '<rootDir>/src/$1/$2',
  },
}
