import { ObjectId } from 'bson'

const LANGUAGES = [
    'javascript', 'swift', 'go', 'python', 'php', 'ruby', 'rust', 'java'
]

class Priorities {
    static FIVE = {
        statusName: 'primary',
        level: 5
    }
    static FOUR = {
        statusName: 'success',
        level: 4
    }
    static THREE = {
        statusName: 'warning',
        level: 3
    }
    static TWO = {
        statusName: 'danger',
        level: 2
    }
    static ONE = {
        statusName: 'basic',
        level: 1
    }
}

class Card {

    constructor({ title, code, language = 'javascript', priority = Priorities.FIVE, description, id = new ObjectId() }) {
        this._id = id
        this.title = title
        this.description = description
        this.code = code
        this.language = language
        this.priority = priority.statusName
    }

    static schema = {
        name: 'Card',
        properties: {
            _id: 'object id',
            title: 'string',
            description: 'string',
            code: 'string',
            language: 'string',
            priority: 'string'
        },
        primaryKey: '_id'
    }
}

class Deck {

    constructor({ title, description, partition, id = new ObjectId() }) {
        this._partition = partition
        this._id = id
        this.title = title
        this.description = description
    }

    static schema = {
        name: 'Deck',
        properties: {
            _id: 'object id',
            _partition: 'string',
            title: 'string',
            description: 'string',
            cards: 'Card[]'
        },
        primaryKey: '_id',
    };
}

export { Deck, Card, Priorities, LANGUAGES }
