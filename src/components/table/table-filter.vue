<template>
  <div class="table-filter">
    <div class="table-filter-left">
      <slot name="leftCen"></slot>
      <div class="but-box" v-if="isHandle">
        <a-button type="primary" class="butRight" @click="seaClick">查询</a-button>
        <a-button class="butRight" @click="resetInput">重置</a-button>
      </div>
    </div>
    <div class="table-filter-right">
      <slot name="rightSlot"></slot>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue"

  export default defineComponent({
    props: {
      searchFun: Function,
      resetTopClick: Function,
      handle: Boolean
    },
    setup(props, context) {
      const isHandle = props.handle || true;
      const seaClick = () => {
        context.emit("searchFun");
      }
      const resetInput = () => {
        context.emit("resetTopClick");
      }
      return {
        seaClick,
        resetInput,
        isHandle
      };
    }
  });
</script>
<style lang="scss">
  .table-filter {
    display: flex;
    overflow: hidden;
    text-align: left;
    background: #fff;
    flex-direction: column;
    &-left {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 15px;
      .table-filter-item {
        flex: none;
        display: flex;
        width: 260px;
        align-items: center;
        margin-bottom: 2px;
        .filter-label {
          margin-right: 10px;
          white-space: nowrap;
          line-height: 36px;
        }
        & > *:not(.filter-label) {
          flex: 1;
        }
      }
      .but-box {
        display: flex;
        align-items: center;
      }
      & > div + div {
        margin-left: 18px;
      }
    }
    &-right {
      display: flex;
    }
    .butRight {
      margin-left: 14px;
    }
  }
</style>
