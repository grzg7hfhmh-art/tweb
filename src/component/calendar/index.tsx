import { useEffect, useMemo, useState } from "react"
import {
  BRIDE_FIRSTNAME,
  GROOM_FIRSTNAME,
  HOLIDAYS,
  WEDDING_DATE,
} from "../../const"
import { LazyDiv } from "../lazyDiv"
import { useLanguage } from "../store/useLanguage"
import dayjs from "dayjs"

const firstDayOfWeek = WEDDING_DATE.startOf("month").day()
const daysInMonth = WEDDING_DATE.daysInMonth()

export const Calendar = () => {
  const { t, names, language } = useLanguage()
  const [tsDiff, setTsDiff] = useState(WEDDING_DATE.diff())

  const dayDiff = useMemo(() => {
    const dayOffset = WEDDING_DATE.diff(WEDDING_DATE.startOf("day"))
    return Math.ceil((tsDiff - dayOffset) / 1000 / 60 / 60 / 24)
  }, [tsDiff])

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = WEDDING_DATE.diff()

      setTsDiff(diff)
    }, 1000)

    return () => clearInterval(interval)
  })

  const diffs = useMemo(() => {
    const tsDiff_ = Math.abs(tsDiff)
    const seconds = Math.floor((tsDiff_ % 60000) / 1000)
    const minutes = Math.floor((tsDiff_ % 3600000) / 60000)
    const hours = Math.floor((tsDiff_ % 86400000) / 3600000)
    const days = Math.floor(tsDiff_ / 86400000)
    const isAfter = tsDiff < 0

    return { days, hours, minutes, seconds, isAfter }
  }, [tsDiff])

  return (
    <LazyDiv className="card calendar">
      <h2 className="english">{t.calendar.title}</h2>
      <div className="break" />
      {dayjs(WEDDING_DATE).locale(language === "ja" ? "ja" : "ko").format(t.calendar.date_format)}
      <div className="calendar-wrapper">
        {t.calendar.day_names.map((day, index) => (
          <div key={day} className={`head ${index === 0 ? "holiday" : ""}`}>
            <span>{day}</span>
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1

          const classes = []

          const isSunday = (i + firstDayOfWeek) % 7 === 0

          if (isSunday || HOLIDAYS.includes(date)) {
            classes.push("holiday")
          }

          const isWeddingDate = date === WEDDING_DATE.date()

          if (isWeddingDate) {
            classes.push("wedding-date")
          }

          return (
            <div
              key={i}
              className={classes.length ? classes.join(" ") : undefined}
            >
              <span>{date}</span>
              {isWeddingDate && <div className="heart" />}
            </div>
          )
        })}
      </div>
      <div className="countdown-wrapper">
        <div className="countdown">
          <div className="unit">{t.calendar.countdown_units[0]}</div>
          <div />
          <div className="unit">{t.calendar.countdown_units[1]}</div>
          <div />
          <div className="unit">{t.calendar.countdown_units[2]}</div>
          <div />
          <div className="unit">{t.calendar.countdown_units[3]}</div>
          <div className="count">{diffs.days}</div>
          <span>:</span>
          <div className="count">{diffs.hours}</div>
          <span>:</span>
          <div className="count">{diffs.minutes}</div>
          <span>:</span>
          <div className="count">{diffs.seconds}</div>
        </div>
        <div className="message">
          {dayDiff > 0 ? (
            <>
              {t.calendar.wedding_message
                .replace('{groom}', names.groom.firstName)
                .replace('{bride}', names.bride.firstName)
                .replace('{days}', dayDiff.toString())}
            </>
          ) : dayDiff === 0 ? (
            <>{t.calendar.today_message}</>
          ) : (
            <>
              {t.calendar.past_message.replace('{days}', (-dayDiff).toString())}
            </>
          )}
        </div>
      </div>
    </LazyDiv>
  )
}
