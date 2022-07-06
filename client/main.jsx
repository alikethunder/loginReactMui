import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom/client";

import AppRouter from '/imports/ui/router/AppRouter';

Meteor.startup(() => {

   //set default variables for sidebar
   Session.setDefault('sidebarMobileOpened', Meteor._localStorage.getItem('sidebarMobileOpened') === 'true');
   Session.setDefault('sidebarWideOpened', Meteor._localStorage.getItem('sidebarWideOpened') === 'true');
   
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
