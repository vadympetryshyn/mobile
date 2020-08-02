import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'home-page' */ './index'),
  {
    fallback: null,
  },
);
