import React, { useEffect } from 'react';
import { StyleSheet, View, Linking, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
  Root,
} from 'native-base';
import { openModal } from '../Modals/actions';
import HeaderBack from '../../components/Header/headerBack';
import ResumeForm from '../../components/ResumeForm';

function CreateResume({ navigation, route }) {
  const dispatch = useDispatch();

  return (
    <Root>
      <Container>
        <HeaderBack navigation={navigation} title="Создать резюме" />
        <ResumeForm />
      </Container>
    </Root>
  );
}

// Styles
const styles = StyleSheet.create({});

export default CreateResume;
