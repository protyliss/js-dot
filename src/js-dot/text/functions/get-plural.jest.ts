import {getPlural} from './get-plural';

describe('getPlural', () => {
    [
        ['dog', 'dogs'],
        ['car', 'cars'],
        ['apple', 'apples'],
        ['photo', 'photos'],
        ['taco', 'tacos'],
        ['piano', 'pianos'],
        ['potato', 'potatoes'],
        ['tomato', 'tomatoes'],
        ['hero', 'heroes'],
        ['cargo', 'cargoes'],
        ['roof', 'roofs'],
        ['giraffe', 'giraffes'],
        ['leaf', 'leaves'],
        ['knife', 'knives'],
        ['lemon', 'lemons'],
        ['canyon', 'canyons'],
        ['salon', 'salons'],
        ['criterion', 'criteria'],
        ['phenomenon', 'phenomena'],
        ['bus', 'buses'],
        ['box', 'boxes'],
        ['buzz', 'buzzes'],
        ['wish', 'wishes'],
        ['watch', 'watches'],
        ['axis', 'axes'],
        ['oasis', 'oases'],
        ['crisis', 'crises'],
        ['fairy', 'fairies'],
        ['candy', 'candies'],
        ['dummy', 'dummies'],
        ['way', 'ways'],
        ['monkey', 'monkeys'],
        ['toy', 'toys'],
        ['guy', 'guys'],
        ['fungus', 'fungi'],
        ['cactus', 'cacti'],
        ['stimulus', 'stimuli']
    ]
        .forEach(([singular, plural]) => {
            test(`${singular} to ${plural}`, () => {
                expect(getPlural(singular)).toBe(plural);
            })
        });
});
