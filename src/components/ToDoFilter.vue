<template>
  <div class="to-do-filter">
    <ul>
      <li class="todo-all-click" @click="isType('all')">
        <transition name="spread">
          <div v-if="filterStatus === 'all'"></div>
        </transition>
        전체
      </li>
      <li class="todo-proceeding-click" @click="isType('progress')">
        <transition name="spread">
          <div v-if="filterStatus === 'progress'"></div>
        </transition>
        진행
      </li>
      <li class="todo-complete-click" @click="isType('done')">
        <transition name="spread">
          <div v-if="filterStatus === 'done'"></div>
        </transition>
        완료
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      filterStatus: "all",
    };
  },
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
  padding: 1rem 0;
  text-align: center;
  position: relative;
}

ul > li > div {
  position: absolute;
  bottom: 0;
  height: 0.5rem;
  width: 100%;
  background-color: lightgray;
  border-radius: 0.5rem;
}

.spread-enter-active {
  animation: wide 0.3s ease-in;
}

@keyframes wide {
  from {
    left: 50%;
    width: 0;
  }

  to {
    left: 0;
    width: 100%;
  }
}
</style>
