class SavePluginCommand {
  constructor({ name, source, ownerId, isPrivate, height, width, description, triggers }) {
    this.name = name;
    this.source = source;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
    this.height = height;
    this.width = width;
    this.description = description;
    this.triggers = triggers;
  }
}

module.exports = SavePluginCommand;
