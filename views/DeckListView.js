import { Button, Divider, List, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { Layout, Text } from '@ui-kitten/components'
import { LogOutIcon, PlusIcon } from '../components/Icons'
import React, { useState } from 'react'

import { DeckCreateView } from './DeckCreateView'
import { DeckItem } from '../components/DeckItem'
import { t } from 'react-native-tailwindcss'
import { useAuth } from '../providers/AuthProvider'
import { useDecks } from '../providers/DecksProvider'

export function DeckListView({ navigation }) {

    const { logOut } = useAuth()
    const { decks, projectId } = useDecks()
    const [isAddOverlayVisible, setIsAddOverlayVisible] = useState(false)

    const renderPlusAction = () => (
        <TopNavigationAction icon={PlusIcon} onPress={() => setIsAddOverlayVisible(true)} />
    )

    const renderDecksTitle = () => (
        <Text category='h1'>{projectId}</Text>
    )

    const renderItem = ({ item, index }) => {
        return (
            <DeckItem
                navigation={navigation}
                item={item}
            />
        )
    }

    return (
        <>
            <DeckCreateView
                isAddOverlayVisible={isAddOverlayVisible}
                setIsAddOverlayVisible={setIsAddOverlayVisible}
            />

            <TopNavigation
                accessoryRight={renderPlusAction}
                accessoryLeft={renderDecksTitle}
            />

            <Divider />

            <Layout>
                <List
                    style={{ height: "75%" }}
                    ItemSeparatorComponent={Divider}
                    data={decks}
                    renderItem={renderItem}
                />
            </Layout>

            <Divider />

            <Layout style={[t.p10]}>
                <Button
                    status='warning'
                    accessoryLeft={LogOutIcon}
                    onPress={logOut}
                >
                    LOGOUT
                </Button>
            </Layout>
        </>
    )
}