const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  // Ví dụ: thay đổi port mặc định
  devServer: {
    port: 8080
  }
}