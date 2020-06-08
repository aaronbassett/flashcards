import { Button, Input } from '@ui-kitten/components'

import { Formik } from 'formik'
import { Overlay } from 'react-native-elements'
import React from 'react'
import { t } from 'react-native-tailwindcss'
import { useDecks } from '../providers/DecksProvider'

export function DeckCreateView(props) {

    const { createDeck } = useDecks()

    function onFormSubmit(values) {
        createDeck(values.title, values.description)
        props.setIsAddOverlayVisible(false)
    }

    return (
        <>
            <Overlay
                isVisible={props.isAddOverlayVisible}
                overlayStyle={{ width: '90%' }}
                onBackdropPress={() => props.setIsAddOverlayVisible(false)}>
                <>
                    <Formik
                        initialValues={{
                            title: '',
                            description: ''
                        }}
                        onSubmit={onFormSubmit}
                    >

                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <>

                                <Input
                                    style={[t.mY2]}
                                    placeholder='Deck Title'
                                    onChangeText={handleChange('title')}
                                    onBlur={handleBlur('title')}
                                    value={values.title}
                                />

                                <Input
                                    style={[t.mY2]}
                                    textStyle={{ minHeight: 200 }}
                                    multiline={true}
                                    placeholder='Description'
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                />

                                <Button
                                    style={[t.mT5, t.p5]}
                                    onPress={handleSubmit}
                                >Create</Button>
                            </>
                        )}

                    </Formik>
                </>
            </Overlay>
        </>
    )
}
