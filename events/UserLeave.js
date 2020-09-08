const AbstractEvent = require('./AbstractEvent');

/**
  * This class handles an incoming `leave` event from the server
  * @private
  */
class UserLeave extends AbstractEvent {
  /**
    * Event handler function
    * @param {object} data Incoming event data
    * @returns {object}
    */
  handle(data) {
    const { client } = this;
    const user = client.users.get(data.userid);

    user.toggleOnline();

    return user;
  }
}

module.exports = UserLeave;
