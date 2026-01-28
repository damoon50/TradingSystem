<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb" class="box">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.name }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { generateTitle } from '@/utils/i18n'
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      // only show routes with meta.title
      let route = this.$route
      let matched = route.matched.filter(item => item.meta)
      const first = matched[0]
      matched = [{ path: '/index' }].concat(matched)

      this.levelList = matched.filter(item => item.meta)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    },
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: block;
  font-size: 14px;
  line-height: 40px;
  padding: 8px 0;
  box-sizing: border-box;

  .box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
  }

  .no-redirect {
    color: #ffffff;
    cursor: text;
    font-weight: 500;
  }
}

// 覆盖Element UI默认样式
:deep(.el-breadcrumb__separator) {
  color: rgba(255, 255, 255, 0.5) !important;
  margin: 0 12px;
}

:deep(.el-breadcrumb__inner a) {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff !important;
  }
}

:deep(.el-breadcrumb__inner.is-link) {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff !important;
    text-decoration: none;
  }
}

:deep(.el-breadcrumb__inner) {
  color: rgba(255, 255, 255, 0.7) !important;
}

// 过渡动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: transform 0.3s ease;
}
</style>
