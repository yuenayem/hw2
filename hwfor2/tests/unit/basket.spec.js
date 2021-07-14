import { expect } from 'chai'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Basket from '@/pages/Basket.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Routes from '../../src/router/index'
import { UPDATE_CART_ITEMS } from "../../src/store/mutation.types"

describe('Basket.vue', () => {

    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            itemsInCart: [{
                amount: 7,
                currency: "TRY",
                id: 1,
                image: "https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fsampuan.jpeg?v=1561027551321",
                name: "Şampuan",
                price: "13"
            }]
        },
        mutations: {
            [UPDATE_CART_ITEMS](state, payload) {
                state.itemsInCart = payload;
            }
        },
        modules: {}
    });
    const router = new VueRouter({
        routes: Routes
    })
    localVue.use(VueRouter)

    it('cart has at least 1 item', () => {
        const wrapper = shallowMount(Basket, {
            localVue,
            store,
            router
        })
        expect(wrapper.find(".item-name").text()).to.equal(store.state.itemsInCart[0].name)
    });


    it('increasing cart item amount', () => {
        const wrapper = shallowMount(Basket, {
            localVue,
            store,
            router
        })
        for (let i = 0; i < 5; i++) {
            wrapper.find(".increase").trigger("click");
        }
        expect( store.state.itemsInCart[0].amount).to.equal(12)
    });
})
