class SavePluginCommand {
  constructor({ name, source }) {
    console.log(name, source)
    this.name = name;
    this.source = source;
  }
}

module.exports = SavePluginCommand;
