class GetPluginCommand {
  constructor({id, candidateOwner, name}) {
    this.id = id;
    this.candidateOwner = candidateOwner;
    this.name = name;
  }
}

module.exports = GetPluginCommand;
