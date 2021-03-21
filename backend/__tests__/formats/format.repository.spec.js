const formatRepository = require('../../src/formats/format.repository');
const Format = require('../../src/formats/Format');

const FormatModel = {
    name: 'DVD'
};

Format.findOne = jest.fn().mockImplementation(() => FormatModel);
Format.findAll = jest.fn().mockImplementation(() => [FormatModel]);

describe('formatRepository', () => {
    describe('findAll', () => {
        it('return array of Formats', async () => {
            expect(await formatRepository.findAll()).toEqual([FormatModel]);
            expect(Format.findAll).toHaveBeenCalled();
        })
    })

    describe('findOneByName', () => {
        it('return model of format', async () => {

            expect(await formatRepository.findOneByName('name')).toBe(FormatModel);
            expect(Format.findOne).toHaveBeenCalled();
        })
    })
});