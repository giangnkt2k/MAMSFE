/* eslint-disable no-console */
import AdminMenu from '~/utils/menu.js'

export default (context) => {
  const currentRoute = context.app.router.currentRoute.path
  const currentItemMenu = AdminMenu.filter(e => e.link === currentRoute)
  const userROle = context.store.getters['user/getCurrentUserRoleNames']

  console.log('currentRoute,', currentRoute)
  console.log('currentItemMenu,', currentItemMenu)
  console.log('userROle,', userROle)
  if (userROle !== currentItemMenu[0].role && userROle === 3) {
    return context.redirect('/status')
  }
}
