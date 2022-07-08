import { SettingsCollection } from '/imports/db/collections/settings';

SettingsCollection.upsert({
    _id: 'languages'
  },
    {
      languages: [{ abbr: 'en', name: 'English' }, { abbr: 'ru', name: 'Русский' }]
    });