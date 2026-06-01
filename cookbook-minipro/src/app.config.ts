export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/all-recipes/index',
    'pages/upload/index',
    'pages/profile/index',
    'pages/recipe-detail/index',
    'pages/my-uploads/index',
    'pages/my-favorites/index',
    'pages/my-suggestions/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fbf8fd',
    navigationBarTitleText: 'Fresh Harvest',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#45464e',
    selectedColor: '#52c41a',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { text: '首页', pagePath: 'pages/home/index', iconPath: '', selectedIconPath: '' },
      { text: '全部菜品', pagePath: 'pages/all-recipes/index', iconPath: '', selectedIconPath: '' },
      { text: '上传', pagePath: 'pages/upload/index', iconPath: '', selectedIconPath: '' },
      { text: '个人中心', pagePath: 'pages/profile/index', iconPath: '', selectedIconPath: '' },
    ],
  },
});
