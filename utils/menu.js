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
    title: 'User',
    link: '/user',
    icon: 'el-icon-user-solid',
    active: false
  },
  {
    routerName: '',
    title: 'Contract',
    link: '/contract',
    icon: 'el-icon-tickets',
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
  },
  {
    routerName: '',
    title: 'Periodic index check',
    icon: 'el-icon-notebook-1',
    active: false,
    items: [
      {
        title: 'Water index',
        link: '/water'
      },
      {
        title: 'Electricity indicator',
        link: '/electric'
      }
    ]
  },
  {
    routerName: '',
    title: 'Bill',
    link: '/bill',
    icon: 'el-icon-price-tag',
    active: false
  }
]
