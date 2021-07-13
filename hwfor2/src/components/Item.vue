<template>
  <div class="item-main">
    <div class="item-header">
      <img :src="item.image" :alt="item.name" />
    </div>
    <div class="item-body">
      <div class="item-text">{{item.name}}</div>
    </div>
    <div class="item-footer">
      <div class="pricing-container">
        <span class="currency">{{util.convertCurrencyToSymbol(item.currency)}}</span>
        <span class="price">{{item.price}}</span>
      </div>
      <button @click="addBasket(item)" class="add-basket">
        ADD BASKET
      </button>
    </div>
  </div>
</template>

<script>
import { UPDATE_CART_ITEMS } from "../store/mutation.types";
import Util from '../assets/util'
export default {
  name: "Item",
  props: {
    item: Object
  },
  data() {
    return {
      util: Util,
      menuVisible: false
    };
  },
  methods: {
    addBasket(item) {
      let itemsInCart = this.$store.state.itemsInCart;
      let foundIndex = itemsInCart.findIndex(element => element.id === item.id);
      if (foundIndex === -1) {
        item.amount = 0;
        itemsInCart.push(item);
        this.$store.commit(UPDATE_CART_ITEMS, itemsInCart);
        this.$router.push({ path: "basket" });
      } else {
        itemsInCart[foundIndex].amount++;
        this.$store.commit(UPDATE_CART_ITEMS, itemsInCart);
        this.$router.push({ path: "basket" });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
$red-orange: #fb641b;

.item-main {
  border: 1px solid #0000000f;
  width: 230px;
  height: 240px;
  background: #ffffff;
  padding: 10px;
  .item-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    padding: 6px;

    img {
      width: 150px;
      height: 150px;
    }
  }

  .item-body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
    .item-text {
      text-align: left;
    }
  }

  .item-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    .pricing-container {
      display: flex;
      justify-content: center;
      font-weight: 600;
      color: transparentize(#000000, 0.2);
      font-size: 14px;
    }

    .add-basket {
      background: $red-orange;
      color: #ffffff;
      border: 0;
      padding: 4px;
      width: 104px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;

       &:hover {
          background: transparentize($red-orange, 0.2);
        }
    }
  }
}
</style>
