import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import { createTheme, ThemeProvider } from '@mui/material'
const theme = createTheme({
    palette: {
        background: {
            paper: '#fff'
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A'
        },
        action: {
            active: '#001E3C'
        }
    }
})

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootComponent />
                </PersistGate>
            </ThemeProvider>
        </Provider>
    )
}

export default App
