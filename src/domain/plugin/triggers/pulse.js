const InvalidPulseError = require('./error/invalid-pulse-error');

class Pulse {
  constructor({type, name, pulseToSend}) {
    this.type = type;
    this.name = name;
    this.pulseToSend = pulseToSend;
  }

  toObject() {
    return {
      type: this.type,
      name: this.name,
      pulseToSend: this.pulseToSend,
    };
  }

  convertSpacesToKebabCase(string) {
    if (!string || string == '') {
      throw new InvalidPulseError('Cant convert string to Kebab Case');
    }

    if (string.includes(' ')) {
      return string.replace(/ /g, '_');
    }

    return string;
  }

  set type(type) {
    if (!type) {
      throw new InvalidPulseError('Field type cannot be empty');
    }

    this._type = type;
  }

  get type() {
    return this._type;
  }

  set name(name) {
    if (!name) {
      throw new InvalidPulseError('Field name cannot be empty');
    }

    this._name = name;
  }

  get name() {
    return this._name;
  }

  set pulseToSend(pulseToSend) {
    if (!pulseToSend) {
      throw new InvalidPulseError('Field pulseToSend cannot be empty');
    }

    this._pulseToSend = this.convertSpacesToKebabCase(pulseToSend);
  }

  get pulseToSend() {
    return this._pulseToSend;
  }
}

module.exports = Pulse;
