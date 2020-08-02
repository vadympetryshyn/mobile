import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Left,
  Body,
  Title,
  Header,
  Textarea,
  Footer,
  Toast,
  Root,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../actions';
import {
  sendFormRequest,
  sendFormSuccess,
  sendFormFailure,
} from '../../HomePage/actions';
import { validateMessage } from '../../../utils/translate';
import { selectSendForm, selectVacancy } from '../../HomePage/selectors';
import { selectUser } from '../../App/selectors';

const SendResume = ({}) => {
  const dispatch = useDispatch();
  const sendResumeForm = useSelector(selectSendForm);
  const vacancy = useSelector(selectVacancy);
  const user = useSelector(selectUser);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    text: '',
    file: null,
  });

  useEffect(() => {
    if (sendResumeForm.success) {
      Toast.show({
        text: 'Форма успешно отправлена',
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

  const onPickFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setForm({
        ...form,
        file,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const onSend = () => {
    const { name, email, phone, text, file } = form;
    // eslint-disable-next-line no-undef
    const data = new FormData();
    const uri = 'https://amountwork.com';
    if (file && file && !user?.published_resumes_count) {
      data.append('file', file);
      data.append('file_link', 'email');
    }

    if (user?.published_resumes_count) {
      data.append(
        'resume_link',
        `${uri}/r/${user.publishedResum.id}/${user.publishedResum.slug}`,
      );
      data.append('resume_name', `${user.publishedResum.name}`);
    }

    data.append('name', name);
    data.append('email', email);

    data.append('phone', phone);
    data.append('text', text);
    data.append('title', vacancy.name);

    data.append('link', `${uri}/v/${vacancy.id}/${vacancy.slug}`);
    // data.append('vacancy_id', vacancy.id);
    // data.append('email_to', vacancy.user.email);
    data.append('vacancy_id', '10641');
    data.append('email_to', 'vadympetryshyn@gmail.com');
    data.append('domain', uri);
    dispatch(sendFormRequest(data));
  };

  const { name, text, phone, email, file } = sendResumeForm.errors;

  return (
    <Root>
      <Header>
        <Left style={styles.closeButton}>
          <Button transparent onPress={onClose}>
            <Icon type="MaterialIcons" name="close" />
          </Button>
        </Left>
        <Body>
          <Title>Отклик на вакансию</Title>
        </Body>
      </Header>
      <Container>
        <Content>
          <Form>
            <Item error={!!name} last>
              <Input
                value={form.name}
                placeholder="Имя"
                onChangeText={onChangeForm('name')}
              />
            </Item>
            {name && (
              <View style={styles.error}>
                <Text style={styles.errorText}>{validateMessage(name[0])}</Text>
              </View>
            )}
            <Item last error={!!email}>
              <Input
                value={form.email}
                placeholder="E-mail"
                onChangeText={onChangeForm('email')}
              />
            </Item>
            {email && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {validateMessage(email[0])}
                </Text>
              </View>
            )}
            <Item last error={!!phone}>
              <Input
                value={form.phone}
                placeholder="Телефон"
                onChangeText={onChangeForm('phone')}
              />
            </Item>
            {phone && (
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {validateMessage(phone[0])}
                </Text>
              </View>
            )}
            <Item last error={!!text}>
              <Textarea
                style={{
                  fontSize: 17,
                  color: 'rgb(87, 87, 87)',
                  width: '100%',
                  paddingLeft: 5,
                  paddingTop: 10,
                }}
                rowSpan={5}
                placeholder="Текст сообщения"
                value={form.text}
                onChangeText={onChangeForm('text')}
              />
            </Item>
            {text && (
              <View style={styles.error}>
                <Text style={styles.errorText}>{validateMessage(text[0])}</Text>
              </View>
            )}
          </Form>
          <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
            {!form.file ? (
              <Button full bordered transparent onPress={onPickFile}>
                <Icon
                  style={{ marginLeft: 0, marginRight: 0 }}
                  type="FontAwesome"
                  name="paperclip"
                />
                <Text>Добавьте файл резюме</Text>
              </Button>
            ) : (
              <Text>{form.file.name}</Text>
            )}
            <Text style={{ paddingTop: 10 }}>
              Макс. 2.00MB. Формат: pdf, rtf, doc, txt
            </Text>
            {file && (
              <Text style={{ paddingTop: 10, color: 'rgb(237, 47, 47)' }}>
                {validateMessage(file[0])}
              </Text>
            )}
          </View>
        </Content>
        <Footer style={styles.footer}>
          <Button full yellow onPress={onSend}>
            <Text uppercase={false} style={styles.buttonText}>
              Отправить
            </Text>
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

export default SendResume;
