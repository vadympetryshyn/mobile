import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Header,
  Text,
  Item,
  Input,
  Button,
  Icon,
  Thumbnail,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, openModal2 } from '../../containers/Modals/actions';
import {
  changeFilterRequest,
  getVacanciesRequest,
} from '../../containers/HomePage/actions';
import { countryWithCities } from '../../utils/serialize';
import { selectFilters } from '../../containers/HomePage/selectors';

function HeaderWithSearch({}) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const onTextChange = (val) => {
    dispatch(
      changeFilterRequest({ name: 'query', value: encodeURIComponent(val) }),
    );
  };
  const onSearch = () => {
    dispatch(getVacanciesRequest({ page: 1 }));
  };

  return (
    <View style={styles.wrapper}>
      <Header searchBar rounded>
        <Thumbnail
          smallest
          source={{ uri: 'https://amountwork.com/static/img/logo-small.png' }}
          resizeMode="contain"
        />

        <Item style={{ height: 40 }}>
          <Icon
            type="SimpleLineIcons"
            name="magnifier"
            style={{ fontSize: 18 }}
          />
          <Input
            style={{ height: 40 }}
            placeholder="Например: водитель"
            onChangeText={onTextChange}
            onSubmitEditing={onSearch}
          />
        </Item>
        <Button
          style={styles.iconFilterButton}
          transparent
          onPress={() => {
            dispatch(
              openModal2({
                type: 'filters',
              }),
            );
          }}>
          <Icon type="FontAwesome" name="sliders" style={styles.iconFilter} />
        </Button>
      </Header>
      <ScrollView style={styles.buttonsWrapper} horizontal>
        <View style={styles.buttonWrapper}>
          <Button
            iconRight
            filter
            onPress={() => {
              dispatch(
                openModal({
                  type: 'country',
                  params: { filteredCountries: true },
                }),
              );
            }}>
            <Text uppercase={false} style={styles.buttonText}>
              {!filters.selectedCountries.name
                ? 'Страна'
                : filters.selectedCountries.name}
            </Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-down"
              style={styles.icon}
            />
          </Button>
        </View>
        {countryWithCities().includes(filters.selectedCountries.slug) && (
          <View style={styles.buttonWrapper}>
            <Button
              iconRight
              filter
              onPress={() => {
                dispatch(openModal({ type: 'city' }));
              }}>
              <Text uppercase={false} style={styles.buttonText}>
                {!filters.selectedCities.name
                  ? 'Город'
                  : filters.selectedCities.name}
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
            filter
            onPress={() => {
              dispatch(openModal({ type: 'category' }));
            }}>
            <Text uppercase={false} style={styles.buttonText}>
              {!filters.selectedCategories.name
                ? 'Категория'
                : filters.selectedCategories.name}
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
            filter
            onPress={() => {
              dispatch(
                openModal({
                  type: 'companyType',
                  params: { filteredTypes: true },
                }),
              );
            }}>
            <Text uppercase={false} style={styles.buttonText}>
              {!filters.selectedType.name
                ? 'Тип работодателя'
                : filters.selectedType.name}
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
            filter
            onPress={() => {
              dispatch(
                openModal({
                  type: 'companyCountry',
                  params: { filteredCountries: false },
                }),
              );
            }}>
            <Text uppercase={false} style={styles.buttonText}>
              {!filters.selectedTypeCountries.name
                ? 'Агентство находится в'
                : filters.selectedTypeCountries.name}
            </Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-down"
              style={styles.icon}
            />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgb(47, 55, 89)',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 8,
  },
  buttonWrapper: {
    marginHorizontal: 4,
  },
  icon: {
    fontSize: 13,
  },
  buttonText: {
    textTransform: 'none',
    fontSize: 15,
  },
  iconFilter: {
    marginLeft: 0,
    marginRight: 0,
    height: 22,
    width: 22,
    color: '#fff',
  },
  iconFilterButton: {
    height: 40,
    width: 22,
    marginLeft: 10,
  },
});

export default HeaderWithSearch;
