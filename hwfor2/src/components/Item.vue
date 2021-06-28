<template>
    <div class="item-main">
        <div class="item-header">
            <button class="operations">...</button>
        </div>
        <div class="item-body">
            <div class="item-text">Design Landing Page For Support Team</div>
        </div>
        <div class="item-footer">
            <div class="profile">
                <div class="profile-image">
                    ad
                </div>
                <div class="profile-name">
                    asdasdasd
                </div>
            </div>
            <div class="date">
                asdasdas
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    text: String
  }
};
</script>


<style lang="scss" scoped>
.item-main {
  border-radius: 5px;
  background: #ffffff;
  .item-header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 10px;

    .operations {
          margin: 0;
    border: 0;
    background: none;
    font-weight: 900;
    height: initial;
    padding: 0;
    line-height: 0;
    }
  }
  .item-body {
      .item-text {
          font-weight: 600;
          text-align: left;
      }
  }

  .item-footer {
      display: flex;
      justify-content: space-between;
  font-size: 12px;
      .profile {
        display: flex;
      }
  }
}
</style>
