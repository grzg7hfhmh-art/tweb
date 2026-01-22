import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ModalProvider } from "./component/modal"
import { StoreProvider } from "./component/store"
import { LanguageProvider } from "./component/store/languageProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ModalProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ModalProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
