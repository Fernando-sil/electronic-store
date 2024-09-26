/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest", { tsConfig: "tsconfig.app.json" }],
    // "^.+\\.(js|ts)$": "babel-jest",
  },

  setupFilesAfterEnv: ["jest-fetch-mock"],

  // transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$|pdfjs-dist))"],
};
