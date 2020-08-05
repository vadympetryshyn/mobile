import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Text,
  Container,
  Content,
  List,
  ListItem,
  Spinner,
  Icon,
  Left,
  Body,
  Title,
  Header,
  CheckBox,
  Footer,
} from 'native-base';
import { closeModal, getCategoriesRequest } from '../actions';
import { selectModalsRoot } from '../selectors';
import {
  changeFilterRequest,
  getVacanciesRequest,
  getVacanciesCountRequest,
  getVacanciesCountSuccess,
} from '../../HomePage/actions';
import { selectFilters, selectCount } from '../../HomePage/selectors';

const Category = ({}) => {
  const dispatch = useDispatch();
  const modals = useSelector(selectModalsRoot);
  const filters = useSelector(selectFilters);
  const count = useSelector(selectCount);

  const localOrGlobalFilters = modals.params?.filters || filters;
  const [localFilters, setLocalFilters] = useState(
    localOrGlobalFilters.selectedCategories || { name: '', slug: '' },
  );
  useEffect(() => {
    if (!modals.categories.length) {
      dispatch(getCategoriesRequest());
    }
  }, []);

  const onClose = () => {
    dispatch(closeModal());
    if (!modals.open2) {
      dispatch(getVacanciesCountSuccess());
    }
  };

  if (!modals.categories.length) {
    return <Spinner />;
  }

  const checkUserHandler = (slug) => () => {
    let newArr = [...localFilters.slug];
    if (!newArr.includes(slug)) {
      newArr.push(slug);
    } else {
      newArr = newArr.filter((itemId) => itemId !== slug);
    }
    const obj = {
      name: newArr.length
        ? modals.categories.find((cat) => cat.slug === newArr[0]).name
        : '',
      slug: newArr,
    };
    setLocalFilters(obj);
    if (!modals.open2) {
      dispatch(
        getVacanciesCountRequest({
          filters: {
            selectedCategories: obj,
          },
        }),
      );
    }
  };

  const show = () => {
    if (modals.callback) {
      modals.callback({ selectedCategories: localFilters });
    } else {
      dispatch(
        changeFilterRequest({
          name: 'selectedCategories',
          value: localFilters,
        }),
      );
      dispatch(getVacanciesRequest({ page: 1 }));
    }
    dispatch(closeModal());
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
          <Title>Категории</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <List>
            {modals.categories.map((category) => {
              return (
                <ListItem
                  key={category.id}
                  onPress={checkUserHandler(category.slug, category.name)}>
                  <CheckBox
                    checked={localFilters.slug.includes(category.slug)}
                    onPress={checkUserHandler(category.slug, category.name)}
                  />
                  <Body>
                    <Text>{category.name}</Text>
                  </Body>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Footer style={styles.footer}>
          <Button full yellow onPress={show}>
            <Text uppercase={false} style={styles.buttonText}>
              {modals.params?.show ? `Показать ${count} вакансий` : 'Выбрать'}
            </Text>
          </Button>
        </Footer>
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
    fontSize: 22,
  },
  closeButton: {
    flex: 0.15,
  },
  footer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Category;
