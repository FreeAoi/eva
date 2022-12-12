/** @type {import('jest').Config} */
const config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: ".",
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': ['@swc/jest'],
    }
};

module.exports = config;