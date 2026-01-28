<template>
  <el-aside class="index-aside" height="100vh" width="210px">
    <div class="index-aside-inner menulist" style="height:100%">
      <div v-for="item in menuList" :key="item.roleName" v-if="role==item.roleName" class="menulist-item">
        <el-menu mode="vertical" :unique-opened="true" class="el-menu-demo" style="height:100%;" background-color="#1e1e1e" text-color="#EAEAEA" active-text-color="#FFFFFF" default-active="0">
          <el-menu-item index="(0).toString()" @click="menuHandler('')"><i v-if="true" class="el-icon-s-home" />首页</el-menu-item>
          <el-submenu :index="(1).toString()">
            <template slot="title">
              <i v-if="true" class="el-icon-user-solid" />
              <span>个人中心</span>
            </template>
            <el-menu-item :index="(1-1).toString()" @click="menuHandler('updatePassword')">修改密码</el-menu-item>
            <el-menu-item :index="(1-2).toString()" @click="menuHandler('center')">个人信息</el-menu-item>
          </el-submenu>
          <el-submenu v-for=" (menu,index) in item.backMenu" :key="menu.menu" :index="(index+2).toString()">
            <template slot="title">
              <i v-if="true" :class="icons[index]" />
              <span>{{ menu.menu }}</span>
            </template>
            <el-menu-item v-for=" (child,sort) in menu.child" :key="sort" :index="((index+2)+'-'+sort).toString()" @click="menuHandler(child.tableName)">{{ child.menu }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </el-aside>
</template>
<script>
import menu from '@/utils/menu'
export default {
  data() {
    return {
      menuList: [],
      dynamicMenuRoutes: [],
      role: '',
      icons: [
        'el-icon-s-cooperation',
        'el-icon-s-order',
        'el-icon-s-platform',
        'el-icon-s-fold',
        'el-icon-s-unfold',
        'el-icon-s-operation',
        'el-icon-s-promotion',
        'el-icon-s-release',
        'el-icon-s-ticket',
        'el-icon-s-management',
        'el-icon-s-open',
        'el-icon-s-shop',
        'el-icon-s-marketing',
        'el-icon-s-flag',
        'el-icon-s-comment',
        'el-icon-s-finance',
        'el-icon-s-claim',
        'el-icon-s-custom',
        'el-icon-s-opportunity',
        'el-icon-s-data',
        'el-icon-s-check',
        'el-icon-s-grid',
        'el-icon-menu',
        'el-icon-chat-dot-square',
        'el-icon-message',
        'el-icon-postcard',
        'el-icon-position',
        'el-icon-microphone',
        'el-icon-close-notification',
        'el-icon-bangzhu',
        'el-icon-time',
        'el-icon-odometer',
        'el-icon-crop',
        'el-icon-aim',
        'el-icon-switch-button',
        'el-icon-full-screen',
        'el-icon-copy-document',
        'el-icon-mic',
        'el-icon-stopwatch',
      ]
    }
  },
  mounted() {
    const menus = menu.list()
    this.menuList = menus
    this.role = this.$storage.get('role')
  },
  methods: {
    menuHandler(name) {
      let router = this.$router
      name = '/'+name
      router.push(name).catch(err => err)
    }
  }
}
</script>
<style lang="scss" scoped>
  .index-aside {
    background-color: #1e1e1e;
    border-right: 1px solid #333;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    .index-aside-inner {
      height: 100%;
      margin-right: -17px;
      margin-bottom: -17px;
      overflow: scroll;
      overflow-x: hidden !important;
      padding-top: 60px;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }

      .el-menu {
        border: 0;
      }
    }
  }

  // 覆盖Element UI默认样式
  :deep(.el-menu) {
    background-color: #1e1e1e !important;
    border-right: none !important;
  }

  :deep(.el-menu-item) {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: all 0.2s ease !important;
    border-bottom: 1px solid #333 !important;
    height: 50px !important;
    line-height: 50px !important;

    &:hover, &:focus {
      background-color: rgba(255, 255, 255, 0.08) !important;
      color: #ffffff !important;
    }

    &.is-active {
      background-color: #2563eb !important;
      color: #ffffff !important;
    }
  }

  :deep(.el-submenu__title) {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: all 0.2s ease !important;
    border-bottom: 1px solid #333 !important;
    height: 50px !important;
    line-height: 50px !important;

    &:hover, &:focus {
      background-color: rgba(255, 255, 255, 0.08) !important;
      color: #ffffff !important;
    }
  }

  :deep(.el-submenu .el-menu) {
    background-color: #252525 !important;
  }

  :deep(.el-submenu .el-menu-item) {
    background-color: #252525 !important;
    color: rgba(255, 255, 255, 0.7) !important;
    padding-left: 45px !important;
    border-bottom: 1px solid #333 !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08) !important;
    }

    &.is-active {
      background-color: #2563eb !important;
    }
  }

  :deep(.el-submenu__icon-arrow) {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  // 滚动条样式
  .index-aside-inner::-webkit-scrollbar {
    width: 6px;
  }

  .index-aside-inner::-webkit-scrollbar-track {
    background: #1e1e1e;
  }

  .index-aside-inner::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 3px;
  }

  .index-aside-inner::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    .index-aside {
      width: 60px !important;
    }

    :deep(.el-submenu__title span),
    :deep(.el-menu-item span) {
      display: none;
    }
  }
</style>
