import React from 'react';
import { StyleSheet, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Filters from './components/filters';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducers';
import { selectModalsRoot } from './selectors';
import Modals from './Modals';

function Modals2({}) {
  useInjectSaga({ key: 'modals', saga, mode: DAEMON });
  useInjectReducer({
    key: 'modals',
    reducer,
  });
  const modals = useSelector(selectModalsRoot);
  if (!modals.open2) {
    return null;
  }

  const getModal2 = () => {
    switch (modals.type2) {
      case 'filters':
        return <Filters />;
      default:
        return null;
    }
  };

  return (
    <Modal
      style={{ width: '100%' }}
      animationType="slide"
      visible={modals.open2}>
      {getModal2()}
      <Modals />
    </Modal>
  );
}

// Styles
const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'rgb(47, 55, 89)'
  },
  closeIcon: {
    color: '#afafaf',
  },
  closeButton: {
    flex: 0.15,
  },
});

export default Modals2;
