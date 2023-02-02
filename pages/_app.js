import Navbar from '../components/Navbar';
import '../styles/global.css'

function App({ Component, pageProps }) {
    return (
        <>
            <div>
                <Navbar />
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default App;