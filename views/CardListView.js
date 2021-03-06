import { AlertIcon, PlusIcon } from '../components/Icons'
import { Button, Divider, List, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'

import { CardListItem } from '../components/CardListItem'
import { DeckCreateView } from './DeckCreateView'
import _ from 'lodash'
import { t } from 'react-native-tailwindcss'
import { useDecks } from '../providers/DecksProvider'

export function CardListView({ route, navigation }) {

    const { selectedDeck } = route.params
    const [cards, setCards] = useState([...selectedDeck.cards])
    const [deleteOnUnMount, setDeleteOnUnmount] = useState(false)
    const { deleteDeck, deleteCard } = useDecks()

    useEffect(() => {
        return () => {
            if (deleteOnUnMount) {
                deleteDeck(selectedDeck)
            }
        }
    }, [deleteOnUnMount])

    const renderPlusAction = () => (
        <TopNavigationAction
            icon={PlusIcon}
            onPress={() => {
                navigation.navigate('CardCreate', {
                    selectedDeck: selectedDeck
                })
            }}
        />
    )

    const renderDecksTitle = () => (
        <Text category='h1'>{selectedDeck.title}</Text>
    )

    const renderItem = ({ item, index }) => {
        return (
            <CardListItem
                handleDeleteCard={handleDeleteCard}
                item={item}
            />
        )
    }

    const handleDeleteCard = (cardToDelete) => {
        setCards([])
        deleteCard(cardToDelete)
        setCards([...selectedDeck.cards])
    }

    return (
        <>

            <TopNavigation
                accessoryRight={renderPlusAction}
                accessoryLeft={renderDecksTitle}
            />

            <Divider />

            <Layout>
                <List
                    style={{ height: "75%" }}
                    ItemSeparatorComponent={Divider}
                    data={cards}
                    renderItem={renderItem}
                />
            </Layout>

            <Divider />

            <Layout style={[t.p10]}>
                <Button
                    status='danger'
                    accessoryLeft={AlertIcon}
                    accessoryRight={AlertIcon}
                    onPress={() => {
                        setDeleteOnUnmount(true)
                        navigation.navigate('DeckList')
                    }}
                >
                    DELETE DECK
                </Button>
            </Layout>
        </>
    )
}