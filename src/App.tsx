import './App.css'

import Header from '~/components/header'
import logo from "./assets/notes-logo.svg"
import SeqGen from "~/components/seqgen"

import { Tooltip } from "radix-ui";


const APP_NAME = 'SeqGen'

export default function App() {

  return (
    <>
        {/* These get shifted up to the header by react */}
        <title>{APP_NAME}</title>
        <link rel="icon" type="image/svg+xml" href={logo} />

        <Header title={APP_NAME} avatar={logo} />
        <Tooltip.Provider>
        <SeqGen className="mt-5" />
        </Tooltip.Provider>
    </>
  )
}
