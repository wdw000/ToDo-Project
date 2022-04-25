<template>
  <div class="header-wrap">
    <header-mobile
      :userInfo="this.userInfo"
      :chageItem="changeItem"
    ></header-mobile>
  </div>
  <div class="content-wrap">
    <to-do-list v-if="viewItem === 'todoList'"></to-do-list>
    <to-do-statistic v-if="viewItem === 'todoStatistic'"></to-do-statistic>
  </div>
</template>

<script>
import ToDoList from "./ToDoList.vue";
import HeaderMobile from "../components/HeaderMobile.vue";
import ToDoStatistic from "./ToDoStatistic.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    ToDoList,
    HeaderMobile,
    ToDoStatistic,
  },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        imgSrc: "",
      },
      viewItem: "todoList",
    };
  },
  methods: {
    getUserInfo() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userInfo.name = user.displayName;
          this.userInfo.email = user.email;
          this.userInfo.imgSrc = user.photoURL;
        } else {
          alert("로그인이 필요합니다!!");
          this.$router.replace("login");
        }
      });
    },
    changeItem(item) {
      this.viewItem = item;
    },
  },
};
</script>

<style scoped>
.header-wrap {
  width: 100%;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
