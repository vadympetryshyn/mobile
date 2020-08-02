import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Label,
  CheckBox,
  Body,
  ListItem,
} from 'native-base';
import { validateMessage } from '../../../utils/translate';

function Employee({ navigation, errors, onRegister, user }) {
  const [form, setForm] = useState(
    user || {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      company_type_id: 3,
    },
  );
  const [agr, setAgr] = useState(true);
  const handleChange = (name) => (val) => {
    setForm({
      ...form,
      [name]: val,
    });
  };

  const handleChangePhone = (val = '') => {
    let value = val.replace(/[^+\d\s\-]/gi, '');
    setForm({ ...form, phone_number: value });
  };

  const handleRegister = () => {
    onRegister(form);
  };

  const { email, password, name, phone_number, password_confirmation } = errors;

  return (
    <>
      <Form>
        <Item error={!!name} stackedLabel style={styles.item}>
          <Label style={styles.label}>Имя и фамилия</Label>
          <Input
            value={form.name}
            placeholder="пример: Иванов Иван"
            onChangeText={handleChange('name')}
          />
        </Item>
        {name && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{validateMessage(name[0])}</Text>
          </View>
        )}

        <Item error={!!email} stackedLabel style={styles.item}>
          <Label style={styles.label}>E-mail</Label>
          <Input
            value={form.email}
            placeholder="пример: myemail@gmail.com"
            onChangeText={handleChange('email')}
          />
        </Item>
        {email && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{validateMessage(email[0])}</Text>
          </View>
        )}

        <Item error={!!phone_number} stackedLabel style={styles.item}>
          <Label style={styles.label}>Номер телефона</Label>
          <Input
            value={form.phone_number}
            placeholder="пример: +38 099 999 99 99"
            onChangeText={handleChangePhone}
          />
        </Item>
        {phone_number && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {validateMessage(phone_number[0])}
            </Text>
          </View>
        )}

        <Item error={!!password} stackedLabel style={styles.item}>
          <Label style={styles.label}>Пароль</Label>
          <Input
            value={form.password}
            secureTextEntry
            placeholder="Не менее 6 символов"
            onChangeText={handleChange('password')}
          />
        </Item>
        {password && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{validateMessage(password[0])}</Text>
          </View>
        )}

        <Item error={!!password_confirmation} stackedLabel style={styles.item}>
          <Label style={styles.label}>Пароль еще раз</Label>
          <Input
            value={form.password_confirmation}
            secureTextEntry
            placeholder="Введите повторно"
            onChangeText={handleChange('password_confirmation')}
          />
        </Item>
        {password_confirmation && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {validateMessage(password_confirmation[0])}
            </Text>
          </View>
        )}
      </Form>

      <ListItem style={styles.item}>
        <CheckBox checked={agr} onPress={() => setAgr(!agr)} />
        <Body>
          <Text>Я принимаю условия</Text>
          <Button transparent onPress={() => navigation.navigate('Agreement')}>
            <Text uppercase={false}>"Пользовательского соглашения"</Text>
          </Button>
        </Body>
      </ListItem>
      <View style={{ marginTop: 20 }}>
        <Button disabled={!agr} full yellow onPress={handleRegister}>
          <Text uppercase={false} style={{ fontSize: 18 }}>
            Регистрация
          </Text>
        </Button>
      </View>

      <View style={{ marginTop: 25 }}>
        <Button
          iconRight
          transparent
          style={{ justifyContent: 'center' }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText} uppercase={false}>
            Уже с нами?{' '}
            <Text style={styles.buttonText} uppercase={false}>
              Вход
            </Text>
          </Text>
          <Icon
            type="MaterialIcons"
            name="chevron-right"
            style={{ color: '#000', marginRight: 0, marginLeft: 0 }}
          />
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingLeft: 0,
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
  item: {
    marginLeft: 0,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Employee;
