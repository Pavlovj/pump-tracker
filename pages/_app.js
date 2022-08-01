import { CurrencyContext } from '../contexts/currencyContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <CurrencyContext>
      <Component {...pageProps} />
    </CurrencyContext>
  )
}

export default MyApp
