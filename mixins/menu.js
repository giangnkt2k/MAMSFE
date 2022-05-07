/* eslint-disable no-console */
import AdminMenu from '~/utils/menu.js'
export default {
  computed: {
    menus () {
      const defaultMenu = AdminMenu
      const roleNames = this.$store.getters['user/getCurrentUserRoleNames']
      console.log('roleNames', roleNames)
      if (roleNames === 3) {
        return defaultMenu.filter(e => e.role === roleNames)
      }
      if (!roleNames || !roleNames.length) {
        return defaultMenu
      }
    }
  }
}
