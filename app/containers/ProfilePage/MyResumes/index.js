import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Text,
  Content,
  Button,
  ListItem,
  Root,
  Card,
} from 'native-base';

import FooterMenu from '../../../components/Footer/footerMenu';
import HeaderBack from '../../../components/Header/headerBack';
import MyResumesList from '../../../components/Resumes/myResumesList';
import { getMyResumesRequest } from '../actions';

function Index({ navigation, user, route, getMyResumes, resumes }) {
  useEffect(() => {
    getMyResumes();
  }, []);
  console.log(resumes);

  return (
    <Root>
      <Container>
        <HeaderBack navigation={navigation} title="Мои резюме" />
        <Content style={{ backgroundColor: '#000' }}>
          <MyResumesList navigation={navigation} resumes={resumes} />
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

const mapStateToProps = (state) => {
  return {
    resumes: state.profile.resumes,
    user: state.auth.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getMyResumes: getMyResumesRequest,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
