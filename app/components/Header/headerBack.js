// Imports: Dependencies
import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Header, Icon, Left, Title } from 'native-base';

function HeaderBack({ navigation, title, callback }) {
  const onClose = () => {
    if (callback) {
      callback();
    }
    navigation.goBack();
  };
  return (
    <Header>
      <Left style={styles.closeButton}>
        <Button transparent onPress={onClose}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
  );
}

// Styles
const styles = StyleSheet.create({
  closeButton: {
    flex: 0.15,
  },
});

export default HeaderBack;
