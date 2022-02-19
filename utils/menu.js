export default [
  {
    routerName: '',
    title: 'Dashboard',
    link: '/',
    icon: 'el-icon-menu',
    active: false
  },
  {
    routerName: '',
    title: 'Setting',
    icon: 'el-icon-setting',
    active: false,
    items: [
      {
        title: 'Building',
        link: '/building'
      },
      {
        title: 'Room',
        link: '/room'
      }
    ]
  }
]
