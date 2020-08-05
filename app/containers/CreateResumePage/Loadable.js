import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'vacancy-page' */ './index'),
  {
    fallback: null,
  },
);
