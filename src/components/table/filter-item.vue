<template>
  <div class="table-filter-item">
    <label class="filter-label">{{ lable }}</label>
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      lable: String
    }
  })
</script>

<style>
</style>