const actorRepository = require('../../src/actors/actor.repository');
const Actor = require('../../src/actors/Actor');

const ActorModel = {
    id: 1,
    first_name: 'test actor',
    last_name: 'test'
};
const ActorModel2 = {
    ...ActorModel,
    name: `${ActorModel.first_name} ${ActorModel.last_name}`
};

Actor.create = jest.fn().mockImplementation(() => ActorModel);
Actor.findOrCreate = jest.fn().mockImplementation(() => [ActorModel, true]);
Actor.findAll = jest.fn().mockImplementation(() => [ActorModel2]);

describe('actorRepository', () => {
    describe('createActor', () => {
        it('have been called create method return new model', async () => {
            expect.assertions(2);

            expect(await actorRepository.createActor(ActorModel)).toBe(ActorModel);
            expect(Actor.create).toHaveBeenCalled();
        });
    });

    describe("findOrCreate", () => {
        it('have been called create or get model of actor', async() => {
            expect.assertions(2);

            expect(await actorRepository.findOrCreate(ActorModel)).toEqual([ActorModel, true]);
            expect(Actor.findOrCreate).toHaveBeenCalled();
        })
    });

    describe('findAll', () => {
        it('have been called findAll and get array', async () => {
            expect.assertions(2);

            expect(await actorRepository.findAll()).toHaveLength(1);
            expect(Actor.findAll).toHaveBeenCalled();
 
        })
    });

    describe('findOrCreateListOfActors', () => {
        it('if array is empty didnt call', async () => {
            expect.assertions(2);

            actorRepository.findOrCreate = jest.fn();

            expect(await actorRepository.findOrCreateListOfActors()).toEqual([]);
            expect(actorRepository.findOrCreate).not.toHaveBeenCalled();
        });

        //TODO check this test
        // it('if send array of actors get array ids', async() => {
        //     expect.assertions(1);

        //     actorRepository.findOrCreate = jest.fn().mockImplementation(() => ActorModel);

        //     expect(await actorRepository.findOrCreateListOfActors(['test user', 'test user2'])).toHaveLength(2);
        //     expect(await actorRepository.findOrCreate).toHaveBeenCalledTimes(2);
        // })
    });
    
})