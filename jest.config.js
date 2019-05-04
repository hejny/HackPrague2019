module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
    // moduleFileExtensions: ['ts', 'tsx'],
    // testMatch: [
    //   'src/**/*.+test\.(ts|tsx)'
    // ]
};
