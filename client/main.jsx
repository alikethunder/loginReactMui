import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom/client";
import AppRouter from '/imports/ui/AppRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

Meteor.startup(() => {
   //if page is not refreshed or it's not a new tab && remember me was not checked logout user
   window.addEventListener('load', function () {
      if (!sessionStorage.getItem('refresh') && Meteor._localStorage.getItem('rememberUser') === 'false') {
         Meteor.logout();
         localStorage.removeItem('Meteor.loginToken');
      }
   });

   const root = ReactDOM.createRoot(document.getElementById('react-target'));
   root.render(<AppRouter />)
});
