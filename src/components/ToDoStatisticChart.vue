<template>
  <div class="to-do-statistic-chart">
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  props: {
    todoData: { type: Object },
  },
  data() {
    return {
      myChart: null,
      chartLabels: [],
      chartData: [],
    };
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      const canvas = document.getElementById("chart");
      const filterHeight = document.querySelector(
        ".to-do-statistic-filter"
      ).clientHeight;
      const headerHeight = document.querySelector(".header-wrap").clientHeight;
      console.log(filterHeight, headerHeight);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - (headerHeight + filterHeight);

      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.chartLabels,
          datasets: [
            {
              label: "완료율",
              data: this.chartData,
              backgroundColor: "pink",
              borderColor: "white",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    getChartData() {
      this.todoData.forEach((element) => {
        let total = 0;
        let done = 0;
        this.chartLabels.push(element.date);
        for (const key in element.todos) {
          total++;
          if (element.todos[key].done === true) {
            done++;
          }
        }
        const result = parseInt((done / total) * 100);
        this.chartData.push(result);
      });
    },
  },
  mounted() {
    this.fillData();
  },
  created() {
    this.getChartData();
  },
};
</script>

<style scoped></style>
