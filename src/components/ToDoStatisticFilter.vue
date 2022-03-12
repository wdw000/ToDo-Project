<template>
  <div class="to-do-statistic-filter">
    <ul>
      <li @click="$emit('chageStatistic', 'list')" class="statistic-list-click">
        목록
      </li>
      <li
        @click="$emit('chageStatistic', 'chart')"
        class="statistic-chart-click"
      >
        차트
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
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
}
</style>
