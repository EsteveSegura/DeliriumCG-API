class GetPluginResponse {
  constructor({id, name, source, ownerId, isPrivate}) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
  }
}

module.exports = GetPluginResponse;
