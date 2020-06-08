import { Card, Deck, Priorities } from '../schemas/Deck'
import React, { useContext, useEffect, useRef, useState } from 'react'

import Realm from 'realm'
import { useAuth } from './AuthProvider'

const DecksContext = React.createContext(null)

const DecksProvider = ({ children, projectId }) => {

    const { user } = useAuth()
    const [decks, setDecks] = useState([])
    const realmRef = useRef(null)

    const config = {
        schema: [Deck.schema, Card.schema],
        sync: {
            user,
            partitionValue: `"${projectId}"`,
        },
    }

    useEffect(() => {
        if (user == null) {
            console.warn('TasksView must be authenticated!')
            return
        }

        let canceled = false

        Realm.open(config)
            .then(openedRealm => {
                if (canceled) {
                    openedRealm.close()
                    return
                }

                realmRef.current = openedRealm
                const syncDecks = openedRealm.objects('Deck')

                openedRealm.addListener('change', () => {
                    setDecks([...syncDecks])
                })

                // Set the tasks state variable and re-render.
                setDecks([...syncDecks])
            })
            .catch(error => console.warn('Failed to open realm:', error))

        return () => {
            canceled = true

            const realm = realmRef.current
            if (realm != null) {
                realm.removeAllListeners()
                realm.close()
                realmRef.current = null
            }
        }
    }, [user, projectId])


    const createDeck = async (title, description) => {

        const realm = realmRef.current

        realm.write(() => {
            let newDeck = realm.create(
                'Deck',
                new Deck({ title: title, description: description, partition: projectId }),
            )
            let newCard = new Card({
                title: "Sample Card",
                description: "This is an automatically created card",
                code: "useEffect(() => console.log('stuff'))"
            })

            let newCard2 = new Card({
                title: "Another Sample Card",
                description: "This is an automatically created card",
                code: "const [user, setUser] = useState(null)",
                priority: Priorities.TWO
            })

            let newCard3 = new Card({
                title: "And a 3rd Card",
                description: "With a different description",
                code: "from mongodb import mongo",
                priority: Priorities.THREE,
                language: 'python'
            })

            newDeck.cards.push(newCard)
            newDeck.cards.push(newCard2)
            newDeck.cards.push(newCard3)
        })
    }

    const deleteDeck = (deck) => {
        const realm = realmRef.current
        realm.write(() => {
            realm.delete(deck.cards)
            realm.delete(deck)
        })
    }

    const deleteCard = (card) => {
        const realm = realmRef.current
        realm.write(() => {
            realm.delete(card)
        })
    }

    return (
        <DecksContext.Provider
            value={{
                createDeck,
                deleteDeck,
                deleteCard,
                decks,
                projectId,
            }}>
            {children}
        </DecksContext.Provider>
    )
}

const useDecks = () => {
    const deck = useContext(DecksContext)
    if (deck == null) {
        throw new Error('useDesks() called outside of a DecksProvider?')
    }
    return deck
}

export { DecksProvider, useDecks }
