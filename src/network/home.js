import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: '/home.json'
    // url: '/home/multidata'
  })
  // const bannerFormat = {
  //   link: '',
  //   image: ''
  // }
  // const recommendFormat = {
  //   link: '',
  //   image: '',
  //   title: ''
  // }
  // const homeMultidata = {
  //   data: {
  //     banner: [],
  //     recommend: []
  //   }
  // }

  //   return new Promise((res, rej) => {
  //     try {
  //       for (let i = 0; i < 4; i++) {
  //         let banner = {}
  //         let recommend = {}
  //         banner.link = request.internet.url()
  //         banner.image = request.image.imageUrl(640, 480, 'cat', true)
  //         recommend.link = request.internet.url()
  //         recommend.image = request.image.imageUrl(640, 480, 'cat', true)
  //         recommend.title = request.lorem.word()
  //         homeMultidata.data.banner.push(banner)
  //         homeMultidata.data.recommend.push(recommend)
  //       }

  //       res(homeMultidata)
  //     } catch (e) {
  //       rej(e)
  //     }
  //   })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home.json',
    params: {
      type,
      page
    }
  })
  // const dataNum = 10
  // const goodFormat = {
  //   id: 0,
  //   show: {
  //     img: ''
  //   },
  //   title: '',
  //   price: '',
  //   cfav: ''
  // }
  // const homeGoods = {
  //   [type]: {
  //     list: []
  //   }
  // pop: {
  //   list: []
  // },
  // new: {
  //   list: []
  // },
  // sell: {
  //   list: []
  // }
  // }

  // return new Promise((res, rej) => {
  //   try {
  //     for (let i = 0; i < dataNum; i++) {
  //       let good = {}
  //       good.id = Math.floor(Math.random() * 1000)
  //       good.img = request.image.imageUrl()
  //       good.title = request.lorem.sentence()
  //       good.price = request.datatype.float({ max: 100 })
  //       good.cfav = request.datatype.number(100)
  //       homeGoods[type].list.push(good)
  //     }

  //     page && res(homeGoods)
  //   } catch (e) {
  //     rej(e)
  //   }
  // })
}

export function getHomeFeature() {
  return Promise.resolve('./img/coffee.jpg')
}
