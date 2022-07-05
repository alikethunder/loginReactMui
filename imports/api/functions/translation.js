import { TranslationsCollection } from '/imports/db/translations';

import { Session } from 'meteor/session';

function translation (translatableKey, language) {
    let l = Meteor._localStorage.getItem('language');
    
    let lang = language || l;
    //return TranslationsCollection.find

    return 
}