const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
});
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
};
module.exports = {
  images: {
    minimumCacheTTL: 60,
    // disableStaticImages: true,
  },
};
