
module.exports = function (api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        // "debug": true,
        "useBuiltIns": "usage",
        // "targets": {
        //   "ie": "11",
        //   "chrome": "latest"
        // }
        corejs: { version: 3, proposals: true }
      },
    ],
    '@babel/preset-flow',
  ];
  const plugins = [
    'add-module-exports',
    'transform-imports',
    'transform-inline-environment-variables'
  ];

  api.cache(false);

  return {
    presets,
    plugins,
  };
};
