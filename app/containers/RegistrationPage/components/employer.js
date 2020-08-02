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

function Employee({ navigation, errors, onRegister, open, user }) {
  const [form, setForm] = useState(
    user || {
      countries: {},
      name: '',
      company_name: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: '',
      company_type_id: { id: 2, name: 'Агентство' },
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

  const handleChangeCountry = ({ id, name }) => {
    setForm({ ...form, countries: { id, name } });
  };

  const handleChangeCompanyType = ({ id, name }) => {
    setForm({ ...form, company_type_id: { id, name } });
  };

  const handleRegister = () => {
    onRegister(form);
  };

  const {
    email,
    password,
    name,
    phone_number,
    password_confirmation,
    countries,
    company_type_id,
    company_name,
  } = errors;

  return (
    <>
      <Form>
        <Item error={!!company_type_id} stackedLabel style={styles.select}>
          <Label style={styles.label}>Тип работодателя</Label>
          <Button
            style={{ justifyContent: 'space-between' }}
            full
            transparent
            onPress={() => {
              open({
                type: 'companyType',
                params: { useAsSelector: true, filteredTypes: true },
                callback: handleChangeCompanyType,
              });
            }}>
            <Text uppercase={false} style={styles.selectText}>
              {form.company_type_id?.name}
            </Text>
            <Icon
              type="SimpleLineIcons"
              name="arrow-down"
              style={styles.icon}
            />
          </Button>
        </Item>
        {company_type_id && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {validateMessage(company_type_id[0])}
            </Text>
          </View>
        )}
        {form.company_type_id.id === 2 && (
          <>
            <Item error={!!countries} stackedLabel style={styles.select}>
              <Label style={styles.label}>Где находится агенство?</Label>
              <Button
                style={{ justifyContent: 'space-between' }}
                transparent
                iconRight
                full
                onPress={() => {
                  open({
                    type: 'country',
                    params: { useAsSelector: true },
                    callback: handleChangeCountry,
                  });
                }}>
                <Text uppercase={false} style={styles.selectText}>
                  {form.countries?.name || 'Страна'}
                </Text>
                <Icon
                  type="SimpleLineIcons"
                  name="arrow-down"
                  style={styles.icon}
                />
              </Button>
            </Item>

            {countries && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {validateMessage(countries[0])}
                </Text>
              </View>
            )}
          </>
        )}

        <Item error={!!company_name} stackedLabel style={styles.item}>
          <Label style={styles.label}>Название компании или ФЛП (ФОП)</Label>
          <Input
            value={form.company_name}
            placeholder="пример: Иванов Иван ФЛП"
            onChangeText={handleChange('company_name')}
          />
        </Item>
        {company_name && (
          <View style={styles.error}>
            <Text style={styles.errorText}>
              {validateMessage(company_name[0])}
            </Text>
          </View>
        )}

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
  icon: {
    fontSize: 13,
  },
  buttonText: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
  },
  selectText: {
    color: 'rgb(87, 87, 87)',
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
  },
  item: {
    marginLeft: 0,
  },
  select: {
    marginLeft: 0,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Employee;
