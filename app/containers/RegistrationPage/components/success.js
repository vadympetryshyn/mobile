import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { H2 } from 'native-base';
import { Text, ListItem, List, Button, Icon } from 'native-base';

function Success({ user, setSuccess }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <View
        style={{
          backgroundColor: '#85be52',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <H2 style={{ color: '#fff' }}>Активируйте Ваш аккаунт!</H2>
      </View>
      <View style={{ marginTop: 15 }}>
        <Text>
          <Text style={styles.bold}>Перейдите по ссылке</Text>, которую мы Вам
          только что выслали по адресу{' '}
          <Text style={styles.underline}>{user.email}</Text>. Проверьте{' '}
          <Text style={styles.bold}>
            спам, промоакции, реклама и другие разделы,
          </Text>{' '}
          письмо может попасть туда.
        </Text>
        <Button
          transparent
          onPress={() => setShow(!show)}
          iconRight
          style={{ justifyContent: 'flex-start' }}
        >
          <Text
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              fontSize: 17,
              color: '#007bff',
            }}
            uppercase={false}
          >
            Не нашли письма?
          </Text>
          <Icon
            type="MaterialIcons"
            name="chevron-right"
            style={{ color: '#007bff', marginRight: 0, marginLeft: 0 }}
          />
        </Button>
        {show ? (
          <View>
            <List>
              <ListItem>
                <Text>
                  1. Проверьте{' '}
                  <Text style={styles.bold}>
                    спам, промоакции, реклама и другие разделы
                  </Text>{' '}
                  вашего почтового клиента, письмо вероятно попало туда!
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  2. Внимательно проверьте, и убедитесь что вы{' '}
                  <Text style={styles.bold}>
                    недопустили ошибки при написании почты
                  </Text>
                  !
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  3. Для смены, или повторной отправки email, нажмите{' '}
                  <Text style={styles.bold}>
                    "Вернуться к форме регистрации"
                  </Text>
                  , введите новый адрес и повторно нажмите "регистрация"
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  4. Если выше указаное Вам не помогло, пишите в тех. поддержку{' '}
                  <Text style={styles.bold}>info@amountwork.com</Text> мы очень
                  быстро отвечаем
                </Text>
              </ListItem>
            </List>
            <Button
              transparent
              iconLeft
              style={{ justifyContent: 'flex-start' }}
              onPress={() => setSuccess(false)}
            >
              <Icon
                type="MaterialIcons"
                name="chevron-left"
                style={{ color: '#007bff', marginRight: 0, marginLeft: 0 }}
              />
              <Text
                uppercase={false}
                style={{ paddingLeft: 0, color: '#007bff', fontSize: 17 }}
              >
                Вернуться к форме регистрации
              </Text>
            </Button>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default Success;
