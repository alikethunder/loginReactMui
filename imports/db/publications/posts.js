import { Meteor } from 'meteor/meteor';
import { PostsCollection } from '/imports/db/collections/posts';

Meteor.publish('posts', function () {
  return PostsCollection.find({ userId: this.userId });
});