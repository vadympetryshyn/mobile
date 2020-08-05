import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Input,
  Item,
  Form,
  Root,
  Content,
  Label,
  Button,
  Text,
  Icon,
} from 'native-base';
import { openModal } from '../../containers/Modals/actions';
import { useDispatch } from 'react-redux';

function ResumeForm({ navigation, resume = {} }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    ...resume,
    name: '',
    selectedCategories: { name: '', slug: '' },
    selectedCountries: { name: '', id: '' },
    selectedCitizenCountries: { name: '', id: '' },
    employment_type_id: { name: 'Полная', id: 1 },
    city: '',
    age: '',
    salary: '',
    documents: '',
  });
  const handleTextChange = (name) => (val) => {
    setForm({
      ...form,
      [name]: val,
    });
  };

  const handleSetCategory = (obj) => {
    setForm({
      ...form,
      ...obj,
    });
  };

  const handleSetCountry = (obj) => {
    setForm({
      ...form,
      selectedCountries: {
        ...form.selectedCountries,
        ...obj,
      },
    });
  };

  const handleSetCitizenCountry = (obj) => {
    setForm({
      ...form,
      selectedCitizenCountries: {
        ...form.selectedCitizenCountries,
        ...obj,
      },
    });
  };

  const handleSetEmploymentType = (obj) => {
    setForm({
      ...form,
      employment_type_id: {
        ...form.employment_type_id,
        ...obj,
      },
    });
  };

  const onPickFile = () => {};

  return (
    <Root>
      <Content>
        <Form>
          <Item style={styles.item}>
            <Label style={styles.label}>
              Должность, на которой вы хотите работать:
            </Label>
            <Input
              value={form.name}
              style={styles.input}
              placeholder='Например: "Сантехник Берлин"'
              onChangeText={handleTextChange('name')}
            />
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Специальность, отрасль:</Label>
            <Button
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
              transparent
              full
              onPress={() => {
                dispatch(
                  openModal({
                    type: 'category',
                    callback: handleSetCategory,
                    params: {
                      filters: { selectedCategories: form.selectedCategories },
                    },
                  }),
                );
              }}>
              <Text uppercase={false}>
                {form.selectedCategories.name ||
                  'Одна или несколько специальностей'}
                {form.selectedCategories.slug?.length > 1 ? ' ...' : ''}
              </Text>
            </Button>
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>В какой стране ищите работу:</Label>
            <Button
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
              transparent
              full
              onPress={() => {
                dispatch(
                  openModal({
                    type: 'country',
                    callback: handleSetCountry,
                    params: {
                      filters: { selectedCountries: form.selectedCountries },
                      filteredCountries: true,
                      useAsSelector: true,
                    },
                  }),
                );
              }}>
              <Text uppercase={false}>
                {form.selectedCountries.name || 'Выберите страну'}
              </Text>
            </Button>
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>
              Уточнение населенного пункта/города (если это нужно):
            </Label>
            <Input
              value={form.city}
              style={styles.input}
              placeholder='пример: пригород Берлина"'
              onChangeText={handleTextChange('city')}
            />
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Тип занятости:</Label>
            <Button
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
              transparent
              full
              onPress={() => {
                dispatch(
                  openModal({
                    type: 'employmentType',
                    callback: handleSetEmploymentType,
                    params: {
                      filters: { employment_type_id: form.employment_type_id },
                    },
                  }),
                );
              }}>
              <Text uppercase={false}>{form.employment_type_id.name}</Text>
            </Button>
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Возраст:</Label>
            <Input
              value={form.age}
              style={styles.input}
              placeholder="пример: 30"
              onChangeText={handleTextChange('age')}
            />
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Я гражданин (паспорт, внж):</Label>
            <Button
              style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
              transparent
              full
              onPress={() => {
                dispatch(
                  openModal({
                    type: 'country',
                    callback: handleSetCitizenCountry,
                    params: {
                      filters: {
                        selectedCountries: form.selectedCitizenCountries,
                      },
                      useAsSelector: true,
                    },
                  }),
                );
              }}>
              <Text uppercase={false}>
                {form.selectedCitizenCountries.name || 'Выберите страну'}
              </Text>
            </Button>
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>
              Ожидаемая зарплата (указывайте валюту):
            </Label>
            <Input
              value={form.salary}
              style={styles.input}
              placeholder="пример: 5 евро в час, от 1000$ в месяц"
              onChangeText={handleTextChange('salary')}
            />
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Документы в наличии:</Label>
            <Input
              value={form.documents}
              style={styles.input}
              placeholder="пример: польская виза действительна до 01.01.2025 г., ID карта ..."
              onChangeText={handleTextChange('documents')}
            />
          </Item>
          <Item style={styles.item}>
            <Label style={styles.label}>Ваше фото (на фото должны быть только Вы):</Label>
            {!form.file ? (
              <Button full bordered transparent onPress={onPickFile}>
                <Icon
                  style={{ marginLeft: 0, marginRight: 0 }}
                  type="FontAwesome"
                  name="paperclip"
                />
                <Text>Выбрать файл</Text>
              </Button>
            ) : (
              <Text>{form.file.name}</Text>
            )}
          </Item>
        </Form>
      </Content>
    </Root>
  );
}

// Styles
const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    paddingLeft: 5,
  },
  input: {},
});

export default ResumeForm;
