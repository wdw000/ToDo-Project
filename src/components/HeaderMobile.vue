<template>
  <div class="header-mobile">
    <button class="menu-open-click" @click="menuOpen"></button>
    <div>
      <div class="header-profile">
        <img :src="userInfo.imgSrc" />
      </div>
      <button class="logout-click" @click="logout"></button>
    </div>
  </div>
  <transition name="slide">
    <extend-menu-mobile
      :userInfo="this.userInfo"
      @logout="logout"
      @close="menuClose"
      @getItem="chageItem"
      v-if="extendHeader"
    ></extend-menu-mobile>
  </transition>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import ExtendMenuMobile from "../components/ExtendMenuMobile.vue";

export default {
  components: { ExtendMenuMobile },

  props: {
    userInfo: { type: Object },
    chageItem: { type: Function },
  },

  data() {
    return {
      extendHeader: false,
    };
  },

  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        console.log("로그아웃 성공");
      });
    },

    menuOpen() {
      this.extendHeader = !this.extendHeader;
    },

    menuClose() {
      this.extendHeader = false;
    },
  },
};
</script>

<style scoped>
.header-mobile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1920px;
  width: inherit;
  height: 66px;
  margin: 0 auto;
  padding: 1rem;
}

.header-mobile > div {
  display: flex;
}

.menu-open-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/header/outline_menu_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.logout-click {
  width: 2.4rem;
  height: 2.4rem;
  background-image: url("../assets/header/outline_logout_black_24dp.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.header-profile {
  width: 2.4rem;
  height: 2.4rem;
  overflow: hidden;
  border-radius: 2.4rem;
  margin: 0 1rem;
}

.header-profile > img {
  width: inherit;
  height: inherit;
}

@media screen and (min-width: 1024px) {
  .menu-open-click {
    background-image: url("../assets/header/outline_menu_black_24dp_2x.png");
  }

  .logout-click {
    background-image: url("../assets/header/outline_logout_black_24dp_2x.png");
  }
}

/* transition */

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-from,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  overflow: hidden;
  max-height: 500px;
}
</style>
