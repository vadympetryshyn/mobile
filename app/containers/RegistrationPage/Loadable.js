import loadable from '../../utils/loadable';

export default loadable(
  () => import(/* webpackChunkName:'registration-page' */ './index'),
  {
    fallback: null,
  },
);
