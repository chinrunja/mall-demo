import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve) => {
      let product = state.cartList.find((obj) => obj.id === payload.id)

      if (product) {
        // product.count += 1
        commit(ADD_COUNTER, product)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        // console.log(payload)
        payload.checked = true
        commit(ADD_TO_CART, payload)
        resolve('当前商品已加入购物车')
      }
    })
  }
}
