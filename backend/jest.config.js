// eslint-disable-next-line no-undef
module.exports = {
  setupFiles: ["<rootDir>/ts-jest-config.ts"],
  transform: {
    "^.+\\.ts?$": ["ts-jest", { compiler: "ttypescript" }],
  },
};
