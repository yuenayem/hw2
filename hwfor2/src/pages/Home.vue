<template>
  <div class="item-list">
    <item v-for="item in items" :key="item.id" :item="item"></item>
  </div>
</template>

<script>
import Item from "../components/Item.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Item
  },
  data() {
    return {
      items: []
    };
  },
  mounted() {
    axios.get("https://nonchalant-fang.glitch.me/listing").then(res => {
      this.items = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  margin: 15px;
}
</style>
