import * as eva from '@eva-design/eva'

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'

import { AppBody } from './components/AppBody'
import { AuthProvider } from './providers/AuthProvider'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import React from 'react'

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthProvider>
          <AppBody />
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}

export default App
