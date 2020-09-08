const { OPCodes } = require('../util/Constants');

/**
  * This class handles parsing of the data of a `whisper` event
  */
class WhisperStruct {
  /**
    * @param {Channel} channel Channel that the whisper was sent through
    * @param {User} user User whomst'd sent the whisper
    * @param {object} data Incoming event data
    * @param {Client} client Main client reference
    */
  constructor(channel, user, data, client) {
    /**
      * Channel that the whisper was sent through
      * @type {Channel}
      */
    this.channel = channel;

    /**
      * User whomst'd sent the whisper
      * @type {User}
      */
    this.user = user;

    /**
      * Add client reference
      * @type {Client}
      * @readonly
      */
    Object.defineProperty(this, 'client', { value: client });

    if (data) this.setup(data);
  }

  /**
    * Fill in this structure with provided data
    * @param {object} data Incoming event data
    * @returns {void}
    */
  setup(data) {
    /**
      * The content of the whispered message
      * @type {string}
      */
    this.content = data.text;

    /**
      * The timestamp the whisper was sent at
      * @type {number}
      */
    this.timestamp = new Date();
  }

  /**
    * Get creation timestamp as Date
    * @type {Date}
    * @readonly
    */
  get createdAt() {
    return new Date(this.timestamp);
  }

  /**
    * Send a reply to the whisperer
    * @param {string} text The content for the message
    * @returns {Promise}
    * @example
    * // Replying to a whisper:
    * incomingWhisper.reply('This has been whispered')
    *   .then(sent => console.log(`Sent a whisper to ${sent.user}`))
    *   .catch(console.error);
    */
  reply(text) {
    return new Promise((resolve) => {
      this.client.ws.send({
        cmd: OPCodes.WHISPER,
        channel: this.channel,
        text,
      });
      resolve(this);
    }).catch((e) => Promise.reject(e));
  }

  /**
    * When referenced as a string, output the content instead of an object type
    * @returns {string}
    */
  toString() {
    return this.content;
  }
}

module.exports = WhisperStruct;
