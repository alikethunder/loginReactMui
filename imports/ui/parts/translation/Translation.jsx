import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';

import { useTracker } from 'meteor/react-meteor-data';
import { TranslationsCollection } from '/imports/db/translations';

/// {phrase, capitalize} phrase - key in translations object for translation, capitalize - capitalize first letter
export default function Translation({ phrase, capitalize }) {

    let [searchParams, setSearchParams] = useSearchParams();

    const searchParamsLang = searchParams.get('language');

    const { ready, translation } = useTracker(() => {

        let subscription = Meteor.subscribe('translation', phrase, searchParamsLang);

        let translations = TranslationsCollection.findOne({ _id: phrase });
        // if there is no translation in searchParamsLang then return english version
        return { ready: subscription.ready(), translation: (translations && (translations[searchParamsLang] || translations.en)) }
    });
    
    return (
        !ready ? <CircularProgress size='0.9rem' sx={{ml: 4}} /> : capitalize ? `${translation[0].toUpperCase()}${translation.slice(1)}` : translation
    )
}