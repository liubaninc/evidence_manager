<!-- layout -->
<template>
  <div class="layout">
    <el-container>
      <el-header class="layout-header">
        <Header />
      </el-header>
      <el-container class="layout-main">
        <el-aside class="left-side">
          <LeftSide></LeftSide>
        </el-aside>
        <el-main>
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
      <el-footer>京ICP备19054130号 北京磁云唐泉金服科技有限公司</el-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import LeftSide from "@/components/leftSide";
export default {
  name: "Layout",
  components: {
    Header,
    LeftSide,
  },
  data () {
    return {
      isAside: true,
    };
  },
  watch: {
    $route (to, from) {
      if (/^\/(wallet)|(wallet\/)/.test(to.path)) {
        this.isAside = false;
      } else {
        this.isAside = true;
      }
    },
  },
  created () {
    let hash = window.location.hash;
    if (/^#\/(wallet)|(wallet\/)/.test(hash)) {
      this.isAside = false;
    } else {
      this.isAside = true;
    }
  },
  methods: {},
};
</script>
<style scoped>
.layout {
  background: rgba(248, 248, 248, 1);
}
.el-header {
  padding: 0;
  background: #1e262b !important;
  color: #797979;
  height: 38px !important;
  display: flex;
  justify-items: center;
  align-items: center;
}
.el-footer {
  width: 100%;
  text-align: center;
  background: #1f2525;
  color: #b7b7b7;
  line-height: 43px;
  height: 43px !important;
  font-size: 12px;
}
.layout-main {
  min-height: calc(100vh - 81px);
  height: calc(100vh - 81px);
  /* overflow-y: auto; */
  overflow-y: hidden;
}

.left-side {
  width: 164px !important;
  position: relative;
  z-index: 2;
}
.content {
  margin: 0 auto;
}

.el-main {
  padding: 0;
  /* background: #fff; */
  /* margin: 0 0 0 14px; */
}
</style>
