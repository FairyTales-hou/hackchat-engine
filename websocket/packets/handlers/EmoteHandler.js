const AbstractHandler = require('./AbstractHandler');
const { Events } = require('../../../util/Constants');

/**
  * Handles an emote packet received from the server
  * @private
  */
class EmoteHandler extends AbstractHandler {
  /**
    * Parses incoming packet data and emits related events
    * @param {object} packet Incoming packet data
    * @returns {void}
    */
  handle(packet) {
    const { client } = this.packetRouter;
    const response = client.events.Emote.handle(packet);

    /**
      * Emitted when the client recives an emote packet
      * @event Client#emote
      * @param {Emote} message The created message
      */
    client.emit(Events.CHANNEL_EMOTE, response.message);
  }
}

module.exports = EmoteHandler;
