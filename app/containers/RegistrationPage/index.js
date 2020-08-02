import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, Content, Button, Toast, Root } from 'native-base';
import {
  registerRequest,
  registerFailure,
  registerSuccess,
} from '../App/actions/auth';
import HeaderBack from '../../components/Header/headerBack';
import Employee from './components/employee';
import Employer from './components/employer';
import Success from './components/success';
import { openModal } from '../Modals/actions';
import { selectRegister } from '../App/selectors';

function Registration({ navigation, registerFail, register, registerSuc }) {
  const dispatch = useDispatch();
  const { user, errors } = useSelector(selectRegister);
  const [tab, setTab] = useState(1);
  const [success, setSuccess] = useState(!!user);

  useEffect(() => {
    if (Object.keys(errors).length) {
      Toast.show({
        text: 'Ошибка регистрации, проверьте пожалуйста введеные данные',
        buttonText: 'Ok',
        type: 'danger',
        duration: 4000,
      });
    }
  }, [errors]);

  useEffect(() => {
    return () => {
      dispatch(registerFailure({}));
      dispatch(registerSuccess(false));
    };
  }, []);

  useEffect(() => {
    if (user?.email) {
      setSuccess(true);
    }
  }, [user]);

  const handleRegister = (form) => {
    dispatch(registerRequest({ ...form, country: 'eu' }));
  };

  const open = () => {
    dispatch(openModal());
  };

  return (
    <Root>
      <Container>
        <HeaderBack navigation={navigation} title="Регистрация" />
        {!success && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              style={{ flex: 1, justifyContent: 'center' }}
              bordered={tab !== 1}
              yellow={tab === 1}
              onPress={() => setTab(1)}>
              <Text>Я ищу работу</Text>
            </Button>
            <Button
              style={{ flex: 1, justifyContent: 'center' }}
              bordered={tab !== 2}
              yellow={tab === 2}
              onPress={() => setTab(2)}>
              <Text>Я работодатель</Text>
            </Button>
          </View>
        )}
        <Content padder>
          {success && <Success user={user} setSuccess={setSuccess} />}
          {tab === 1 && !success && (
            <Employee
              user={user}
              navigation={navigation}
              errors={errors}
              onRegister={handleRegister}
            />
          )}
          {tab === 2 && !success && (
            <Employer
              user={user}
              open={open}
              navigation={navigation}
              errors={errors}
              onRegister={handleRegister}
            />
          )}
        </Content>
      </Container>
    </Root>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingLeft: 15,
  },
  errorText: {
    color: 'rgb(237, 47, 47)',
  },
  buttonText: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default Registration;
