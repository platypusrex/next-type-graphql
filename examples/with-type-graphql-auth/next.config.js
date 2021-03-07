const withPlugins = require('next-compose-plugins');
const withGraphql = require('next-plugin-graphql');

const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.module.rules.push({
        test: /\.(ts|tsx|js|jsx)$/,
        enforce: "pre",
        exclude: [/node_modules/, /.next.*/, /public/],
        use: [
          {
            loader: "eslint-loader",
            options: {
              emitWarning: true,
            },
          },
        ]
      });
    }
    return config;
  },
};

module.exports = withPlugins([
  withGraphql,
], nextConfig);
