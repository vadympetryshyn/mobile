import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Text,
  Content,
  Form,
  Item,
  Input,
  Button,
  Toast,
  Root,
  Icon,
} from 'native-base';
import { loginRequest, loginFailure } from '../App/actions/auth';
import HeaderBack from '../../components/Header/headerBack';
import { validateMessage } from '../../utils/translate';
import { selectLogin } from '../App/selectors';

function LoginPage({ navigation }) {
  const dispatch = useDispatch();
  const errors = useSelector(selectLogin);
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (name) => (val) => {
    setForm({
      ...form,
      [name]: val,
    });
  };
  const handleLogin = () => {
    dispatch(loginRequest(form));
  };

  useEffect(() => {
    if (errors.message) {
      Toast.show({
        text: errors.message,
        buttonText: 'Ok',
        type: 'danger',
        duration: 8000,
      });
      dispatch(loginFailure({ ...errors, message: '' }));
    }
  }, [errors.message]);

  useEffect(() => {
    return () => {
      dispatch(loginFailure({}));
    };
  }, []);

  const { email, password } = errors.errors;

  return (
    <Root>
      <Container>
        <HeaderBack navigation={navigation} title="Вход" />
        <Content>
          <Form>
            <Item error={!!email}>
              <Input
                value={form.email}
                placeholder="E-mail"
                onChangeText={handleChange('email')}
              />
            </Item>
            {email && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {validateMessage(email[0])}
                </Text>
              </View>
            )}
            <Item error={!!password}>
              <Input
                value={form.password}
                secureTextEntry
                placeholder="Пароль"
                onChangeText={handleChange('password')}
              />
            </Item>
            {password && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {validateMessage(password[0])}
                </Text>
              </View>
            )}
          </Form>
          <View style={{ marginTop: 20, paddingLeft: 10, paddingRight: 10 }}>
            <Button full yellow onPress={handleLogin}>
              <Text uppercase={false} style={{ fontSize: 18 }}>
                Войти
              </Text>
            </Button>
          </View>
          <View style={{ marginTop: 25 }}>
            <Button
              iconRight
              transparent
              style={{ justifyContent: 'center' }}
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.buttonText} uppercase={false}>
                Еще не с нами?{' '}
                <Text style={styles.buttonText} uppercase={false}>
                  Зарегистрироваться
                </Text>
              </Text>
              <Icon
                type="MaterialIcons"
                name="chevron-right"
                style={{ color: '#000', marginRight: 0, marginLeft: 0 }}
              />
            </Button>
          </View>
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
  icon: { color: 'green', marginRight: 10, fontSize: 18 },
  buttonText: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default LoginPage;
