import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  WEDDING_DATE,
} from "../../const"
import { COVER_IMAGE } from "../../images"
import { LazyDiv } from "../lazyDiv"
import { useLanguage } from "../store/useLanguage"
import dayjs from "dayjs"

export const Cover = () => {
  const { t, names, language } = useLanguage()
  return (
    <LazyDiv className="card cover">
      <div className="wedding-date">
        {WEDDING_DATE.format("YYYY")}
        <div className="divider" />
        {WEDDING_DATE.format("MM")}
        <div className="divider" />
        {WEDDING_DATE.format("DD")}
      </div>
      <div className="wedding-day-of-week">
        {t.cover.day_of_week[WEDDING_DATE.day()]}
      </div>
      <div className="image-wrapper">
        <img src={COVER_IMAGE} alt="sample" />
      </div>
      <div className="subtitle">{t.cover.subtitle}</div>
      <div className="names">
        {names.groom.fullName}
        <div className="divider" />
        {names.bride.fullName}
      </div>
      <div className="info">{dayjs(WEDDING_DATE).locale(language === "ja" ? "ja" : "ko").format(t.calendar.date_format)}</div>
      <div className="info">{t.location.name}</div>
    </LazyDiv>
  )
}
