<template>
  <div class="slide">
    <div class="slide-warpper">
      <!-- <router-link class="silde-top" @click="$router.push('/')"> -->
      <div class="silde-top">
        <img src="../../assets/images/main/ele_icon.png" alt="" srcset="" />
        <span class="silde-top-title">电子存证后台</span>
      </div>
      <div class="silde-menu">
        <div
          class="slide-menu-row"
          v-for="(item, pindex) in menus"
          :key="item.id"
        >
          <div class="menu-row-title">
            <span class="item-icon" :class="item.icon"></span>
            {{ item.text }}
          </div>
          <template v-if="item.children.length">
            <div
              class="menu-row-list"
              v-for="(child, index) in item.children"
              :key="child.id"
              :class="$route.fullPath == child.url ? 'curRow' : ''"
            >
              <router-link :to="child.url">
                <!---list-tab-cur-->
                <div class="row-list-tab">
                  <span class="item-icon" :class="child.icon"></span>
                  {{ child.text }}
                </div>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { leftMenus } from '@/config/leftMenu'
export default {
  data() {
    return {
      menus: leftMenus,
    }
  },
}
</script>
<style scoped>
.slide {
  height: calc(100vh - 81px);
  overflow: auto;
  min-height: calc(100vh - 81px);
  background: #fff;
}
.slide-warpper {
  padding: 28px 12px 28px;
}
.silde-top {
  display: flex;
  align-items: center;
}
.silde-top img {
  width: 29px;
  height: 29px;
}
.silde-top-title {
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC',
    sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  color: #000000;
  margin: 0 0 0 10px;
}
/***menu start */
.silde-menu {
  margin: 20px 0;
}
.slide-menu-row {
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
.menu-row-title {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 12px;
  color: #000;
  font-weight: 500;
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC',
    sans-serif;
  cursor: pointer;
}
.menu-row-list {
  padding: 0 0 0 24px;
}
.menu-row-list div {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.item-icon {
  margin: 0 10px 0 0;
  color: #797979;
}
.row-list-tab {
  font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC',
    sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 12px;
  color: #000000;
}

.fold-icon {
  color: #797979;
  font-size: 13px;
  margin-left: 22px;
}
/***end menu */

.curRow {
  background-color: #dfebdb;
  font-size: 14px;
  color: #39841e;
  border-radius: 5px;
}
.curRow .item-icon {
  color: #39841e;
}
.curRow .row-list-tab {
  color: #39841e;
}
::-webkit-scrollbar {
  display: none;
}
</style>