import { ReactNode, useState, useCallback } from "react"
import { LanguageContext, Language } from "./languageContext"

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // 로컬스토리지에서 저장된 언어 복원
    const saved = localStorage.getItem("language") as Language | null
    return saved || "ko"
  })

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
