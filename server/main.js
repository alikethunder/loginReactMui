import { Meteor } from 'meteor/meteor';

//Methods
import '/imports/api/methods/email';
import '/imports/api/methods/language';

//collections
import { PostsCollection } from '/imports/db/collections/posts';
import { TranslationsCollection } from '/imports/db/collections/translations';
import { SettingsCollection } from '/imports/db/collections/settings';


//publications
import '/imports/db/publications/posts';
import '/imports/db/publications/translations';
import '/imports/db/publications/settings';

//records
import '/imports/db/records/posts';
import '/imports/db/records/translations';
import '/imports/db/records/settings';