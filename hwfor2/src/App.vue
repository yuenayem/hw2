<template>
  <div id="app">
    <header class="header">
      <section class="brand-title">Hürriyet Emlak</section>
      <aside class="aside">
        <button @click="navigateToCart" class="cart-button">
          <span>My Cart</span>
          <span class="item-amount"> {{this.$store.state.itemsInCart.length}}</span>
        </button>
      </aside>
    </header>
    <main class="main">
      <router-view></router-view>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    navigateToCart() {
      this.$router.push({ path: "basket" });
    }
  }
};
</script>

<style lang="scss">
$red-orange: #fb641b;

body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    background: #fb641b00;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 75%);

    .brand-title {
      color: #fb641b;
      font-weight: 900;
      font-size: 28px;
      text-shadow: 1px 1px 1px #00000061;
    }
    .aside {
      .cart-button {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: $red-orange;
        border: 0;
        color: #ffffff;
        width: 100px;
        font-size: 14px;
        padding: 5px;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background: transparentize($red-orange, 0.2);
        }

        .item-amount {
          background: $red-orange;
          padding: 0px 4px;
          border-radius: 5px;
          color: white;
        }
      }
    }
  }

  .main {
  }
}
</style>
