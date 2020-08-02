import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  ListItem,
  Icon,
  Right,
  Left,
  Body,
  Title,
  Header,
  Textarea,
  Footer,
  Toast,
  Root,
  Radio,
} from 'native-base';
import { closeModal } from '../actions';
import {
  complaintRequest,
  sendFormSuccess,
  sendFormFailure,
} from '../../HomePage/actions';
import { validateMessage } from '../../../utils/translate';
import { useDispatch, useSelector } from 'react-redux';
import { selectVacancy, selectSendForm } from '../../HomePage/selectors';

const Complaint = ({}) => {
  const dispatch = useDispatch();
  const vacancy = useSelector(selectVacancy);
  const sendResumeForm = useSelector(selectSendForm);
  const [form, setForm] = useState({ complaint: 1, message: '' });

  useEffect(() => {
    if (sendResumeForm.success) {
      Toast.show({
        text: 'Жалоба успешно отправлена',
        buttonText: 'Ok',
        type: 'success',
        duration: 2000,
      });
      dispatch(sendFormSuccess(false));
      setTimeout(() => {
        dispatch(closeModal());
      }, 2000);
    }
  }, [sendResumeForm.success]);

  useEffect(() => {
    return () => {
      dispatch(sendFormFailure({}));
    };
  }, []);

  const onClose = () => {
    dispatch(closeModal());
  };
  const onChangeForm = (name) => (val) => {
    setForm({
      ...form,
      [name]: val,
    });
  };

  const onSend = () => {
    dispatch(
      complaintRequest({
        complaint_type_id: form.complaint,
        complaint_vacancy_id: vacancy.id,
        message: form.message,
        domain: 'eu',
      }),
    );
  };

  const { message } = sendResumeForm.errors;

  return (
    <Root>
      <Header>
        <Left style={styles.closeButton}>
          <Button transparent onPress={onClose}>
            <Icon type="MaterialIcons" name="close" />
          </Button>
        </Left>
        <Body>
          <Title>Пожаловаться на вакансию</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <ListItem onPress={() => onChangeForm('complaint')(1)}>
            <Left>
              <Text>Описание вакансии не отвечает действительности.</Text>
            </Left>
            <Right>
              <Radio selected={form.complaint === 1} />
            </Right>
          </ListItem>
          <ListItem onPress={() => onChangeForm('complaint')(2)}>
            <Left>
              <Text>Вакансия устарела, и более неактуальна.</Text>
            </Left>
            <Right>
              <Radio selected={form.complaint === 2} />
            </Right>
          </ListItem>
          <ListItem onPress={() => onChangeForm('complaint')(3)}>
            <Left>
              <Text>
                Вакансия принадлежит не мне, но используются мои контактные
                данные.
              </Text>
            </Left>
            <Right>
              <Radio selected={form.complaint === 3} />
            </Right>
          </ListItem>
          <ListItem onPress={() => onChangeForm('complaint')(4)}>
            <Left>
              <Text>
                Мошенник: вы столкнулись с недобросовестным автором объявления.
              </Text>
            </Left>
            <Right>
              <Radio selected={form.complaint === 4} />
            </Right>
          </ListItem>
          <ListItem onPress={() => onChangeForm('complaint')(5)}>
            <Left>
              <Text>Агентство выдает себя за прямого работодателя.</Text>
            </Left>
            <Right>
              <Radio selected={form.complaint === 5} />
            </Right>
          </ListItem>
          <ListItem last error={!!message}>
            <Textarea
              style={{
                fontSize: 17,
                color: 'rgb(87, 87, 87)',
                width: '100%',
                paddingLeft: 5,
                paddingTop: 10,
              }}
              rowSpan={5}
              placeholder="Текст жалобы"
              value={form.message}
              onChangeText={onChangeForm('message')}
            />
          </ListItem>
          {message && (
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {validateMessage(message[0])}
              </Text>
            </View>
          )}
        </Content>
        <Footer style={styles.footer}>
          <Button full yellow onPress={onSend}>
            <Text uppercase={false}>Отправить</Text>
          </Button>
        </Footer>
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
  error: {
    paddingLeft: 15,
  },
  errorText: {
    color: 'rgb(237, 47, 47)',
  },
});

export default Complaint;
