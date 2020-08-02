import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Body,
  Card,
  CardItem,
  Icon,
  H3,
  Left,
  Right,
  Thumbnail,
} from 'native-base';
import { formatDateFromSql } from '../../utils/date';

function vacancyList({ vacancies, navigation }) {
  const paid = (elem) => {
    return (
      elem.isAdsActive &&
      elem.ads_type_id &&
      elem.ads_type_id !== 1 &&
      elem.ads_type_id !== 2 && (
        <View style={styles.hotIcon}>
          <Text style={styles.hotText}>Горячая</Text>
        </View>
      )
    );
  };

  return (
    <>
      {vacancies?.length
        ? vacancies.map((vacancy) => {
            const city =
              vacancy.cities_ua && vacancy.cities_ua.length
                ? `, ${vacancy.cities_ua[0].name}`
                : '';
            const place = vacancy.city ? ` (${vacancy.city})` : '';
            return (
              <Card shadow key={vacancy.id}>
                <CardItem
                  button
                  onPress={() =>
                    navigation.navigate('Vacancy', {
                      id: vacancy.id,
                      slug: vacancy.slug,
                    })
                  }
                  style={{ paddingBottom: 5 }}>
                  <Left style={styles.bottomLeft}>
                    <H3 numberOfLines={3} style={styles.title}>
                      {vacancy.name}
                    </H3>
                  </Left>
                  {vacancy.user.company_logo ? (
                    <Right style={styles.bottomRight}>
                      <Thumbnail
                        square
                        logo
                        source={{ uri: vacancy.user.company_logo }}
                        resizeMode="contain"
                      />
                    </Right>
                  ) : null}
                </CardItem>
                <CardItem style={{ paddingBottom: 5, paddingTop: 5 }}>
                  <Body style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text
                      numberOfLines={1}
                      style={{ maxWidth: '75%', textAlign: 'left' }}>
                      {vacancy.user.company_name}
                      {vacancy.user.countries.length
                        ? `, ${vacancy.user.countries[0].code.toUpperCase()}`
                        : ''}
                    </Text>
                    {paid(vacancy)}
                  </Body>
                </CardItem>
                {vacancy.salary ? (
                  <CardItem style={{ paddingBottom: 5, paddingTop: 5 }}>
                    <Body>
                      <Text numberOfLines={1} style={styles.salary}>
                        {vacancy.salary}
                      </Text>
                    </Body>
                  </CardItem>
                ) : null}
                {/* <CardItem>
                    <Body>
                      <Text style={styles.description}>{vacancy.shortDescription}</Text>
                    </Body>
                  </CardItem> */}
                <CardItem style={{ paddingTop: 5 }}>
                  <Left style={styles.bottomLeft}>
                    <Icon
                      type="MaterialIcons"
                      name="location-on"
                      style={styles.pin}
                    />
                    <Text numberOfLines={1} style={styles.location}>
                      {vacancy.countries[0].name + city + place}
                    </Text>
                  </Left>
                  <Right style={styles.bottomRight}>
                    <Text>{formatDateFromSql(vacancy.updated_at)}</Text>
                  </Right>
                </CardItem>
              </Card>
            );
          })
        : null}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 50,
    minWidth: 100,
  },
  titleWrap: { flexBasis: '100%', overflow: 'hidden' },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2e3359',
  },
  location: {
    marginLeft: 5,
  },
  bottomLeft: {
    paddingRight: 10,
  },
  bottomRight: {
    flex: undefined,
  },
  pin: {
    color: '#2f7bb3',
    fontSize: 20,
  },
  description: { flex: 1, flexWrap: 'wrap', color: '#6b7886', fontSize: 16 },
  salary: {
    color: '#1c4d7d',
    backgroundColor: '#ecf1f7',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  hotIcon: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#ffb900',
    borderRadius: 12,
    marginLeft: 6,
  },
  hotText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default vacancyList;
