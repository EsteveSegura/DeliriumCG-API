const awilix = require('awilix');
const container = require('../../../../container');
const Plugin = require('../../../../domain/plugin/plugin');
const Pulse = require('../../../../domain/plugin/triggers/pulse');
const User = require('../../../../domain/user/user');

describe('Display plugin', () => {
  const id = '123123-34563456-123123';
  const name = 'roll';
  const source = '<html>';
  const ownerId = '0000-1111111-22222';
  const isPrivate = false;
  const height = 200;
  const width = 400;
  const description = 'Roll a dice';
  const createdAt = new Date();
  const updatedAt = new Date();

  const pulse = new Pulse({
    type: 'pulse',
    name: 'roll',
    pulseToSend: 'roll_dice',
  });

  const pluginMock = new Plugin({
    id,
    name,
    source,
    ownerId,
    isPrivate,
    triggers: [pulse],
    height,
    width,
    description,
    createdAt,
    updatedAt,
  });

  const idUser = '0000000000000-999999999';
  const tokenUser = 'eY1930\'1290\'3099090091234124_.';
  const twitchUsernameUser = 'gs_skills';
  const updatedAtUser = new Date();
  const createdAtUser = new Date();

  const userMock = new User({
    id: idUser,
    token: tokenUser,
    twitchUsername: twitchUsernameUser,
    updatedAt: updatedAtUser,
    createdAt: createdAtUser,
  });

  let displayPlugin;
  let pluginRepositoryMock;
  let userRepositoryMock;
  let coreInjectableMock;
  beforeEach(() => {
    pluginRepositoryMock = {
      find: jest.fn(),
    };
    userRepositoryMock = {
      find: jest.fn(),
    };
    coreInjectableMock = {
      get: jest.fn(),
    };

    container.register({
      pluginRepository: awilix.asValue(pluginRepositoryMock),
      userRepository: awilix.asValue(userRepositoryMock),
      coreInjectable: awilix.asValue(coreInjectableMock),
    });

    displayPlugin = container.resolve('displayPlugin');
  });


  test('should return src with platform code injected', async () => {
    userRepositoryMock.find.mockReturnValue(userMock.toObject());
    pluginRepositoryMock.find.mockReturnValue(pluginMock.toObject());
    coreInjectableMock.get.mockReturnValue('<html>CODE INJECTED</html>');

    await displayPlugin.display({id});
    expect(pluginRepositoryMock.find).toHaveBeenCalledWith(id);
    expect(pluginRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.find).toHaveBeenCalledWith(pluginMock.ownerId);
    expect(coreInjectableMock.get).toHaveBeenCalledTimes(1);
    expect(coreInjectableMock.get).toHaveBeenCalledWith({id, twitchUsername: twitchUsernameUser, source});
  });

  test('should throw err if owner not exists', async () => {
    userRepositoryMock.find.mockReturnValue(null);
    pluginRepositoryMock.find.mockReturnValue(pluginMock.toObject());

    const expectedError = `Owner not exists`;
    try {
      await displayPlugin.display({id});
    } catch (err) {
      expect(pluginRepositoryMock.find).toHaveBeenCalledWith(id);
      expect(pluginRepositoryMock.find).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.find).toHaveBeenCalledTimes(1);
      expect(userRepositoryMock.find).toHaveBeenCalledWith(pluginMock.ownerId);
      expect(coreInjectableMock.get).toHaveBeenCalledTimes(0);
      expect(err.message).toEqual(expectedError);
    }
  });
});
