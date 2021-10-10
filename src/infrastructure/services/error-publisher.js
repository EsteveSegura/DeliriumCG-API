const {sentry: {sentryDsn}} = require('../config/');

class ErrorPublisher {
  constructor({sentry}) {
    this.sentry = sentry;
  }

  init() {
    this.sentry.init({
      dsn: sentryDsn,
      tracesSampleRate: 1.0,
    });
  }

  setIdentity({id}) {
    this.sentry.setUser({
      id,
    });
  }

  setPluginId({id}) {
    this.sentry.setContext('plugin', {
      id,
    });
  }

  setTriggerData({type, name}) {
    this.sentry.setContext('trigger', {
      type,
      name,
    });
  }

  emitError(err) {
    this.sentry.captureException(err);
  }
}


module.exports = ErrorPublisher;
