import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Icon,
  Left,
  Body,
  Title,
  Header,
  List,
  Root,
  ListItem,
} from 'native-base';
import { closeModal } from '../actions';
import { useDispatch } from 'react-redux';

const GetRegistration = ({}) => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(closeModal());
  };

  const registerHandle = () => {};

  return (
    <Root>
      <Header>
        <Left style={styles.closeButton}>
          <Button transparent onPress={onClose}>
            <Icon type="MaterialIcons" name="close" />
          </Button>
        </Left>
        <Body>
          <Title>Регистрируйся на Amountwork!</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <List>
            <ListItem>
              <Icon type="FontAwesome" name="check" style={styles.icon} />
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Бесплатно публикуй</Text>{' '}
                вакансии или резюме;
              </Text>
            </ListItem>
            <ListItem>
              <Icon type="FontAwesome" name="check" style={styles.icon} />
              <Text>
                Делай закладки в{' '}
                <Text style={{ fontWeight: 'bold' }}>избранные</Text>;
              </Text>
            </ListItem>
            <ListItem>
              <Icon type="FontAwesome" name="check" style={styles.icon} />
              <Text>
                Получай <Text style={{ fontWeight: 'bold' }}>отклики</Text> от
                работодателей или соискателей;
              </Text>
            </ListItem>
            <ListItem>
              <Icon type="FontAwesome" name="check" style={styles.icon} />
              <Text>
                Управляй публикациями в своем{' '}
                <Text style={{ fontWeight: 'bold' }}>личном кабинете</Text>
              </Text>
            </ListItem>
          </List>
          <View
            style={{
              paddingRight: 15,
              paddingLeft: 15,
              marginTop: 15,
              justifyContent: 'center',
            }}>
            <Button full yellow onPress={registerHandle}>
              <Text uppercase={false} style={styles.buttonText}>
                Зарегистрироваться
              </Text>
              <Icon
                type="MaterialIcons"
                name="chevron-right"
                style={{ color: '#000', marginRight: 0, marginLeft: 0 }}
              />
            </Button>
            <View style={{ marginTop: 15 }}>
              <Button transparent style={{ justifyContent: 'center' }}>
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
            <View
              style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text uppercase={false}>Подписывайся на вакансии:</Text>
              <Button
                transparent
                style={{ justifyContent: 'center' }}
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/amountwork/')
                }>
                <Icon
                  type="Entypo"
                  name="facebook-with-circle"
                  style={{
                    color: '#2C3858',
                    marginRight: 10,
                    marginLeft: 10,
                    fontSize: 30,
                  }}
                />
              </Button>
              <Button
                transparent
                style={{ justifyContent: 'center' }}
                onPress={() => Linking.openURL('https://t.me/amountwork')}>
                <Icon
                  type="FontAwesome"
                  name="telegram"
                  style={{
                    color: '#00AFDD',
                    marginRight: 0,
                    marginLeft: 0,
                    fontSize: 30,
                  }}
                />
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    </Root>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  closeButton: {
    flex: 0.15,
  },
  icon: { color: 'green', marginRight: 10, fontSize: 18 },
  buttonText: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default GetRegistration;
