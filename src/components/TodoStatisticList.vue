<template>
  <div class="to-do-statistic-list">
    <ul>
      <li v-for="data in datas" :key="data.date">
        <to-do-statistic-item
          :todos="data.todos"
          :date="data.date"
        ></to-do-statistic-item>
      </li>
    </ul>
  </div>
</template>

<script>
import ToDoStatisticItem from "./ToDoStatisticItem.vue";
export default {
  components: { ToDoStatisticItem },
  props: {
    datas: { type: Object },
  },
};
</script>

<style></style>
