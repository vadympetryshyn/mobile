import React, { useEffect } from 'react';
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
  Left,
  Body,
  Title,
  Header,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getEmploymentTypesRequest } from '../actions';

import { selectModalsRoot } from '../selectors';

const EmploymentType = ({}) => {
  const dispatch = useDispatch();
  const modals = useSelector(selectModalsRoot);
  let employmentTypes = modals.employmentTypes;

  useEffect(() => {
    if (!employmentTypes.length) {
      dispatch(getEmploymentTypesRequest());
    }
  }, []);

  const onClose = () => {
    dispatch(closeModal());
  };
  const onPress = (slug, name) => () => {
    modals.callback({ id: slug, name });
    onClose();
  };

  if (!employmentTypes.length) {
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
          <Title>Тип зайнятости</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <List>
            {employmentTypes.map((type) => {
              return (
                <ListItem key={type.id} onPress={onPress(type.id, type.name)}>
                  <Text>{type.name}</Text>
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

export default EmploymentType;
