<template>
  <div class="top-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <span class="icon-nav">
        <!-- <el-switch v-model="isCollapse" active-color="#304156" /> -->
        <i v-if="isCollapse=== false" class="el-icon-s-fold" @click="changeTypeMenu(true)" />
        <i v-if="isCollapse !== false" class="el-icon-s-unfold" @click="changeTypeMenu(false)" />
      </span>
      <span>
        <el-breadcrumb class="breadcrumb-nav" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">
            Homepage
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ $router.currentRoute.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <el-submenu index="2">
        <template slot="title">
          {{ currentUser.name }}
        </template>
        <el-menu-item index="2-1">
          Profile
        </el-menu-item>
        <el-menu-item index="2-3" @click="logout">
          Logout
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isCollapse: false,
      path: ''
    }
  },
  propsCollapse: {
    type: Boolean,
    required: true,
    default: false
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/getCurrentUser']
    }
  },
  watch: {
    $router (to, from) {
      // eslint-disable-next-line no-console
      console.log('alo1===>', to)
      // eslint-disable-next-line no-console
      console.log('alo=2==>', from)
      // eslint-disable-next-line no-console
      console.log('alo==3=>', this.$router)
      this.path = this.$router.currentRoute.name
    }
  },
  updated () {
    this.path = this.$router.currentRoute.name
  },
  created () {
    // eslint-disable-next-line no-console
    console.log('alo===>', this.$router.currentRoute.name)
  },
  methods: {
    handleSelect (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    },
    changeTypeMenu (val) {
      this.isCollapse = val
      this.$emit('handle-change-type-menu', val)
    },
    logout () {
      // eslint-disable-next-line no-console
      try {
        this.$store.commit('user/setCurrentUser', {})
        this.$store.commit('auth/logout')
      } catch (e) {
        const message = e.response.data.message || ''
        this.$toast.error(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul.el-menu-demo.el-menu--horizontal.el-menu {
  padding-bottom: 5px;
}
.el-menu--horizontal>.el-submenu {
  float: right;
}
.icon-nav {
  padding: 0 15px;
  line-height: 60px;
  height: 100%;
  float: left;
  cursor: pointer;
}
.breadcrumb-nav {
  padding: 0 15px;
  line-height: 60px;
  height: 100%;
  float: left;
  cursor: pointer;
}
.logo-nav {
    top: 5px;
    left: 75px;
    font-size: 36px;
    position: absolute;
    color: #304156;
    font-family: auto;
    font-weight: 600;
}
</style>
