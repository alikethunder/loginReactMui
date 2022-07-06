import { Meteor } from 'meteor/meteor';
import { TranslationsCollection } from '/imports/db/translations';

// publish phrase for language and for english for backup
Meteor.publish('translation', function (phrase, language) {

  return TranslationsCollection.find({ _id: phrase }, {fields: {[language]: 1, 'en': 1}})
});