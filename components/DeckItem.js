import { Button, Icon, ListItem } from '@ui-kitten/components'

import React from 'react'

export function DeckItem(props) {

    const renderItemIcon = () => (
        <Icon name='layers' />
    )

    return (

        <ListItem
            style={{ height: 75 }}
            key={props.item._id}
            title={props.item.title}
            description={props.item.description}
            accessoryLeft={renderItemIcon}
            accessoryRight={() => {
                return (
                    <Button
                        size='tiny'
                        onPress={() => {
                            props.navigation.navigate('DeckDetail', {
                                selectedDeck: props.item
                            })
                        }}
                    >VIEW</Button>
                )
            }}
        />
    )
}