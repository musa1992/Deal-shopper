module.exports = {
    preset: 'jest-puppeteer',
    roots: [
        "./src/specs/puppeteer",
        "./src/specs/specs"
    ],
    testTimeout: 100000,
};