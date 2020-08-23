module.exports = {
  publicPath: process.env.NODE_ENv === 'production' ? '/' : './',
  outputDir: 'E:/study/app/liaotianshi_app',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
      }
    }
  }
}