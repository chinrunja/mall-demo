import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHECK_ITEM,
  CHECK_ALL,
  INCREASE_NUM,
  DECREASE_NUM,
  REMOVE_ITEM
} from './mutation-types'

export default {
  [ADD_COUNTER](_, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  },
  [CHECK_ALL](state, payload) {
    state.cartList.forEach((obj) => (obj.checked = !payload.checked))
  },
  [CHECK_ITEM](state, payload) {
    const item = state.cartList.find((obj) => obj.id === payload.id)
    item.checked = !item.checked
  },
  [INCREASE_NUM](state, payload) {
    const item = state.cartList.find((obj) => obj.id === payload.id)
    item.count += 1
  },
  [DECREASE_NUM](state, payload) {
    const item = state.cartList.find((obj) => obj.id === payload.id)
    item.count -= 1
  },
  [REMOVE_ITEM](state, payload) {
    state.cartList = state.cartList.filter((obj) => obj.id !== payload.id)
  }
}
