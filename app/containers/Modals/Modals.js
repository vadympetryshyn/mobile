import React from 'react';
import { StyleSheet, Modal, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Country from './components/country';
import Category from './components/category';
import City from './components/city';
import CompanyType from './components/companyType';
import EmploymentType from './components/employmentType';
import CompanyCountry from './components/companyCountry';
import SendResume from './components/sendResume';
import GetRegistration from './components/getRegistration';
import Complaint from './components/complaint';
import { selectModalsRoot } from './selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducers';
import saga from './sagas';

function Modals({}) {
  useInjectSaga({ key: 'modals', saga, mode: DAEMON });
  useInjectReducer({
    key: 'modals',
    reducer,
  });
  const modals = useSelector(selectModalsRoot);
  if (!modals.open) {
    return null;
  }

  const getModal = () => {
    switch (modals.type) {
      case 'country':
        return <Country />;
      case 'companyCountry':
        return <CompanyCountry />;
      case 'category':
        return <Category />;
      case 'city':
        return <City />;
      case 'companyType':
        return <CompanyType />;
      case 'sendResume':
        return <SendResume />;
      case 'getRegistration':
        return <GetRegistration />;
      case 'complaint':
        return <Complaint />;
      case 'employmentType':
        return <EmploymentType />;
      default:
        return <Text>Такого модального окна не найдено</Text>;
    }
  };

  return (
    <Modal
      style={{ width: '100%' }}
      animationType="slide"
      visible={modals.open}>
      {getModal()}
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

export default Modals;
