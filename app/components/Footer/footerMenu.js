import React from 'react';
import { StyleSheet } from 'react-native';
import { FooterTab, Text, Footer, Button, Icon } from 'native-base';

function footerMenu({ routeName, navigation, user }) {
  return (
    <Footer shadow>
      <FooterTab>
        <Button vertical onPress={() => navigation.navigate('Home')}>
          <Icon
            style={routeName === 'Home' ? styles.activeIcon : styles.icon}
            type="SimpleLineIcons"
            name="magnifier"
          />
          <Text
            uppercase={false}
            style={routeName === 'Home' ? styles.activeText : styles.text}>
            Вакансии
          </Text>
        </Button>
        {!user?.id ? (
          <Button vertical onPress={() => navigation.navigate('Login')}>
            <Icon style={styles.icon} type="SimpleLineIcons" name="login" />
            <Text uppercase={false} style={styles.text}>
              Вход
            </Text>
          </Button>
        ) : (
          <Button vertical onPress={() => navigation.navigate('Profile')}>
            <Icon style={styles.icon} type="SimpleLineIcons" name="user" />
            <Text uppercase={false} style={styles.text} numberOfLines={1}>
              {user.name.replace(/\s\W+/, '')}
            </Text>
          </Button>
        )}
        <Button vertical onPress={() => navigation.navigate('CreateResume')}>
          <Icon style={styles.icon} type="SimpleLineIcons" name="plus" />
          <Text uppercase={false} style={styles.text}>
            Резюме
          </Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}

// Styles
const styles = StyleSheet.create({
  icon: {
    fontSize: 18,
    marginBottom: 5,
    color: '#b3b3b3',
  },
  activeIcon: {
    fontSize: 18,
    marginBottom: 5,
    color: 'rgb(47, 55, 89)',
    fontWeight: 'bold',
  },
  activeText: {
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: 'bold',
    color: 'rgb(47, 55, 89)',
    fontSize: 14,
  },
  text: {
    paddingLeft: 0,
    paddingRight: 0,
    color: '#b3b3b3',
    fontSize: 14,
    maxWidth: 80,
  },
});

export default footerMenu;
