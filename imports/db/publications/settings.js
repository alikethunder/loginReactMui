import { Meteor } from 'meteor/meteor';
import { SettingsCollection } from '/imports/db/settings';

// publish what languages there are in the app
Meteor.publish('languageSettings', function () {
  return SettingsCollection.find({ _id: 'languages' });
});