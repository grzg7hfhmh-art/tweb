import { useEffect, useState } from "react"
import posterImage from "../../images/poster.jpg"
import { useLanguage } from "../store/useLanguage"

const SEEN_KEY = "wedding_intro_seen"
const FADE_OUT_MS = 4000

type IntroPosterProps = {
  onDismissStart?: () => void
}

export const IntroPoster = ({ onDismissStart }: IntroPosterProps) => {
  const { language } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const seen = window.sessionStorage.getItem(SEEN_KEY) === "1"
    if (!seen) {
      setVisible(true)
    }
  }, [])

  const closePoster = () => {
    if (!visible || closing) return
    onDismissStart?.()
    setClosing(true)
    window.sessionStorage.setItem(SEEN_KEY, "1")
    window.setTimeout(() => {
      setVisible(false)
    }, FADE_OUT_MS)
  }

  if (!visible) return null

  return (
    <div
      className={`intro-poster${closing ? " closing" : ""}`}
      role="button"
      tabIndex={0}
      onClick={closePoster}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
          e.preventDefault()
          closePoster()
        }
      }}
      aria-label={language === "ja" ? "タップして招待状を見る" : "터치해서 청첩장 보기"}
    >
      <img className="poster-image" src={posterImage} alt="wedding poster" />
      <div className="poster-dim" />
      <div className="poster-content">
        <div className="poster-title">Save the date</div>
        <div className="poster-names">Seongjun &amp; Sari</div>
        <div className="poster-date">2026. 06. 21</div>
        <div className="poster-spacer" />
        <div className="poster-hint">
          {language === "ja" ? "どこでもタップしてください" : "아무 곳이나 터치해 주세요"}
        </div>
      </div>
    </div>
  )
}
