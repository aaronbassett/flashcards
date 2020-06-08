import { Button } from '@ui-kitten/components'
import { CardListView } from '../views/CardListView'
import { DeckDetailView } from '../views/DeckDetailView'
import { DeckListView } from '../views/DeckListView'
import { DecksProvider } from '../providers/DecksProvider'
import { ListIcon } from './Icons'
import { LogInView } from '../views/LogInView'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuth } from '../providers/AuthProvider'

const Stack = createStackNavigator()

export function AppBody() {
  const { user } = useAuth()
  return (
    <>

      {user == null ? (
        <LogInView />
      ) : (
          <DecksProvider projectId="My Project">
            <NavigationContainer>
              <Stack.Navigator initialRouteName="DeckList">
                <Stack.Screen
                  name="DeckList"
                  component={DeckListView}
                  options={
                    { title: 'Your Decks' }
                  }
                />
                <Stack.Screen
                  name="DeckDetail"
                  component={DeckDetailView}
                  options={
                    ({ route, navigation }) => (
                      {
                        title: route.params.selectedDeck.title,
                        headerRight: () => (
                          <Button
                            appearance='ghost'
                            accessoryLeft={ListIcon}
                            onPress={() => {
                              navigation.navigate('CardList', {
                                selectedDeck: route.params.selectedDeck
                              })
                            }}
                          />
                        )
                      }
                    )
                  }
                />
                <Stack.Screen
                  name="CardList"
                  component={CardListView}
                  options={
                    ({ route, navigation }) => (
                      {
                        title: 'Card List',
                        headerRight: () => (
                          <Button
                            appearance='ghost'
                            accessoryLeft={ListIcon}
                            onPress={() => {
                              navigation.navigate('DeckDetail', {
                                selectedDeck: route.params.selectedDeck
                              })
                            }}
                          />
                        )
                      }
                    )
                  }
                />
              </Stack.Navigator>
            </NavigationContainer>
          </DecksProvider>
        )}

    </>
  )
}
