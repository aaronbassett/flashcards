import { Card, Deck } from '../schemas/Deck'
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
            console.warn('DecksView must be authenticated!')
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
        })
    }

    const createCard = async (deck, title, description, code, language, priority) => {

        const realm = realmRef.current

        realm.write(() => {
            let newCard = new Card({
                title: title,
                description: description,
                code: code,
                priority: priority,
                language: language
            })

            deck.cards.push(newCard)
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
                createCard,
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
