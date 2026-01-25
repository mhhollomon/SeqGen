import './App.css'
import Header from '~/components/header'
import logo from "./assets/notes-logo.svg"

const APP_NAME = 'SeqGen'

export default function App() {

  return (
    <>
        {/* This gets shifted up to the header by react */}
        <title>{APP_NAME}</title>
        <link rel="icon" type="image/svg+xml" href={logo} />

        <Header title={APP_NAME} avatar={logo} />
        <main className="main">
            <div>Cool Stuff Here</div>
        </main>

    </>
  )
}
