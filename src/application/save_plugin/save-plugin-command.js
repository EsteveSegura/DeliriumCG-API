class SavePluginCommand {
  constructor({ name, source, ownerId, isPrivate, triggers }) {
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
    this.triggers = triggers;
  }
}

module.exports = SavePluginCommand;
