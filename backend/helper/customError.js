class HttpError extends Error {
  constructor(messages, statusCode) {
    super('http errror');
    this.messages = messages;
    this.statusCode = statusCode;
  }
}

module.exports = {
  HttpError,
};
