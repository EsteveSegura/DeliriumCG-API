class SavePluginCommand {
  constructor({ name, source, ownerId, isPrivate }) {
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
  }
}

module.exports = SavePluginCommand;
