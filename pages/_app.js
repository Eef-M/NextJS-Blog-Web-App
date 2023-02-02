import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import '../styles/global.css'

function App({ Component, pageProps }) {
    return (
        <>
            <div>
                <Navbar />
                <Component {...pageProps} />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default App;