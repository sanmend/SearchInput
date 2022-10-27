const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "https://suggest.taobao.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ''
                }
            }

        }
    }
})