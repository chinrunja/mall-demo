import request from './request'

export function getHomeMultidata() {
  // return request({
  //   // url: '/home.json'
  //   url: '/home/multidata'
  // })
  const bannerFormat = {
    link: '',
    image: ''
  }
  const recommendFormat = {
    link: '',
    image: '',
    title: ''
  }
  const homeMultidata = {
    data: {
      banner: [],
      recommend: []
    }
  }

  return new Promise((res, rej) => {
    try {
      for (let i = 0; i < 4; i++) {
        bannerFormat.link = request.internet.url()
        bannerFormat.image = request.image.imageUrl(640, 480, 'cat', true)
        recommendFormat.link = request.internet.url()
        recommendFormat.image = request.image.imageUrl(640, 480, 'cat', true)
        recommendFormat.title = request.lorem.word()
        homeMultidata.data.banner.push(bannerFormat)
        homeMultidata.data.recommend.push(recommendFormat)
      }

      res(homeMultidata)
    } catch (e) {
      rej(e)
    }
  })
}

export function getHomeGoods(type, page) {
  // return request({
  //   url: '/home/data',
  //   params: {
  //     type,
  //     page
  //   }
  // })
  const dataNum = 10
  const goodFormat = {
    show: {
      img: ''
    },
    title: '',
    price: '',
    cfav: ''
  }
  const homeGoods = {
    [type]: {
      list: []
    }
    // pop: {
    //   list: []
    // },
    // new: {
    //   list: []
    // },
    // sell: {
    //   list: []
    // }
  }

  return new Promise((res, rej) => {
    try {
      while (homeGoods[type].list.length < page * dataNum) {
        goodFormat.show.img = request.image.imageUrl()
        goodFormat.title = request.lorem.sentence()
        goodFormat.price = request.datatype.float({ max: 100 })
        goodFormat.cfav = request.datatype.number(100)
        homeGoods[type].list.push(goodFormat)
      }

      res(homeGoods)
    } catch (e) {
      rej(e)
    }
  })
}

export function getHomeFeature() {
  return Promise.resolve(request.image.image())
}
