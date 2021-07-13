import {UPDATE_CART_ITEMS} from "./mutation.types"

const mutations = {
    [UPDATE_CART_ITEMS](state, payload) {
        state.itemsInCart = payload;
    }
}
export default mutations;