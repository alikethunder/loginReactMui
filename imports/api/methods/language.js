import { Meteor } from 'meteor/meteor';

import { SettingsCollection } from '/imports/db/collections/settings';

Meteor.methods({
    'language.checkExistence'(language){
        return SettingsCollection.findOne({ _id: 'languages' }).languages.find(l=> l.abbr == language)
    },
});