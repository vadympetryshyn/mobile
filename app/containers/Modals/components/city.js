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
import { closeModal, getCitiesRequest } from '../actions';
import {
  changeFilterRequest,
  getVacanciesRequest,
} from '../../HomePage/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalsRoot } from '../selectors';
import { selectFilters } from '../../HomePage/selectors';

const City = ({}) => {
  const dispatch = useDispatch();
  const modals = useSelector(selectModalsRoot);
  const filters = useSelector(selectFilters);
  const localOrGlobalFilters = modals.params?.filters || filters;
  const [text, setText] = useState(
    localOrGlobalFilters.selectedCities.name || '',
  );
  const [filtered, setFiltered] = useState(null);
  const { cities } = modals;

  useEffect(() => {
    dispatch(
      getCitiesRequest({
        selectedCountries: localOrGlobalFilters.selectedCountries.slug,
      }),
    );
  }, []);

  const onClose = () => {
    dispatch(closeModal());
  };
  const onTextChange = (val) => {
    setText(val);
    const reg = new RegExp(val, 'gi');
    const filter = cities.filter((country) => {
      return reg.test(country.name);
    });
    setFiltered(filter);
  };
  const onPress = (slug, name) => () => {
    if (!modals.open2) {
      dispatch(
        changeFilterRequest({
          name: 'selectedCities',
          value: { slug, name },
        }),
      );
      dispatch(getVacanciesRequest({ page: 1 }));
    } else {
      modals.callback({ selectedCities: { slug, name } });
    }
    onClose();
  };

  const onClear = () => {
    setText('');
    setFiltered(null);
    if (!modals.open2) {
      dispatch(
        changeFilterRequest({
          name: 'selectedCities',
          value: '',
        }),
      );
      dispatch(getVacanciesRequest({ page: 1 }));
    } else {
      modals.callback({ selectedCities: '' });
    }
  };

  if (!cities.length) {
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
          <Title>Города</Title>
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
            {(filtered || cities).map((city) => {
              return (
                <ListItem key={city.id} onPress={onPress(city.slug, city.name)}>
                  <Text>{city.name}</Text>
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

export default City;
