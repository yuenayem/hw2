<template>
  <div class="my-cart">
    <div v-show="isAlertVisible" class="alert" ref="alert">{{alertMessage}}</div>
    <div v-if="items.length < 1" class="empty-cart">
      Your cart is currently empty. In order to order, add items in to your cart
    </div>
    <div v-for="(item, index) in items" :key="item.id" class="item-container">
      <div class="left-section">
        <div class="item-image">
          <img :src="item.image" />
        </div>
        <div class="item-amount">
          <button class="decrease" @click="decrease(index)" :disabled="item.amount < 2">-</button>
          <input class="amount-input" min="1" @input="changeValue(index, item.amount)" type="number" v-model="item.amount" />
          <button class="increase" @click="increase(index)">+</button>
        </div>
      </div>
      <div class="right-section">
        <div class="item-info">
          <div class="item-name">{{item.name}}</div>
          <div class="item-pricing">
            <span class="item-currency">{{util.convertCurrencyToSymbol(item.currency)}}</span>
            <span class="item-price">{{item.price}}</span>
          </div>
        </div>
        <div class="footer">
          <button class="remove-button" @click="remove(index)">
            Remove
          </button>
        </div>
      </div>
    </div>

    <div class="order-container">
      <button class="operation-button" @click="() => {this.$router.push({path: 'home'})}"> « Continue Shopping</button>
      <button class="operation-button order" :disabled="items.length < 1" @click="order">Order</button>
    </div>
  </div>
</template>

<script>
import { UPDATE_CART_ITEMS } from "../store/mutation.types";
import Util from "../assets/util";
import axios from "axios";
export default {
  name: "Basket",
  components: {},
  data() {
    return {
      util: Util,
      alertMessage: "",
      isAlertVisible: false
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
      if (orderBody.length > 0) {
        axios
          .post("https://nonchalant-fang.glitch.me/order", orderBody)
          .then(() => {
            this.$store.commit(UPDATE_CART_ITEMS, []);
            this.notify("Successfully Ordered", "success");
          })
          .catch(error => {
            this.notify(error.message, "error");
          });
      } else {
        this.notify("Your cart is empty", "warning");
      }
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
    },
    notification() {
      setTimeout({}, 3000);
    },
    notify(message, type) {
      this.alertMessage = message;
      this.isAlertVisible = true;
      this.$refs.alert.classList.add("ease-in-animation");
      this.$refs.alert.classList.add(type);
      let vm = this;
      setTimeout(() => {
        vm.$refs.alert.classList.remove("ease-in-animation");
        this.$refs.alert.classList.remove(type);
        vm.isAlertVisible = false;
        if (type === "success") {
          this.$router.push({ path: "home" });
        }
      }, 1500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$red-orange: #fb641b;
.my-cart {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 25px;

  .empty-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 1px 1px #00000057;
    height: 150px;
    width: 50%;
  }

  .item-container {
    box-shadow: 0px 0px 1px 1px #00000057;
    display: flex;
    width: 35%;
    padding: 13px;
    margin-top: 10px;

    .left-section {
      padding: 0 15px;
      .item-image {
        img {
          width: 100px;
          height: 100px;
        }
      }
      .item-amount {
        display: flex;
        justify-content: space-evenly;
        .decrease {
          border-radius: 50%;
          border: 1px solid #80808052;
        }
        .amount-input {
          width: 30px;
          border: 1px solid #8080805c;
          text-align: center;
        }
        .increase {
          border-radius: 50%;
          border: 1px solid #80808052;
        }
      }
    }
    .right-section {
      width: 100%;
      .item-info {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-around;
        height: 100px;

        .item-name {
          font-size: 14px;
        }
        .item-pricing {
          font-weight: 900;
          font-size: 12px;
        }
      }
      .footer {
        text-align: center;
        width: 100%;
        .remove-button {
          cursor: pointer;
          background: none;
          border: none;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  .order-container {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 1px 1px #00000057;
    height: 80px;
    width: 50%;
    margin-top: 15px;
    .operation-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 29px;
      box-shadow: 0px 0px 1px 1px #00000052;
      border: 0;
      font-weight: 600;
      margin: 15px;
      width: 45%;
      cursor: pointer;

      &.order {
        background: $red-orange;
        color: #ffffff;

        &:disabled {
          background: transparentize($red-orange, 0.8);
          &:hover {
            background: transparentize($red-orange, 0.8);
          }
        }
        &:hover {
          background: transparentize($red-orange, 0.2);
        }
      }
    }
  }
}

.alert {
  position: absolute;
  right: 0;
  padding: 10px;
  margin-top: 15px;
  width: 200px;
  font-size: 12px;
  border-radius: 4px 0 0 4px;
  font-family: sans-serif;
  box-shadow: 0 0 5px 2px #00000045;
  color: #fff;

  &.success {
    background: #519851;
  }

  &.error {
    background: #bf6565;
  }

  &.warning {
    background: #d6bf1dcc;
  }
}

.ease-in-animation {
  animation-name: slide-1;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}

@keyframes slide-1 {
  0% {
    opacity: 0;
    margin-top: 45px;
  }
  100% {
    opacity: 1;
    margin-top: 15px;
  }
}
</style>
