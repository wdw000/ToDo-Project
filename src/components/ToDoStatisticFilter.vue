<template>
  <div class="to-do-statistic-filter">
    <ul>
      <li @click="isType('list')" class="statistic-list-click">
        <transition name="spread">
          <div v-if="filterStatus === 'list'"></div> </transition
        >목록
      </li>
      <li @click="isType('chart')" class="statistic-chart-click">
        <transition name="spread">
          <div v-if="filterStatus === 'chart'"></div> </transition
        >차트
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterStatus: "list",
    };
  },

  methods: {
    isType(type) {
      this.filterStatus = type;
      this.$emit("chageStatistic", type);
    },
  },
};
</script>

<style scoped>
.to-do-statistic-filter {
  font-size: 1.6rem;
  padding: 1rem 0;
}

ul {
  display: flex;
  justify-content: center;
}

li {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 1rem 0;
}

li > div {
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
