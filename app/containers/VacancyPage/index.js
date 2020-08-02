// Imports: Dependencies
import React, { useEffect } from 'react';
import { StyleSheet, View, Linking, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import uid from 'uid';
import { useDispatch, useSelector } from 'react-redux';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  Container,
  Spinner,
  Text,
  Content,
  Card,
  CardItem,
  Button,
  H1,
  H2,
  Icon,
  Left,
  Right,
  Footer,
  Toast,
} from 'native-base';
import {
  getVacancyRequest,
  getVacancySuccess,
  favoriteToggleRequest,
  favoriteToggleSuccess,
} from '../HomePage/actions';
import { openModal } from '../Modals/actions';
import HeaderBack from '../../components/Header/headerBack';
import { formatDateFromSql, diffFromNowInDays } from '../../utils/date';
import { selectVacanciesRoot } from '../HomePage/selectors';
import { selectUser } from '../App/selectors';

function Vacancy({ navigation, route }) {
  const dispatch = useDispatch();
  const { loading, vacancy, favorites } = useSelector(selectVacanciesRoot);
  const user = useSelector(selectUser);
  // useEffect(() => {
  //   getVacancy({ id: '690', slug: 'gornichnaya-v-gretsiyu' });
  // }, []);

  useEffect(() => {
    dispatch(
      getVacancyRequest({ id: route.params.id, slug: route.params.slug }),
    );
  }, [route.params.id]);

  useEffect(() => {
    if (favorites.notifyNumber) {
      Toast.show({
        text:
          favorites.notifyNumber === 1
            ? 'Успешно добавлено в избранные'
            : 'Успешно удалено из избранных',
        buttonText: 'Ok',
        type: 'success',
        duration: 2000,
      });
      dispatch(favoriteToggleSuccess(null));
    }
  }, [favorites.notifyNumber]);

  if (loading || !vacancy.id) {
    return (
      <Container grey>
        <Spinner style={{ flex: 1 }} />
      </Container>
    );
  }

  const city =
    vacancy.cities_ua && vacancy.cities_ua.length
      ? `, ${vacancy.cities_ua[0].name}`
      : '';
  const place = vacancy.city ? ` (${vacancy.city})` : '';
  let phoneNumber = vacancy.phone_number;
  if (vacancy.phone_from_user && vacancy.user.phone_number) {
    phoneNumber = vacancy.user.phone_number;
  }
  let youtube = null;
  if (vacancy.youtube) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = vacancy.youtube.match(regExp);
    if (match && match[2]) {
      // eslint-disable-next-line prefer-destructuring
      youtube = match[2];
    }
  }

  let stickyPhone = null;
  if (phoneNumber) {
    const splitNumber = phoneNumber.split(/\+|;|,/);
    stickyPhone = (splitNumber.length > 1
      ? `+${splitNumber[1]}`
      : splitNumber[0]
    ).replace(/\s|\(|\)|[a-zA-Z]+|-|,/gi, '');
  }
  let viberNumber = vacancy.viber_number;
  if (vacancy.viber_from_user && vacancy.user.phone_number) {
    viberNumber = vacancy.user.phone_number;
  }
  let stickyViber = null;
  if (viberNumber) {
    const splitNumber = viberNumber.split(/\+|;|,/);
    stickyViber = (splitNumber.length > 1
      ? `${splitNumber[1]}`
      : splitNumber[0]
    ).replace(/\s|\(|\)|[a-zA-Z]+|-|,/gi, '');
  }
  let favorite = false;
  if (user?.id) {
    favorite = user.favorite_vacancies.find((elem) => elem.id === vacancy.id);
  }

  const favoriteToggleHandle = () => {
    if (user?.id) {
      dispatch(favoriteToggleRequest(user.id, vacancy.id));
    } else {
      dispatch(openModal({ type: 'getRegistration' }));
    }
  };

  const archive = () => {
    return diffFromNowInDays(vacancy.updated_at) > 59 ? (
      <CardItem
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        <Left>
          <Text
            style={{
              backgroundColor: '#ccc',
              color: '#fff',
              borderRadius: 2,
              margin: 10,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: 0,
            }}>
            Вакансия опубликована более 60 дней назад, и может быть неактуальна
          </Text>
        </Left>
      </CardItem>
    ) : null;
  };

  return (
    <Container grey>
      <HeaderBack
        callback={() => dispatch(getVacancySuccess({}))}
        navigation={navigation}
        title={vacancy.name}
      />
      <Content padder>
        <Card shadow style={{ marginBottom: 0 }}>
          {archive()}
          <CardItem>
            <Left>
              <H1 style={{ paddingRight: 25 }}>{vacancy.name}</H1>
              <Button
                style={{
                  position: 'absolute',
                  right: -6,
                  top: -5,
                  paddingRight: 0,
                }}
                transparent
                onPress={favoriteToggleHandle}>
                <Icon
                  style={{ fontSize: 22, color: '#2f3759' }}
                  type="FontAwesome"
                  name={favorite ? 'heart' : 'heart-o'}
                />
              </Button>
            </Left>
          </CardItem>
          <View style={styles.infoWrap}>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="MaterialIcons"
                      name="location-on"
                      style={styles.iconLocation}
                    />{' '}
                    Местоположение:
                  </Text>{' '}
                  {vacancy.countries[0].name + city + place}
                </Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="FontAwesome"
                      name="money"
                      style={styles.iconMoney}
                    />{' '}
                    Зарплата:
                  </Text>{' '}
                  {vacancy.salary}
                </Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="FontAwesome"
                      name="building-o"
                      style={styles.iconMoney}
                    />{' '}
                    Компания:
                  </Text>{' '}
                  {vacancy.user.company_name}
                  {vacancy.user.countries.length
                    ? `, ${vacancy.user.countries[0].code.toUpperCase()}`
                    : ''}
                </Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="FontAwesome5"
                      name="user-check"
                      style={styles.iconMoney}
                    />{' '}
                    Тип:
                  </Text>{' '}
                  {vacancy.user.company_type.name}
                  {vacancy.user.company_type_id === 2 &&
                    ` (${vacancy.user.countries[0].name})`}
                </Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="FontAwesome5"
                      name="user-tie"
                      style={styles.iconMoney}
                    />{' '}
                    Контактное лицо:
                  </Text>{' '}
                  {vacancy.contact_from_user
                    ? vacancy.user.name
                    : vacancy.contact || vacancy.user.name}
                </Text>
              </Left>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Left>
                <Text style={styles.left} numberOfLines={2}>
                  <Text>
                    <Icon
                      type="FontAwesome"
                      name="phone"
                      style={styles.iconMoney}
                    />{' '}
                    Телефон:
                  </Text>{' '}
                  {phoneNumber}
                </Text>
              </Left>
            </CardItem>
            {vacancy.user.company_url ? (
              <CardItem style={styles.cardItem}>
                <Left>
                  <Text style={styles.left}>
                    <Text>
                      <Icon
                        type="FontAwesome"
                        name="link"
                        style={styles.iconMoney}
                      />{' '}
                      Сайт:
                    </Text>{' '}
                  </Text>
                  <Button
                    style={{ paddingLeft: 0, marginLeft: 0, height: 0 }}
                    text
                    transparent
                    onPress={() => Linking.openURL(vacancy.user.company_url)}>
                    <Text
                      numberOfLines={1}
                      style={{
                        paddingLeft: 0,
                        marginLeft: 0,
                        fontSize: 16,
                        width: '90%',
                      }}
                      uppercase={false}>
                      {vacancy.user.company_url}
                    </Text>
                  </Button>
                </Left>
              </CardItem>
            ) : null}
          </View>
          <CardItem style={styles.cardItem}>
            <Left>
              <H2>Описание вакансии</H2>
            </Left>
          </CardItem>
          <CardItem style={{ flexDirection: 'column' }}>
            <HTML
              renderers={{
                p: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    {children}
                  </Text>
                ),
                h2: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    {children}
                  </Text>
                ),
                h3: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    {children}
                  </Text>
                ),
                div: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    {children}
                  </Text>
                ),
                span: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}>
                    {children}
                  </Text>
                ),
                strong: (htmlAttribs, children) => (
                  <Text
                    key={uid()}
                    style={{
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                      fontWeight: 'bold',
                    }}>
                    {children}
                  </Text>
                ),
                // ul: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                //   return (
                //     <Text style={{ color: 'blue', fontSize: 16 }}>{children}</Text>
                //   );
                // }
              }}
              baseFontStyle={{ fontSize: 18 }}
              ignoredTags={['br', 'a']}
              html={vacancy.description}
              imagesMaxWidth={Dimensions.get('window').width}
            />
          </CardItem>

          {youtube ? (
            <CardItem style={styles.cardItem}>
              <Left>
                <YoutubePlayer
                  height={190}
                  width={Dimensions.get('window').width - 60}
                  videoId={youtube}
                />
              </Left>
            </CardItem>
          ) : null}
          <CardItem>
            <Left style={{ flex: 0 }}>
              <Text style={styles.left}>{vacancy.views}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              <Text style={styles.left}>
                <Text>
                  <Icon
                    type="FontAwesome"
                    name="calendar"
                    style={styles.iconMoney}
                  />{' '}
                  Опубликовано:
                </Text>{' '}
                {formatDateFromSql(vacancy.updated_at)}
              </Text>
            </Right>
          </CardItem>
        </Card>
        <View
          style={{
            backgroundColor: '#f1f4f7',
            borderRadius: 0,
            marginLeft: 2,
            marginRight: 2,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 5,
            paddingBottom: 5,
            alignItems: 'flex-start',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
              iconLeft
              transparent
              style={{ justifyContent: 'center' }}
              onPress={() => {
                dispatch(openModal({ type: 'complaint' }));
              }}>
              <Icon
                type="FontAwesome"
                name="flag"
                style={{
                  color: '#2f3759',
                  marginRight: 0,
                  marginLeft: 0,
                  fontSize: 22,
                }}
              />
              <Text uppercase={false}>Пожаловаться на вакансию</Text>
            </Button>
          </View>
        </View>
      </Content>
      <Footer style={styles.footer}>
        <Button
          style={{
            width: 45,
            justifyContent: 'center',
            backgroundColor: '#7c549c',
          }}
          onPress={() => Linking.openURL(`viber://chat?number=${stickyViber}`)}>
          <Icon style={styles.iconFooter} type="FontAwesome5" name="viber" />
        </Button>
        <Button
          style={{ flex: 1, marginLeft: 12, marginRight: 12 }}
          yellow
          onPress={() => {
            dispatch(openModal({ type: 'sendResume' }));
          }}>
          <Text uppercase={false} style={styles.buttonText}>
            Откликнуться
          </Text>
        </Button>
        <Button
          style={{
            width: 45,
            justifyContent: 'center',
            backgroundColor: '#34592f',
          }}
          onPress={() => Linking.openURL(`tel:${stickyPhone}`)}>
          <Icon style={styles.iconFooter} type="FontAwesome" name="phone" />
        </Button>
      </Footer>
    </Container>
  );
}

// Styles
const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 10,
    height: 60,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  infoWrap: {
    backgroundColor: '#ecf1f7',
    margin: 10,
    borderRadius: 2,
    paddingVertical: 5,
  },
  cardItem: {
    backgroundColor: 'transparent',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  left: {
    marginLeft: 0,
  },
  iconLocation: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#2f7bb3',
  },
  iconMoney: {
    alignSelf: 'center',
    fontSize: 19,
    color: '#2f7bb3',
  },
  iconFooter: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: 20,
  },
});

export default Vacancy;
