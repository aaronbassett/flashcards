import React, { useState } from 'react'

import { ImageBackground } from 'react-native'
import { Layout } from '@ui-kitten/components'
import LoginForm from '../components/LoginForm'
import { t } from 'react-native-tailwindcss'
import { useAuth } from '../providers/AuthProvider'

export function LogInView() {

    const [error, setError] = useState(null)
    const { logIn } = useAuth()

    async function onFormSubmit(values) {
        setError(null)
        try {
            await logIn(values.email, values.password)
        } catch (e) {
            setError(JSON.parse(e.message).error)
        }
    }

    return (
        <>
            <ImageBackground
                style={{ height: 195 }}
                source={require('../assets/signin-background.png')}
            />

            <Layout style={[t.p10]}>
                <LoginForm onFormSubmit={onFormSubmit} error={error} />
            </Layout>
        </>
    )
}
