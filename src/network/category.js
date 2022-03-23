import { request } from './request'

export function getCategory() {
  return request({
    url: 'data.json'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: 'data.json',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: 'data.json',
    params: {
      miniWallkey,
      type
    }
  })
}
