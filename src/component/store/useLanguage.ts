import { useContext } from "react"
import { LanguageContext, LanguageContextType } from "./languageContext"
import { TRANSLATIONS, getCurrentNames, NAMES, getCurrentInfo } from "../../const"

export const useLanguage = (): LanguageContextType & {
  t: (typeof TRANSLATIONS)[keyof typeof TRANSLATIONS]
  names: (typeof NAMES)[keyof typeof NAMES]
  groomInfo: Array<{ relation: string; name: string; phone: string; account: string }>
  brideInfo: Array<{ relation: string; name: string; phone: string; account: string }>
} => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }

  const { GROOM_INFO, BRIDE_INFO } = getCurrentInfo(context.language)

  return {
    ...context,
    t: TRANSLATIONS[context.language],
    names: getCurrentNames(context.language),
    groomInfo: GROOM_INFO,
    brideInfo: BRIDE_INFO,
  }
}
