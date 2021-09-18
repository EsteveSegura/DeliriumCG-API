const InvalidPluginError = require('./error/invalid-plugin-error');

class Plugin {
    constructor({ id, name, source, ownerId, isPrivate, createdAt, updatedAt }) {
        this.id = id;
        this.name = name
        this.source = source;
        this.ownerId = ownerId;
        this.isPrivate = isPrivate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            source: this.source,
            ownerId: this.ownerId,
            isPrivate: this.isPrivate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }

    checkOwner(id) {
        return id == this.ownerId
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
