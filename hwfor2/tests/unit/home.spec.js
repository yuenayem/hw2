import { expect } from 'chai'
import {createLocalVue, shallowMount } from '@vue/test-utils'
// import Home from '@/pages/Home.vue'
import Item from '@/components/Item.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import vuexstore from '../../src/store/index.js'
import Routes from '../../src/router/index'

describe('Home.vue', () => {

  const item = {
    currency: "TRY",
    id: 1,
    image: "https://cdn.glitch.com/a28552e7-44e1-4bbd-b298-5745e70c2209%2Fsampuan.jpeg?v=1561027551321",
    name: "Şampuan",
    price: "13"
  }
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(vuexstore);
  const router = new VueRouter({
    routes: Routes
  })
  localVue.use(VueRouter)

  it('item has image equaled to the example when passed', () => {
    const wrapper = shallowMount(Item, {
      propsData: {item}
    })
    expect(wrapper.find("img").attributes()['src']).to.equal(item.image)
  });

  it('item has price equal to the example when passed', () => {
    const wrapper = shallowMount(Item, {
      propsData: {item}
    })
    expect(wrapper.find(".price").text()).to.include(item.price)
  });

  it('renders add-basket redirects when passed', () => {
    const wrapper = shallowMount(Item, {
      localVue,
      store,
      router,
      propsData: {item}
    })
    wrapper.find(".add-basket").trigger("click");
    expect(wrapper.vm.$route.path).to.equal("/basket")
  })
})
