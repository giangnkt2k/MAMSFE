import AdminMenu from '~/utils/menu.js'
export default {
  computed: {
    menus () {
      const defaultMenu = AdminMenu
      const roleNames = this.$store.getters['user/getCurrentUserRoleNames']
      if (!roleNames || !roleNames.length) {
        return defaultMenu
      }
      if (roleNames.includes('super_admin')) {
        return AdminMenu
      }
      return defaultMenu
    }
  }
}
