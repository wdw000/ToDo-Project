<template>
  <div class="to-do-filter">
    <ul>
      <li class="todo-all-click" @click="isType('all')">전체</li>
      <li class="todo-proceeding-click" @click="isType('progress')">진행</li>
      <li class="todo-complete-click" @click="isType('done')">완료</li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {},
  methods: {
    isType(type) {
      this.filterStatus = type;
      this.$emit("todoType", type);
    },
  },
};
</script>

<style scoped>
.to-do-filter {
  width: 100%;
  font-size: 1.6rem;
  margin: 1rem 0;
}
ul {
  display: flex;
  height: fit-content;
}
ul > li {
  flex: 1;
  text-align: center;
}
</style>
