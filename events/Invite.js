const AbstractEvent = require('./AbstractEvent');
const InviteStruct = require('../structures/InviteStruct');

/**
  * This class handles an incoming `invite` event from the server
  * @private
  */
class Invite extends AbstractEvent {
  /**
    * Event handler function
    * @param {object} data Incoming event data
    * @returns {object}
    */
  handle(data) {
    const { client } = this;
    const message = new InviteStruct(client, data);

    return {
      message,
    };
  }
}

module.exports = Invite;
