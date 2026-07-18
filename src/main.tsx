import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { store } from './store'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: "Open Sans, sans-serif",
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>,
)
