import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Body, Card, CardItem, Icon, H3, Left, Right, Thumbnail, Button, ActionSheet, Root } from 'native-base';
// import i18n from 'i18n-js';
import { formatDateFromSql } from '../../utils/date';

function myResumesList({ resumes, navigation }) {
  const paid = elem => {
    return (
      elem.isAdsActive && (
        <View style={styles.hotIcon}>
          <Text style={styles.hotText}>VIP</Text>
        </View>
      )
    );
  };

  const moreHandler = (id) => () => {
    ActionSheet.show(
      {
        options: ['Редактировать', 'Опубликовать', 'Удалить'],

      },
      index => {
        if (index === 0) {

        }
        if (index === 1) {

        }
        if (index === 2) {

        }
      }
    )

  }

  return (
    <Root>
      {resumes?.length
        ? resumes.map(resume => {
            const city =
              resume.cities_ua && resume.cities_ua.length ? `, ${resume.cities_ua[0].name}` : '';
            const place = resume.city ? ` (${resume.city})` : '';
            return (
              <Card shadow key={resume.id}>
                <CardItem>
                  <Left style={{ flex: 1.5 }}>
                    <Icon type="FontAwesome5" name="eye" style={styles.infoIcon} /><Text style={styles.infoText}>Просмотров: <Text style={styles.infoTextBold}>{resume.views}</Text></Text>
                  </Left>
                  <Left style={{ flex: 1.3 }}>
                    <Icon type="FontAwesome5" name="envelope" style={styles.infoIcon} /><Text style={styles.infoText}>Откликов: <Text style={styles.infoTextBold}>{resume.proposals_count}</Text></Text>
                  </Left>
                  <Left>
                    <Icon type="FontAwesome5" name="calendar-alt" style={styles.infoText} />
                    <Text style={styles.infoTextBold}>{formatDateFromSql(resume.updated_at)}</Text>
                  </Left>
                </CardItem>
                <CardItem
                  button
                  onPress={() =>
                    navigation.navigate('Vacancy', { id: resume.id, slug: resume.slug })
                  }
                  style={{ paddingBottom: 5 }}>
                  <Left style={styles.bottomLeft}>
                    <H3 numberOfLines={3} style={styles.title}>
                      {resume.name}
                    </H3>
                  </Left>
                  {resume.user.company_logo ? (
                    <Right style={styles.bottomRight}>
                      <Thumbnail
                        square
                        logo
                        source={{ uri: resume.user.company_logo }}
                        resizeMode="contain"
                      />
                    </Right>
                  ) : null}
                </CardItem>
                <CardItem style={{ paddingBottom: 5, paddingTop: 5 }}>
                  <Body style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text numberOfLines={1} style={{ maxWidth: '75%', textAlign: 'left' }}>
                      {resume.user.name}
                    </Text>
                    {paid(resume)}
                  </Body>
                </CardItem>
                {resume.salary ? (
                  <CardItem style={{ paddingBottom: 5, paddingTop: 5 }}>
                    <Body>
                      <Text numberOfLines={1} style={styles.salary}>
                        {resume.salary}
                      </Text>
                    </Body>
                  </CardItem>
                ) : null}
                <CardItem style={{ paddingTop: 5 }}>
                  <Left style={styles.bottomLeft}>
                    <Icon type="MaterialIcons" name="location-on" style={styles.pin} />
                    <Text numberOfLines={1} style={styles.location}>
                      {resume.countries[0].name + city + place}
                    </Text>
                  </Left>
                  <Right>
                    <Button transparent onPress={moreHandler(resume.id)}>
                      <Text uppercase={false}>Еще <Icon type="FontAwesome5" name="chevron-down" style={{ fontSize: 14}} /></Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            );
          })
        : null}
    </Root>
  );
}

// Styles
const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 50,
    minWidth: 100
  },
  titleWrap: { flexBasis: '100%', overflow: 'hidden' },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#2e3359'
  },
  location: {
    marginLeft: 5
  },
  bottomLeft: {
    paddingRight: 10
  },
  bottomRight: {
    flex: undefined
  },
  pin: {
    color: '#2f7bb3',
    fontSize: 20
  },
  description: { flex: 1, flexWrap: 'wrap', color: '#6b7886', fontSize: 16 },
  salary: {
    color: '#1c4d7d',
    backgroundColor: '#ecf1f7',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 8
  },
  hotIcon: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#ffb900',
    borderRadius: 12,
    marginLeft: 6
  },
  hotText: {
    color: '#fff',
    fontSize: 14
  },
  bold: {
    fontWeight: 'bold'
  },
  infoIcon: {
    fontSize: 13,
    color: '#b3b3b3',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flexDirection: 'row',
    marginLeft: 5
  },
  infoTextBold: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold'
  }
});

export default myResumesList;
