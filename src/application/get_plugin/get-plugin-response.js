class GetPluginResponse {
  constructor({id, name, source, ownerId, isPrivate, triggers, height, width, description}) {
    this.id = id;
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
    this.triggers = triggers;
    this.description = description;
    this.height = height;
    this.width = width;
  }
}

module.exports = GetPluginResponse;
