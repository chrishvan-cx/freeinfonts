import { Home, News } from './components';

const routes = [
    {
      title: 'Home',
      path: '/',
      exact: true,
      component: Home
    },
    {
      title: 'News',
      path: '/News',
      component: News
    }
  ]
  
  export default routes