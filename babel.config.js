module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
        "@babel/preset-typescript"
      ],
      plugins: [
        [
          "@isograph",
          {
            // Point to where the generated __isograph folder is
            artifact_directory: "./src/components",
          }
        ],
        [
          "module-resolver",
          {
            root: ["./src"],
            alias: {
              "@": "./src",
              "@iso": "./src/components/__isograph/iso.ts",
            },
          },
        ],
      ]
    };
  };
