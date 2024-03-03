import { join } from 'path';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.fallback = {
      fs: false,
      path: false,
    };
    return config;
  },
};
