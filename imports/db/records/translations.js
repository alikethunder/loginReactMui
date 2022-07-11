import { TranslationsCollection } from '/imports/db/collections/translations';

TranslationsCollection.upsert({
  _id: 'home'
},
  {
    en: 'home',
    ru: 'главная'
  });

TranslationsCollection.upsert({
  _id: 'dashboard'
},
  {
    en: 'dashboard',
  });

TranslationsCollection.upsert({
  _id: 'login'
},
  {
    en: 'sign in',
    ru: 'войти'
  });

TranslationsCollection.upsert({
  _id: 'logout'
},
  {
    en: 'logout',
    ru: 'выйти'
  });

TranslationsCollection.upsert({
  _id: 'signup'
},
  {
    en: 'sign up',
    ru: 'регистрация'
  });

TranslationsCollection.upsert({
  _id: 'forgot_password'
},
  {
    en: 'Password recovery',
    ru: 'восстановить пароль'
  });

TranslationsCollection.upsert({
  _id: 'remember_me'
},
  {
    en: 'remember me',
    ru: 'запомнить меня'
  });

TranslationsCollection.upsert({
  _id: 'password'
},
  {
    en: 'password',
    ru: 'пароль'
  });

TranslationsCollection.upsert({
  _id: 'email_address'
},
  {
    en: 'email address',
    ru: 'Адрес электронной почты'
  });

TranslationsCollection.upsert({
  _id: "toggle_password_visibility"
},
  {
    en: "toggle password visibility",
    ru: 'переключить видимость пароля'
  });

TranslationsCollection.upsert({
  _id: "incorrect_email"
},
  {
    en: "Incorrect email",
    ru: 'Неправильный электронный адрес'
  });

TranslationsCollection.upsert({
  _id: "password_required"
},
  {
    en: "Password required",
    ru: "Пароль обязателен"
  });

TranslationsCollection.upsert({
  _id: "fill_all_fields_properly"
},
  {
    en: "Fill all fields properly, please",
    ru: "Заполните правильно все поля, пожалуйста"
  });

TranslationsCollection.upsert({
  _id: "signed_in"
},
  {
    en: "Signed in",
    ru: "Успешный вход"
  });

TranslationsCollection.upsert({
  _id: "signed_up"
},
  {
    en: "Signed up",
    ru: "Регистрация прошла успешно"
  });

TranslationsCollection.upsert({
  _id: "confirm_password"
},
  {
    en: "confirm password",
    ru: "подтверждение пароля"
  });