class GetPluginResponse {
  constructor({id, name, source, ownerId, isPrivate, triggers}) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
    this.triggers = triggers;
  }
}

module.exports = GetPluginResponse;
