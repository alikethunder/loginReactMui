import { Meteor } from 'meteor/meteor';

//Methods
import '/imports/api/methods/email';

//collections
import { PostsCollection } from '/imports/db/posts';
import { TranslationsCollection } from '/imports/db/translations';
import { SettingsCollection } from '/imports/db/settings';


//publications
import '/imports/db/publications/posts';
import '/imports/db/publications/translations';
import '/imports/db/publications/settings';

function insertText(text) {
  PostsCollection.insert({ text });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (PostsCollection.find().count() === 0) {
    insertText(`# Sample blog post

      _April 1, 2020 by [Olivier](/)_
      
      This blog post shows a few different types of content that are supported and styled with
      Material styles. Basic typography, images, and code are all supported.
      You can extend these by modifying Markdown.js.
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
      Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
      
      Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
      Nullam id dolor id nibh ultricies vehicula ut id elit.
      
      Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
      Aenean lacinia bibendum nulla sed consectetur.
      
      ## Heading
      
      Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
      Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      
      ### Sub-heading 1
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      
      ### Sub-heading 2
      
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
      Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
      sit amet risus.
      
      - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
      - Donec id elit non mi porta gravida at eget metus.
      - Nulla vitae elit libero, a pharetra augue.
      
      Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
      
      1. Vestibulum id ligula porta felis euismod semper.
      1. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      1. Maecenas sed diam eget risus varius blandit sit amet non magna.
      
      Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.`,
    );

    insertText(`# Another blog post

    _March 23, 2020 by [Matt](/)_
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
    Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
    
    Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
    Nullam id dolor id nibh ultricies vehicula ut id elit.
    
    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
    Aenean lacinia bibendum nulla sed consectetur.
    
    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.`,
    );


    insertText(`# New feature

    _March 14, 2020 by [Tom](/)_
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
    ut fermentum massa justo sit amet risus.
    
    - Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
    - Donec id elit non mi porta gravida at eget metus.
    - Nulla vitae elit libero, a pharetra augue.
    
    Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
    Aenean lacinia bibendum nulla sed consectetur.
    
    Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.`,
    );
  }

  SettingsCollection.upsert({
    _id: 'languages'
  },
    {
      languages: [{ abbr: 'en', name: 'English' }, { abbr: 'ru', name: 'Русский' }]
    });

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
});
