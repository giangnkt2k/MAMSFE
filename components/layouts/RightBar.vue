<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo sidebar-container"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item style="height: 66px;">
        <i v-if="isCollapse" class="el-icon-star-on" style="color: #00C675" />
        <h1 v-if="!isCollapse" class="text-center text-xl align-middle" style="padding: 17px;">
          MAMS
        </h1>
      </el-menu-item>
      <template v-for="(menu, index) in menus">
        <template v-if="!menu.link">
          <el-submenu
            :key="index"
            :index="index.toString()"
          >
            <i slot="title" :class="[menu.icon]" />
            <span slot="title">{{ menu.title }}</span>
            <template v-if="menu.items">
              <el-menu-item-group
                v-for="(item, supIndex) in menu.items"
                :key="supIndex"
              >
                <nuxt-link
                  :to="item.link"
                  exact
                  :index="supIndex.toString()"
                  class="menu-item-link"
                >
                  <el-menu-item>
                    <span class="link-item">
                      {{ item.title }}
                    </span>
                  </el-menu-item>
                </nuxt-link>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <nuxt-link
            :key="index+0.1"
            :to="menu.link"
            :index="index+0.1.toString()"
            exact
            class="menu-item-link"
          >
            <el-menu-item :index="index+0.1.toString()">
              <i :class="[menu.icon]" />
              <span slot="title" class="link-item">  {{ menu.title }}</span>
            </el-menu-item>
          </nuxt-link>
        </template>
      </template>

      <!-- <template v-else>
        <el-submenu :index="index.toString()">
          <nuxt-link
            :to="menu.link"
            exact
            class="menu-item-link"
          >
            <template slot="title">
              <i :class="[menu.icon]" />
              <span slot="title">{{ menu.title }}</span>
            </template>
          </nuxt-link>
        </el-submenu>
      </template> -->
    </el-menu>
  </div>
</template>

<script>
import menuMixin from '~/mixins/menu.js'
export default {
  name: 'MoleculeMenu',
  mixins: [menuMixin],
  props: {
    propsCollapse: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    isCollapse () {
      return this.propsCollapse
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // eslint-disable-next-line no-console
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 100%;
  }

  .sidebar-container {
    transition: width 0.28s;
    max-width: 210px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: margin-left 0.25s;
  }

  .link-item {
    color: #ffff;
  }
</style>
