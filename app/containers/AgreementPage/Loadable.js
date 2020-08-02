import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'login-page' */ './index'),
  {
    fallback: null,
  },
);
