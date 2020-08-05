import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Root } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import FooterMenu from '../../../components/Footer/footerMenu';
import HeaderBack from '../../../components/Header/headerBack';
import MyResumesList from '../../../components/Resumes/myResumesList';
import { getMyResumesRequest } from '../actions';
import { selectUser } from '../../App/selectors';
import { selectResumes } from '../selectors';

function MyResumes({ navigation, route }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const resumes = useSelector(selectResumes);

  useEffect(() => {
    dispatch(getMyResumesRequest());
  }, []);

  return (
    <Root>
      <Container>
        <HeaderBack navigation={navigation} title="Мои резюме" />
        <Content>
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

const styles = StyleSheet.create({});

export default MyResumes;
