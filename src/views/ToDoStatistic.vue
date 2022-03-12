<template>
  <div class="to-do-statistic">
    <to-do-statistic-filter
      @chageStatistic="changeStatisticStatus"
    ></to-do-statistic-filter>
    <to-do-statistic-list
      :datas="datas"
      v-if="statisticStatus === 'list'"
    ></to-do-statistic-list>
    <to-do-statistic-chart
      v-if="statisticStatus === 'chart'"
      :todoData="datas"
    ></to-do-statistic-chart>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import ToDoStatisticChart from "../components/ToDoStatisticChart.vue";
import ToDoStatisticList from "../components/TodoStatisticList.vue";
import ToDoStatisticFilter from "../components/ToDoStatisticFilter.vue";

export default {
  components: { ToDoStatisticChart, ToDoStatisticList, ToDoStatisticFilter },
  created() {
    this.getData();
  },

  data() {
    return {
      datas: [],
      statisticStatus: "list",
    };
  },

  methods: {
    async getData() {
      const db = getFirestore();
      const querySnapshot = await getDocs(
        collection(db, getAuth().currentUser.uid)
      );
      querySnapshot.forEach((doc) => {
        const temp = { date: doc.id, todos: doc.data() };
        this.datas.push(temp);
      });
    },

    changeStatisticStatus(item) {
      this.statisticStatus = item;
    },
  },
};
</script>

<style scoped>
.to-do-statistic {
  width: inherit;
  max-width: 1920px;
  margin: 0 auto;
}
</style>
