<template>
  <div id="nav-bar">
    <div class="logo">
      <router-link to='/'><i class="nav_logo"></i></router-link>
    </div>
    <ul class="nav-list">
      <el-tooltip class="item" effect="dark" content="数据中心" placement="right">
        <li class="nav-item">
          <router-link to='/formDesign'>
            <i class="nav_data nav_img"></i>
          </router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="FormDesign" placement="right">
        <li class="nav-item">
          <router-link to='/formDesign'><i class="nav_form nav_img"></i></router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="MapDesign" placement="right">
        <li class="nav-item">
          <router-link to='/mapdesign'><i class="nav_map nav_img"></i></router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="ChartDesign" placement="right">
        <li class="nav-item">
          <router-link to='/chartDesign'><i class="nav_chart nav_img"></i></router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="AppDesign" placement="right">
        <li class="nav-item">
          <router-link to='/formDesign'><i class="nav_app nav_img"></i></router-link>
        </li>
      </el-tooltip>
    </ul>

    <ul class="user-info">
      <el-tooltip class="item" effect="dark" content="个人中心" placement="right">
        <li class="user-item">
          <router-link to='/formDesign'><i class="nav_user nav_img"></i></router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="帮助" placement="right">
        <li class="user-item">
          <router-link to='/formDesign'><i class="nav_help nav_img"></i></router-link>
        </li>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出" placement="right">
        <li class="user-item">
          <router-link to='/login'><i class="nav_logout nav_img"></i></router-link>

        </li>
      </el-tooltip>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'navBar',
    components: {},
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'getLogin'
      ]),
    },
    methods: {

    },
    created() {

    },
    mounted() {
      console.log(this.getLogin.userInfo)
    }
  }
</script>

<style lang="less" scoped>
  ul,
  li {
    list-style: none;
    text-decoration: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 60px;
    text-align: center;
  }

  a {
    position: inherit;
    display: block;
    width: 100%;
    height: 100%;
  }

  a:hover {
    background-color: #232c32;
    color: #FFFFFF;
  }

  .logo a:hover {
    background-color: #2093ef;
    color: #FFFFFF;
  }

  .user-info a:hover {
    background-color: #2093ef;
    color: #FFFFFF;
  }

  #nav-bar {
    padding: 0;
    position: absolute;
    width: 60px;
    height: 100%;
    background-color: #181f24;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    flex: 0 0 60px;
    width: 60px;
    .logo {
      color: #FFF;
      text-align: center;
      line-height: 60px;
      height: 60px;
      width: 100%;
      background-color: #2093ef;
      position: absolute;
      top: 0;
      left: 0;
    }
    .nav-list {
      margin-top: 60px;
      width: 100%;
      .nav-item {
        width: 100%;
        height: 60px;
      }
    }
    .user-info {
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0;
      background: #232c32;
      .user-item {
        width: 100%;
        height: 60px;
      }
    }
  }

  .nav_img {
    width: 20px;
    height: 20px;
    display: block;
    background-size: 100% 100% !important;
    margin: 20px;
    position: fixed;
  }

  .nav_logo {
    margin: 15px;
    background-size: 100% 100% !important;
    display: block;
    width: 30px;
    height: 30px;
    background: url(../../static/Index/img/logo.png) no-repeat;
  }

  .nav_data {
    background: url(../../static/Index/img/data.png) no-repeat;
  }

  .nav_form {
    background: url(../../static/Index/img/form.png) no-repeat;
  }

  .nav_map {
    background: url(../../static/Index/img/map.png) no-repeat;
  }

  .nav_chart {
    background: url(../../static/Index/img/chart.png) no-repeat;
  }

  .nav_app {
    background: url(../../static/Index/img/app.png) no-repeat;
  }

  .nav_help {
    background: url(../../static/Index/img/help.png) no-repeat;
  }

  .nav_user {
    background: url(../../static/Index/img/user.png) no-repeat;
  }

  .nav_logout {
    background: url(../../static/Index/img/logout.png) no-repeat;
  }
</style>
