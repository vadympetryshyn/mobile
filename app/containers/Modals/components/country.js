import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  List,
  ListItem,
  Spinner,
  Icon,
  Input,
  Item,
  Left,
  Body,
  Title,
  Header,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getCountriesRequest, getCitiesSuccess } from '../actions';
import {
  changeFilterRequest,
  getVacanciesRequest,
} from '../../HomePage/actions';
import { filterCountries } from '../../../utils/serialize';
import { selectModalsRoot } from '../selectors';
import { selectFilters } from '../../HomePage/selectors';

const Country = ({}) => {
  const dispatch = useDispatch();
  const modals = useSelector(selectModalsRoot);
  const filters = useSelector(selectFilters);
  const localOrGlobalFilters = modals.params?.filters || filters;
  const [text, setText] = useState(
    localOrGlobalFilters.selectedCountries.name || '',
  );
  const [filtered, setFiltered] = useState(null);
  let countries = [];

  if (modals.params.filteredCountries) {
    countries = modals.countries.filter(filterCountries);
  } else {
    countries = modals.countries;
  }

  useEffect(() => {
    if (!countries.length) {
      dispatch(getCountriesRequest());
    }
  }, []);

  const onClose = () => {
    dispatch(closeModal());
  };
  const onTextChange = (val) => {
    setText(val);
    const reg = new RegExp(val, 'gi');
    const filter = countries.filter((country) => {
      return reg.test(country.name);
    });
    setFiltered(filter);
  };
  const onPress = (slug, name, id) => () => {
    if (!modals.params.useAsSelector) {
      if (modals.cities.length) {
        dispatch(getCitiesSuccess([]));
      }
      if (!modals.open2) {
        dispatch(
          changeFilterRequest({
            name: 'selectedCities',
            value: '',
          }),
        );
        dispatch(
          changeFilterRequest({
            name: 'selectedCountries',
            value: { slug, name },
          }),
        );
        dispatch(getVacanciesRequest({ page: 1 }));
      } else {
        modals.callback({
          selectedCountries: { slug, name },
          selectedCities: '',
        });
      }
    } else {
      modals.callback({ id, name });
    }

    onClose();
  };

  const onClear = () => {
    setText('');
    setFiltered(null);
    if (!modals.open2) {
      dispatch(
        changeFilterRequest({
          name: 'selectedCountries',
          value: '',
        }),
      );
      dispatch(getVacanciesRequest({ page: 1 }));
    } else {
      modals.callback({ selectedCountries: '' });
    }
  };

  if (!countries.length) {
    return <Spinner />;
  }

  return (
    <>
      <Header>
        <Left style={styles.closeButton}>
          <Button transparent onPress={onClose}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Страны</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <Item style={styles.item}>
            <Icon name="ios-search" />
            <Input
              autoFocus
              value={text}
              placeholder="Введите название страны"
              onChangeText={onTextChange}
            />
            {text ? (
              <Button onPress={onClear} transparent>
                <Icon type="MaterialIcons" name="clear" />
              </Button>
            ) : null}
          </Item>
          <List>
            {(filtered || countries).map((country) => {
              return (
                <ListItem
                  key={country.id}
                  onPress={onPress(country.slug, country.name, country.id)}>
                  <Text>{country.name}</Text>
                </ListItem>
              );
            })}
          </List>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    paddingLeft: 15,
  },
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

export default Country;
