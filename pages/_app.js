import '../styles/globals.scss'
import { AuthProvider } from "../Contexts/AuthContext";
function MyApp({ Component, pageProps }) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
