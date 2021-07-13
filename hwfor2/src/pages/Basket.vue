<template>
    <div class="my-cart">
        <div class="alert">Order failed due to:</div>
        <div v-for="(item, index) in items" :key="item.id" class="item-container">
            <div class="item-body">
                <div class="item-image">
                    <img :src="item.image" />
                </div>
                <div class="item-info">
                    <div class="item-name">{{item.name}}</div>
                    <div class="item-pricing-container">
                        <span class="item-currency">{{item.currency}}</span>
                        <span class="item-price">{{item.price}}</span>
                    </div>
                </div>
            </div>
            <div class="item-footer">
                <div class="item-amount">
                    <button @click="decrease(index)" :disabled="item.amount === 0">-</button>
                    <input min="0" @input="changeValue(index, item.amount)" type="number" v-model="item.amount" />
                    <button @click="increase(index)">+</button>
                </div>
                <button @click="remove(index)">
                    Remove
                </button>
            </div>
        </div>
        <div class="order-container">
            <button @click="() => {this.$router.push({path: 'home'})}">Continue Shopping</button>
            <button @click="order">Order</button>
        </div>
    </div>
</template>

<script>
//import CartItem from "../components/CartItem";
import axios from "axios";
export default {
  name: "Basket",
  components: {
    // CartItem
  },
  data() {
    return {
      jidai: 0
    };
  },
  mounted() {},
  computed: {
    items() {
      return this.$store.state.itemsInCart;
    }
  },
  methods: {
    order() {
      let orderBody = this.$store.state.itemsInCart.map(item => {
        return {
          id: item.id,
          amount: item.amount
        };
      });
      axios
        .post("https://nonchalant-fang.glitch.me/order", orderBody)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.error(error);
        });
    },
    increase(index) {
      let items = this.$store.state.itemsInCart;
      items[index].amount++;
      this.$set(this.$store.state.itemsInCart, index, items[index]);
    },
    decrease(index) {
      let items = this.$store.state.itemsInCart;
      items[index].amount--;
      this.$set(this.$store.state.itemsInCart, index, items[index]);
    },
    changeValue(index, amount) {
      let items = this.$store.state.itemsInCart;
      items[index].amount = Number(amount);
      this.$set(this.$store.state.itemsInCart, index, items[index]);
    },
    remove(index) {
      let items = this.$store.state.itemsInCart;
      items.splice(index, 1);
      this.$set(this.$store.state.itemsInCart, items);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-flow: wrap;
  margin: 15px;
}
.item-image img {
  width: 100px;
  height: 100px;
}

.alert {
  position: absolute;
  right: 0;
  padding: 10px;
  margin-top: 15px;
  width: 234px;
  font-size: 12px;
  border-radius: 4px 0 0 4px;
  color: #ff002fb8;
  font-weight: 900;
  font-family: sans-serif;
  box-shadow: 0 0 5px 2px #00000045;
}
</style>
