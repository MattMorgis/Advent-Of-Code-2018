module.exports = wallaby => {
  return {
    files: ["src/**/*.js", "!src/**/*.test.js"],

    tests: ["src/**/*.test.js"],

    testFramework: "mocha",

    env: {
      type: "node",
      runner: "/Users/matt/.nvm/versions/node/v10.14.0/bin/node" // or full path to any node executable
    }
  };
};
