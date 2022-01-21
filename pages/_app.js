import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import '@fontsource/mochiy-pop-one/400.css'

const theme = extendTheme({
  fonts: {
    title: 'Mochiy Pop One'
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp