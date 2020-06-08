import { Card, Layout, Text, withStyles } from '@ui-kitten/components'

import CardFlip from 'react-native-card-flip'
import React from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/styles/hljs'

const ThemedCardContainer = (props) => {
    const { eva, style, ...restProps } = props

    return (
        <Card {...restProps} style={[eva.style.flash, style]} />
    )
}

const CardContainer = withStyles(ThemedCardContainer, (theme) => ({
    flash: {
        backgroundColor: theme['background-basic-color-2']
    },
}))


const FlashCard = (props) => {

    const Header = () => (
        <Layout style={{ padding: 15 }}>
            <Text category='h6'>{props.title}</Text>
        </Layout>
    )

    return (

        <CardContainer status={props.status} header={Header}>
            <SyntaxHighlighter
                language={props.language}
                fontSize={11}
                style={tomorrow}
                highlighter={"hljs"}
            >
                {props.code}
            </SyntaxHighlighter>

            <Text style={{ marginTop: 20 }}>{props.description}</Text>

        </CardContainer>

    )
}

export default FlashCard