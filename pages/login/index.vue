<template>
  <div class="relative flex items-top justify-center min-h-screen sm:items-center sm:pt-0 bg-login">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <a class="flex justify-center pt-8 sm:pt-0" href="https://nuxtjs.org" target="_blank">
        <svg width="242" height="95" viewBox="0 0 242 95" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2164 55V75.2857H75.8884V55" stroke="#1B8BD1" stroke-width="6" />
          <path d="M75.0448 55L43.0746 26L27.0896 40.5L11.1045 55" stroke="#1B8BD1" stroke-width="5.7" stroke-linecap="square" />
          <path d="M81.2612 44.6542L42.6306 6L4 44.6542" stroke="#59BFFF" stroke-width="8" stroke-linecap="round" />
          <path d="M99.9518 34.875H105.905L114.671 59.9297L123.436 34.875H129.389L117.061 69H112.28L99.9518 34.875ZM96.7409 34.875H102.671L103.749 59.2969V69H96.7409V34.875ZM126.671 34.875H132.624V69H125.592V59.2969L126.671 34.875ZM153.085 40.7109L143.803 69H136.327L149.007 34.875H153.764L153.085 40.7109ZM160.796 69L151.491 40.7109L150.741 34.875H155.546L168.296 69H160.796ZM160.374 56.2969V61.8047H142.35V56.2969H160.374ZM174.671 34.875H180.624L189.389 59.9297L198.155 34.875H204.108L191.78 69H186.999L174.671 34.875ZM171.46 34.875H177.389L178.467 59.2969V69H171.46V34.875ZM201.389 34.875H207.342V69H200.311V59.2969L201.389 34.875ZM231.272 60.0703C231.272 59.4609 231.178 58.9141 230.991 58.4297C230.819 57.9297 230.491 57.4766 230.007 57.0703C229.522 56.6484 228.842 56.2344 227.967 55.8281C227.092 55.4219 225.96 55 224.569 54.5625C223.022 54.0625 221.553 53.5 220.163 52.875C218.788 52.25 217.569 51.5234 216.507 50.6953C215.46 49.8516 214.632 48.875 214.022 47.7656C213.428 46.6562 213.132 45.3672 213.132 43.8984C213.132 42.4766 213.444 41.1875 214.069 40.0312C214.694 38.8594 215.569 37.8594 216.694 37.0312C217.819 36.1875 219.147 35.5391 220.678 35.0859C222.225 34.6328 223.921 34.4062 225.764 34.4062C228.28 34.4062 230.475 34.8594 232.35 35.7656C234.225 36.6719 235.678 37.9141 236.71 39.4922C237.757 41.0703 238.28 42.875 238.28 44.9062H231.296C231.296 43.9062 231.085 43.0312 230.663 42.2812C230.257 41.5156 229.632 40.9141 228.788 40.4766C227.96 40.0391 226.913 39.8203 225.647 39.8203C224.428 39.8203 223.413 40.0078 222.6 40.3828C221.788 40.7422 221.178 41.2344 220.772 41.8594C220.366 42.4688 220.163 43.1562 220.163 43.9219C220.163 44.5 220.303 45.0234 220.585 45.4922C220.882 45.9609 221.319 46.3984 221.897 46.8047C222.475 47.2109 223.186 47.5938 224.03 47.9531C224.874 48.3125 225.85 48.6641 226.96 49.0078C228.819 49.5703 230.452 50.2031 231.858 50.9062C233.28 51.6094 234.467 52.3984 235.421 53.2734C236.374 54.1484 237.092 55.1406 237.577 56.25C238.061 57.3594 238.303 58.6172 238.303 60.0234C238.303 61.5078 238.014 62.8359 237.436 64.0078C236.858 65.1797 236.022 66.1719 234.928 66.9844C233.835 67.7969 232.53 68.4141 231.014 68.8359C229.499 69.2578 227.803 69.4688 225.928 69.4688C224.241 69.4688 222.577 69.25 220.936 68.8125C219.296 68.3594 217.803 67.6797 216.46 66.7734C215.132 65.8672 214.069 64.7109 213.272 63.3047C212.475 61.8984 212.077 60.2344 212.077 58.3125H219.132C219.132 59.375 219.296 60.2734 219.624 61.0078C219.952 61.7422 220.413 62.3359 221.007 62.7891C221.616 63.2422 222.335 63.5703 223.163 63.7734C224.007 63.9766 224.928 64.0781 225.928 64.0781C227.147 64.0781 228.147 63.9062 228.928 63.5625C229.725 63.2188 230.311 62.7422 230.686 62.1328C231.077 61.5234 231.272 60.8359 231.272 60.0703Z" fill="white" />
        </svg>

      </a>
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h5>User name</h5>
        <el-input
          v-model="formData.user_name"
          placeholder="Please input"
        />
        <div class="space" style="margin: 5px 0 0 5px;" />
        <h5>Password</h5>
        <el-input
          v-model="formData.password"
          placeholder="Please input"
          type="password"
        />
        <div class="space" style="margin: 5px 0 0 5px;" />
        <el-button type="primary" style="width: 100%;" @click="onSubmit">
          Login
        </el-button>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <a href="https://github.com/nuxt/nuxt.js" target="_blank"><svg
          class="w-6 h-6 text-gray-600 hover:text-gray-800 button--github"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="32"
          height="32"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        ><path d="M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247z" fill="currentColor" /></svg></a>
        <a href="https://twitter.com/nuxt_js" target="_blank"><svg
          class="w-6 h-6 text-gray-600 hover:text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          width="32"
          height="32"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        ><path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor" /></svg></a>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/auth'
export default {
  name: 'LoginPage',
  layout: 'auth',
  data () {
    return {
      formData: {
        user_name: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.$store.commit('pages/setLoading', true)

        const res = await login(this.formData)
        if (res.data.data.access_token) {
          // eslint-disable-next-line no-console
          console.log(res.data.data.access_token)
          const token = res.data.data.access_token
          const currentUser = res.data.data.profile
          this.$store.commit('auth/setAuthenticate', token)
          this.$store.commit('user/setCurrentUser', currentUser)
          this.redirectByAuth()
          this.$store.commit('pages/setLoading', false)
        }
        // this.$router.push({ path: '/' })
        // eslint-disable-next-line no-console
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
    redirectByAuth () {
      // if (user.role[0] && user.role[0].id === UserRoleId.ADMIN_MANAGE) {
      //   this.$router.push('/delivery')
      // } else if (user.role[0] && user.role[0].id === UserRoleId.ADMIN_VEHICLE_ALLOCATION) {
      //   this.$router.push('/driver-time-in-out')
      // } else {
      this.$router.push('/')
      // }
    }
  }
}
</script>

<style>
.bg-login {
  background-color: #304156
}
svg.w-6.h-6.text-gray-600.hover\:text-gray-800.button--github {
    color: aliceblue;
}
svg.w-6.h-6.text-gray-600.hover\:text-gray-800 {
    color: aliceblue;
}
</style>
