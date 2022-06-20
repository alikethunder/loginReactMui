import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom/client";
import { AppRouter } from '/imports/ui/AppRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

Meteor.startup(() => {
   const root = ReactDOM.createRoot(document.getElementById('react-target'));
   root.render(<AppRouter/>)
});
