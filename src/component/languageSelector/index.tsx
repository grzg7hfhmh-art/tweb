import { useLanguage } from "../store/useLanguage"
import "./index.scss"

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-selector">
      <button
        className={`lang-btn ${language === "ko" ? "active" : ""}`}
        onClick={() => setLanguage("ko")}
      >
        한국어
      </button>
      <button
        className={`lang-btn ${language === "ja" ? "active" : ""}`}
        onClick={() => setLanguage("ja")}
      >
        日本語
      </button>
    </div>
  )
}
