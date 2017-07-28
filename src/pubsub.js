const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const CHANGED_CONTENT_TOPIC = 'changed_content';

module.exports = {
  pubsub,
  CHANGED_CONTENT_TOPIC,
};
