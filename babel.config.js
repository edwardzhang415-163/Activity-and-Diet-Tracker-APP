module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   [
    //     'module-resolver',
    //     {
    //       root: ['./'],
    //       extensions: [
    //         '.ios.js',
    //         '.android.js',
    //         '.js',
    //         '.json',
    //       ],
    //       alias: {
    //         '@': './',
    //       },
    //     },
    //   ],
    //   ['@babel/plugin-transform-react-jsx', {
    //     throwIfNamespace: false
    //   }]
    // ],
  };
};