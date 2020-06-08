import React, { useEffect, useState } from 'react'

import Carousel from 'react-native-snap-carousel'
import FlashCard from '../components/FlashCard'
import { Layout } from '@ui-kitten/components'
import _ from 'lodash'

export function DeckDetailView({ route, navigation }) {

    const { selectedDeck } = route.params
    const [activeIndex, setActiveIndex] = useState(0)

    const renderItem = ({ item, index }) => {
        return (
            <Layout style={{ margin: 20 }}>
                <FlashCard
                    title={item.title}
                    description={item.description}
                    code={item.code}
                    language={item.language}
                    status={item.priority}
                />
            </Layout>

        )
    }

    return (
        <>
            <Layout style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                    layout={"stack"}
                    layoutCardOffset={9}
                    data={[...selectedDeck.cards]}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={renderItem}
                    onSnapToItem={index => setActiveIndex(index)} />
            </Layout>
        </>
    )
}