import { Button, Icon, Input } from '@ui-kitten/components'

import { Formik } from 'formik'
import React from 'react'
import { t } from 'react-native-tailwindcss'

function LoginForm(props) {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={props.onFormSubmit}
        >

            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                    <Icon
                        style={[t.h20, t.mB3]}
                        name='layers'
                        fill='#cccccc'
                    />
                    <Input
                        style={[t.mY2]}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder='Email Address'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />

                    <Input
                        style={[t.mY2]}
                        secureTextEntry={true}
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />

                    <Button
                        style={[t.mT5, t.p5]}
                        onPress={handleSubmit}
                    >SIGN IN</Button>
                </>
            )}

        </Formik>
    )
}

export default LoginForm