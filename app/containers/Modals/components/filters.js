import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Icon,
  Left,
  Body,
  Title,
  Header,
  Footer,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal2 } from '../actions';
import {
  getVacanciesRequest,
  getVacanciesCountRequest,
  setFilterRequest,
} from '../../HomePage/actions';
import { countryWithCities } from '../../../utils/serialize';
import { selectCount, selectFilters } from '../../HomePage/selectors';

const Filters = ({}) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const count = useSelector(selectCount);
  const [localFilters, setLocalFilters] = useState(filters);
  const onClose = () => {
    dispatch(closeModal2());
  };

  const setFiltersHandler = (obj) => {
    const newObj = { ...localFilters, ...obj };
    setLocalFilters(newObj);
    dispatch(
      getVacanciesCountRequest({
        filters: newObj,
      }),
    );
  };

  const show = () => {
    dispatch(setFilterRequest(localFilters));
    dispatch(getVacanciesRequest({ page: 1 }));
    dispatch(closeModal2());
  };

  const clearAllFilter = () => {
    setLocalFilters({
      query: '',
      selectedCountries: '',
      selectedCities: '',
      selectedCategories: '',
      selectedType: '',
      selectedTypeCountries: '',
    });
    dispatch(
      getVacanciesCountRequest({
        filters: null,
      }),
    );
  };
  return (
    <>
      <Header>
        <Left style={styles.closeButton}>
          <Button transparent onPress={onClose}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Фильтры</Title>
        </Body>
      </Header>
      <Container>
        <Content style={{ backgroundColor: '#2f3759' }}>
          <View style={styles.buttonsWrapper} horizontal>
            <View style={styles.buttonWrapper}>
              <Button
                iconRight
                filterModal
                onPress={() => {
                  dispatch(
                    openModal({
                      type: 'country',
                      params: {
                        filteredCountries: true,
                        filters: localFilters,
                      },
                      callback: setFiltersHandler,
                    }),
                  );
                }}>
                <Text uppercase={false} style={styles.buttonText}>
                  {!localFilters.selectedCountries.name
                    ? 'Страна'
                    : localFilters.selectedCountries.name}
                </Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-down"
                  style={styles.icon}
                />
              </Button>
            </View>
            {countryWithCities().includes(
              localFilters.selectedCountries.slug,
            ) && (
              <View style={styles.buttonWrapper}>
                <Button
                  iconRight
                  filterModal
                  onPress={() => {
                    dispatch(
                      openModal({
                        type: 'city',
                        callback: setFiltersHandler,
                        params: { filters: localFilters },
                      }),
                    );
                  }}>
                  <Text uppercase={false} style={styles.buttonText}>
                    {!localFilters.selectedCities.name
                      ? 'Город'
                      : localFilters.selectedCities.name}
                  </Text>
                  <Icon
                    type="SimpleLineIcons"
                    name="arrow-down"
                    style={styles.icon}
                  />
                </Button>
              </View>
            )}
            <View style={styles.buttonWrapper}>
              <Button
                iconRight
                filterModal
                onPress={() => {
                  dispatch(
                    openModal({
                      type: 'category',
                      callback: setFiltersHandler,
                      params: { filters: localFilters, show: true },
                    }),
                  );
                }}>
                <Text uppercase={false} style={styles.buttonText}>
                  {!localFilters.selectedCategories.name
                    ? 'Категория'
                    : localFilters.selectedCategories.name}
                </Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-down"
                  style={styles.icon}
                />
              </Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                iconRight
                filterModal
                onPress={() => {
                  dispatch(
                    openModal({
                      type: 'companyType',
                      params: { filteredTypes: true, filters: localFilters },
                      callback: setFiltersHandler,
                    }),
                  );
                }}>
                <Text uppercase={false} style={styles.buttonText}>
                  {!localFilters.selectedType.name
                    ? 'Тип работодателя'
                    : localFilters.selectedType.name}
                </Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-down"
                  style={styles.icon}
                />
              </Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                iconRight
                filterModal
                onPress={() => {
                  dispatch(
                    openModal({
                      type: 'companyCountry',
                      params: {
                        filteredCountries: false,
                        filters: localFilters,
                      },
                      callback: setFiltersHandler,
                    }),
                  );
                }}>
                <Text uppercase={false} style={styles.buttonText}>
                  {!localFilters.selectedTypeCountries.name
                    ? 'Агентство находится в'
                    : localFilters.selectedTypeCountries.name}
                </Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-down"
                  style={styles.icon}
                />
              </Button>
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                transparent
                onPress={clearAllFilter}
                style={{
                  paddingLeft: 0,
                  justifyContent: 'flex-start',
                  marginTop: 20,
                }}>
                <Icon
                  style={{
                    marginRight: 0,
                    marginLeft: 0,
                    color: 'rgb(175, 175, 175)',
                    fontSize: 22,
                    marginTop: 3,
                  }}
                  type="MaterialIcons"
                  name="clear"
                />
                <Text
                  uppercase={false}
                  style={{ paddingLeft: 5, fontSize: 16, color: '#fff' }}>
                  Сбросить все фильтры
                </Text>
              </Button>
            </View>
          </View>
        </Content>
        <Footer style={styles.footer}>
          <Button yellow onPress={show} full>
            <Text style={styles.buttonText} uppercase={false}>
              Показать {count} вакансий
            </Text>
          </Button>
        </Footer>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    flex: 0.15,
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginHorizontal: 8,
    paddingBottom: 10,
  },
  icon: {
    fontSize: 13,
  },
  buttonText: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#2f3759',
  },
  closeIcon: {
    color: '#afafaf',
    fontSize: 22,
  },
});

export default Filters;
