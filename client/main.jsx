import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { AppRouter } from '/imports/ui/AppRouter';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

Meteor.startup(() => {
  render(<AppRouter/>, document.getElementById('react-target'));
});
