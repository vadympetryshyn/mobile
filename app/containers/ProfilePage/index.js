import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container,
  Text,
  Content,
  Button,
  ListItem,
  Root,
  Icon,
  Body,
  Left,
  List,
} from 'native-base';

import FooterMenu from '../../components/Footer/footerMenu';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './sagas';
import { DAEMON } from '../../utils/constants';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducers';
import { useSelector } from 'react-redux';
import { selectUser } from '../App/selectors';

function Profile({ navigation, route }) {
  const user = useSelector(selectUser);
  useInjectSaga({ key: 'profile', saga, mode: DAEMON });
  useInjectReducer({
    key: 'profile',
    reducer,
  });
  return (
    <Root>
      <Container>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 220,
            backgroundColor: '#2f3759',
          }}>
          <View
            style={{
              borderRadius: 100,
              borderWidth: 3,
              borderColor: '#fff',
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon style={styles.icon} type="FontAwesome" name="user" />
          </View>
          <Text style={{ marginTop: 15, fontSize: 18, color: '#fff' }}>
            {user.name}
          </Text>
        </View>
        <Content padder>
          <View>
            <Button yellow>
              <Text uppercase={false}>Создать резюме</Text>
            </Button>
          </View>
          <List style={{ marginTop: 20 }}>
            <ListItem icon onPress={() => navigation.navigate('MyResumes')}>
              <Left>
                <Button transparent>
                  <Icon
                    type="FontAwesome"
                    name="file-text"
                    style={styles.iconList}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Мои резюме</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    type="FontAwesome"
                    name="heart-o"
                    style={styles.iconList}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Закладки</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    type="FontAwesome"
                    name="user"
                    style={styles.iconList}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Личные данные</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button transparent>
                  <Icon
                    type="FontAwesome5"
                    name="lock"
                    style={styles.iconList}
                  />
                </Button>
              </Left>
              <Body>
                <Text>Сменить пароль</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <FooterMenu
          routeName={route.name}
          navigation={navigation}
          user={user}
        />
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
  icon: { color: '#fff', marginRight: 0, fontSize: 58 },
  iconList: {
    color: '#b3b3b3',
  },
});

export default Profile;
