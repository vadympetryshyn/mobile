import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Content } from 'native-base';

import { getVacanciesRequest } from './actions';
import { selectVacanciesRoot } from './selectors';
import VacancyList from '../../components/Vacancies/vacancyList';
import HeaderWithSearch from '../../components/Header/headerWithSearch';
import FooterMenu from '../../components/Footer/footerMenu';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { DAEMON } from '../../utils/constants';
import reducer from './reducers';
import saga from './sagas';
import { selectUser } from '../App/selectors';

function HomePage({ navigation, route }) {
  useInjectSaga({ key: 'vacancies', saga, mode: DAEMON });
  useInjectReducer({
    key: 'vacancies',
    reducer,
  });
  const dispatch = useDispatch();
  const { loading, vacancies, totalElements, totalPages, page } = useSelector(
    selectVacanciesRoot,
  );
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getVacanciesRequest({ page: 1 }));
  }, []);

  useEffect(() => {
    if (ref?.current?._root && totalElements) {
      // eslint-disable-next-line no-underscore-dangle
      ref.current._root.scrollToPosition(0, 0);
    }
  }, [totalElements]);

  const ref = useRef(null);

  const infinityScroll = (e) => {
    if (!loading) {
      const scrollHeight =
        e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
      const dif = e.nativeEvent.contentSize.height.toFixed(0) - scrollHeight;
      if (dif.toFixed(0) < 500 && totalPages !== page) {
        dispatch(getVacanciesRequest({ page: page + 1 }));
      }
    }
  };

  const onRefresh = () => {
    dispatch(getVacanciesRequest({ page: 1 }));
  };

  return (
    <Container grey>
      <HeaderWithSearch />
      <Content
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ref={ref}
        padder
        scrollEventThrottle={300}
        onScroll={infinityScroll}>
        <View>
          <Text>{`${
            totalElements > 5000 ? totalElements + 6000 : totalElements
          } вакансий`}</Text>
        </View>
        <VacancyList vacancies={vacancies} navigation={navigation} />
      </Content>
      <FooterMenu routeName={route.name} navigation={navigation} user={user} />
    </Container>
  );
}

const styles = StyleSheet.create({});

export default HomePage;
