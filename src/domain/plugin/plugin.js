const InvalidPluginError = require('./error/invalid-plugin-error');

class Plugin {
    constructor({ id, name, source, ownerId, isPrivate,  triggers, createdAt, updatedAt }) {
        this.id = id;
        this.name = name
        this.source = source;
        this.ownerId = ownerId;
        this.isPrivate = isPrivate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.triggers = triggers;
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            source: this.source,
            ownerId: this.ownerId,
            isPrivate: this.isPrivate,
            triggers: this.triggers.map(trigger => trigger.toObject()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    setPluginToPrivate(){
        this.isPrivate = true;
    }

    changeOwner({newOwnerId,newPluginId}){
        this.ownerId = newOwnerId;
        this.id = newPluginId;
    }

    addTrigger(trigger) {
        if (!trigger) {
            throw new InvalidPluginError('No trigger specified');
        }

        this.triggers.push(trigger)
    }

    checkOwner(id) {
        if (!id) {
            throw new InvalidPluginError('No id specified');
        }

        return id == this.ownerId
    }

     set triggers(triggers) {
        if (!triggers) {
          throw new InvalidPluginError('Field triggers cannot be empty');
        }
    
        this._triggers = triggers;
      }
    
      get triggers() {
        return this._triggers;
      }

    set ownerId(ownerId) {
        if (!ownerId) {
            throw new InvalidPluginError('Field ownerId cannot be empty');
        }

        this._ownerId = ownerId;
    }

    get ownerId() {
        return this._ownerId;
    }

    set isPrivate(isPrivate = false) {
        this._isPrivate = isPrivate;
    }

    get isPrivate() {
        return this._isPrivate;
    }

    set id(id) {
        if (!id) {
            throw new InvalidPluginError('Field id cannot be empty');
        }

        this._id = id;
    }

    get id() {
        return this._id;
    }

    set name(name) {
        if (!name) {
            throw new InvalidPluginError('Field name cannot be empty');
        }

        this._name = name;
    }

    get name() {
        return this._name;
    }

    set source(source) {
        if (!source) {
            throw new InvalidPluginError('Field source cannot be empty');
        }

        this._source = source;
    }

    get source() {
        return this._source;
    }

    set cretedAt(cretedAt) {
        if (!cretedAt) {
            throw new InvalidPluginError('Field cretedAt cannot be empty');
        }

        this._cretedAt = cretedAt;
    }

    get cretedAt() {
        return this._cretedAt;
    }

    set updatedAt(updatedAt) {
        if (!updatedAt) {
            throw new InvalidPluginError('Field updatedAt cannot be empty');
        }

        this._updatedAt = updatedAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

}

module.exports = Plugin;
