import { AlertIcon, PlusIcon } from '../components/Icons'
import { Button, Divider, IndexPath, Input, List, Select, SelectItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { LANGUAGES, Priorities } from '../schemas/Deck'
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'

import { CardListItem } from '../components/CardListItem'
import { DeckCreateView } from './DeckCreateView'
import { Formik } from 'formik'
import _ from 'lodash'
import { t } from 'react-native-tailwindcss'
import { useDecks } from '../providers/DecksProvider'

export function CardCreateView({ route, navigation }) {

    const { selectedDeck } = route.params
    const { createCard } = useDecks()
    const [languageSelectedIndex, setLanguageSelectedIndex] = useState(new IndexPath(0))
    const [prioritySelectedIndex, setPrioritySelectedIndex] = useState(new IndexPath(0))

    const languageDisplayValue = _.capitalize(LANGUAGES[languageSelectedIndex.row])
    const languageOptions = LANGUAGES.map((language) => (
        <SelectItem title={_.capitalize(language)} />
    ))

    const priorities = [Priorities.FIVE, Priorities.FOUR, Priorities.THREE, Priorities.TWO, Priorities.ONE]
    const prioritiesDisplayValue = `Priority #${priorities[prioritySelectedIndex.row].level}`
    const priorityOptions = priorities.map((priority) => (
        <SelectItem title={`Priority #${priority.level}`} />
    ))

    function onFormSubmit(values) {
        createCard(
            selectedDeck,
            values.title,
            values.description,
            values.code,
            LANGUAGES[languageSelectedIndex.row],
            priorities[prioritySelectedIndex.row]
        )
        navigation.navigate('CardList', {
            selectedDeck: selectedDeck
        })
    }

    return (
        <>
            <Layout
                style={[t.p5]}
            >
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        code: '',
                        language: 'javascript',
                        priority: 'primary'
                    }}
                    onSubmit={onFormSubmit}
                >

                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <>

                            <Input
                                style={[t.mY2]}
                                placeholder='Card Title'
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values.title}
                            />

                            <Input
                                style={[t.mY2]}
                                textStyle={{ height: 200 }}
                                multiline={true}
                                placeholder='Code'
                                onChangeText={handleChange('code')}
                                onBlur={handleBlur('code')}
                                value={values.code}
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

                            <Select
                                style={[t.mY2]}
                                selectedIndex={languageSelectedIndex}
                                value={languageDisplayValue}
                                onSelect={index => setLanguageSelectedIndex(index)}>
                                {languageOptions}
                            </Select>

                            <Select
                                style={[t.mY2]}
                                selectedIndex={prioritySelectedIndex}
                                value={prioritiesDisplayValue}
                                onSelect={index => setPrioritySelectedIndex(index)}>
                                {priorityOptions}
                            </Select>

                            <Button
                                style={[t.mT5, t.p5]}
                                onPress={handleSubmit}
                            >Create</Button>
                        </>
                    )}

                </Formik>
            </Layout>
        </>

    )
}