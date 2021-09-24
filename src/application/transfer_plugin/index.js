class TransferPlugin {
    constructor({ pluginRepository, userRepository, idGenerator }) {
        this.pluginRepository = pluginRepository;
        this.userRepository = userRepository;
        this.idGenerator = idGenerator;
    }

    async transfer({ idPlugin, idToTransfer }) {
        const domain = await this.pluginRepository.find(idPlugin);
        this._checkIfPluginExists(domain);
        this._checkIfPluginIsPublic(domain);

        const userDomain = await this.userRepository.find(idToTransfer);
        this._checkIfUserToTransferExists(userDomain);
        this._checkIfOwnerAndUserToTransferAreNotTheSame(domain.ownerId, userDomain.id);

        const newPluginId = this.idGenerator.generate();
        domain.changeOwner({newOwnerId: idToTransfer , newPluginId});
        domain.setPluginToPrivate();

        this.pluginRepository.save(domain);
    }

    _checkIfOwnerAndUserToTransferAreNotTheSame(ownerId, transferUserId) {
        if (ownerId == transferUserId) {
            throw new Error("Trying to self");
        }
    }

    _checkIfPluginIsPublic(plugin) {
        if (plugin.isPrivate) {
            throw new Error("Plugin is not public");
        }
    }

    _checkIfPluginExists(plugin) {
        if (!plugin) {
            throw new Error("Plugin not exists");
        }
    }

    _checkIfUserToTransferExists(user) {
        if (!user) {
            throw new Error("User not exists");
        }
    }

}

module.exports = TransferPlugin;
