<template>
    <div class="list-main">
        <div class="list-header">
            <div class="list-title">To Do
                <span class="item-count">2</span>
            </div>
            <button class="add-item" @click="AddItem">+</button>
        </div>
        <div class="list-body">
            <item></item>
        </div>
    </div>
</template>

<script>
import Item from "./Item.vue";
export default {
  name: "List",
  components: {
    Item
  },
  props: {
    listTitle: String
  }
};
</script>


<style lang="scss" scoped>
.list-main {
width: 265px;
    min-height: 300px;
    border-radius: 10px;
    background: #f2f6fa;

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px;

    .list-title {
        display: flex;
        align-items: center;
        
      margin: 0;
      font-family: arial;
    }

    .item-count {
      width: 15px;
      height: 15px;
      padding: 5px;
      align-items: center;
      justify-content: center;
      display: flex;
      border-radius: 50%;
      background-color: #d2defb;
      margin-left: 10px;
    }

    .add-item {
      background-color: #d2defb;
      border-radius: 50%;
      color: #000000;
      box-shadow: 0px 0px 4px 0px #00000078;
      height: 35px;
      border: 0;
      width: 35px;
      font-size: 20px;
    }
  }

  .list-body {
  }
}
</style>
