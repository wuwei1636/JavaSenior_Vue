const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/inter': {
        // 匹配所有以'/api' 开头的请求路径
        target: 'http://localhost:8081', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/inter': '' }
      }
    }
  }
})
