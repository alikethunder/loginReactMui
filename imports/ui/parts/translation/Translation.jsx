import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import { useTracker } from 'meteor/react-meteor-data';
import { TranslationsCollection } from '/imports/db/collections/translations';

/// {phrase, capitalize} phrase - key in translations object for translation, capitalize - capitalize first letter
export default function Translation({ phrase, size, capitalize }) {

    const { ready, translation } = useTracker(() => {

        let searchParamsLang = Session.get('language');
        let subscription = Meteor.subscribe('translation', phrase, searchParamsLang);

        let translations = TranslationsCollection.findOne({ _id: phrase });
        // if there is no translation in searchParamsLang then return english version
        return { ready: subscription.ready(), translation: (translations && (translations[searchParamsLang] || translations.en)) }
    });

    return (
        !ready ?
            [
                (translation && capitalize ? `${translation[0].toUpperCase()}${translation.slice(1)}` : translation),
                <CircularProgress size={size} color='inherit' key="loading" sx={{...(!translation && {ml:4})}} />
            ]
            :
            capitalize ? `${translation[0].toUpperCase()}${translation.slice(1)}` : translation
    )
}