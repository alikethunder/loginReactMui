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