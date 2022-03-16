module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views',
        store: '@/store'
      }
    }
  }
}

// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// module.exports = {
//   chainWepback: (config) => {
//     config.resolve.alias
//       .set('@', resolve('./src'))
//       .set('assets', resolve('@/assets'))
//       .set('common', resolve('@/common'))
//       .set('components', resolve('@/components'))
//       .set('network', resolve('@/network'))
//       .set('views', resolve('@/views'))
//   }
// }
