import { BrowserIcon, TrashIcon } from './Icons'
import { Button, ListItem } from '@ui-kitten/components'

import React from 'react'

export function CardListItem(props) {

    return (

        <ListItem
            style={{ height: 75 }}
            key={props.item._id}
            title={props.item.title}
            description={props.item.description}
            accessoryLeft={BrowserIcon}
            accessoryRight={() => {
                return (
                    <Button
                        appearance='ghost'
                        accessoryLeft={TrashIcon}
                        status='danger'
                        onPress={() => {
                            props.handleDeleteCard(props.item)
                        }}
                    />
                )
            }}
        />
    )
}