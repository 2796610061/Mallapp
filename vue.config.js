const path=require('path')
module.exports={
    publicPath: './',
    devServer:{
        contentBase:path.resolve(__dirname,"dist"),
        port: 8080,
        open: true,
        proxy: {
            '/api': {
              // 需要代理的url
              target: 'http://www.kangliuyong.com:10002',
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/'
              }
            }
        }
    }
}