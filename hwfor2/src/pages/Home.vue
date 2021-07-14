<template>
  <div class="item-list">
    <item v-for="item in items.data" :key="item.id" :item="item"></item>
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
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        this.items = await axios.get(
          "https://nonchalant-fang.glitch.me/listing"
        );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-flow: wrap;
  justify-content: center;
  margin: 15px;
}
</style>
