import {
  dayjs,
  LOCATION,
  WEDDING_DATE,
  WEDDING_DATE_FORMAT,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useLanguage } from "../store/useLanguage"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { SERVER_URL } from "../../env"

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  const { openModal, closeModal } = useModal()
  const { t, names } = useLanguage()

  const initialized = useRef(false)

  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    openModal({
      className: "attendance-info-modal",
      header: <div className="title">{t.attendance.guide_title}</div>,
      content: (
        <>
          <div className="info-message">
            {t.attendance.guide_message.split('\n').map((line, index) => (
              <div key={index}>
                {line}
                {index < t.attendance.guide_message.split('\n').length - 1 && <br />}
              </div>
            ))}
            <div className="break" />
            {t.attendance.guide_message2.split('\n').map((line, index) => (
              <div key={index}>
                {line}
                {index < t.attendance.guide_message2.split('\n').length - 1 && <br />}
              </div>
            ))}
          </div>
          <div className="wedding-info">
            <HeartIcon /> {t.attendance.wedding_info.replace('{groom}', names.groom.fullName).replace('{bride}', names.bride.fullName)}
            <br />
            <CalendarIcon /> {WEDDING_DATE.format(WEDDING_DATE_FORMAT)}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </>
      ),
      footer: (
        <>
          <Button
            buttonStyle="style2"
            onClick={() => {
              closeModal()
              openModal(attendanceModalInfo)
            }}
          >
            {t.attendance.submit_button}
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={closeModal}
          >
            {t.common.close}
          </Button>
        </>
      ),
    })
  }, [openModal, closeModal, t])

  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <div className="info-card">
      <div className="label">{t.attendance.title}</div>
      <div className="content">
        {t.attendance.info_content.split('\n').map((line, index) => (
          <div key={index}>
            {line}
            {index < t.attendance.info_content.split('\n').length - 1 && <br />}
          </div>
        ))}
      </div>

      <div className="break" />

      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal(attendanceModalInfo)
        }}
      >
        {t.attendance.submit_button}
      </Button>
    </div>
  )
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  const { t } = useLanguage()
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>
  const [loading, setLoading] = useState(false)

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
          const side = inputRef.current.side.groom.checked
            ? "groom"
            : inputRef.current.side.bride
              ? "bride"
              : null
          const name = inputRef.current.name.value
          const meal = inputRef.current.meal.yes.checked
            ? "yes"
            : inputRef.current.meal.undecided.checked
              ? "undecided"
              : inputRef.current.meal.no.checked
                ? "no"
                : null
          const count = Number(inputRef.current.count.value)

          if (!side) {
            alert(t.attendance.form.select_side_alert)
            return
          }

          if (!name) {
            alert(t.attendance.form.enter_name_alert)
            return
          }
          if (name.length > RULES.name.maxLength) {
            alert(t.attendance.form.name_too_long_alert.replace('{max}', RULES.name.maxLength.toString()))
            return
          }

          if (!meal) {
            alert(t.attendance.form.select_meal_alert)
            return
          }

          if (isNaN(count)) {
            alert(t.attendance.form.enter_count_alert)
            return
          }
          if (count < RULES.count.min) {
            alert(t.attendance.form.count_min_alert.replace('{min}', RULES.count.min.toString()))
            return
          }

          const res = await fetch(`${SERVER_URL}/attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ side, name, meal, count }),
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }

          alert(t.attendance.success)
          closeModal()
        } catch {
          alert(t.attendance.submit_failed)
        } finally {
          setLoading(false)
        }
      }}
    >
      <div className="input-group">
        <div className="label">{t.attendance.form.side_label}</div>
        <div className="select-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) => {
                inputRef.current.side.groom = ref as HTMLInputElement
              }}
            />
            <span>{t.attendance.form.groom}</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) => {
                inputRef.current.side.bride = ref as HTMLInputElement
              }}
            />
            <span>{t.attendance.form.bride}</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">{t.attendance.form.name_label}</div>
        <div className="input">
          <input
            disabled={loading}
            type="text"
            placeholder={t.attendance.form.name_placeholder}
            maxLength={RULES.name.maxLength}
            ref={(ref) => {
              inputRef.current.name = ref as HTMLInputElement
            }}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">{t.attendance.form.meal_label}</div>
        <div className="radio-input">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) => {
                inputRef.current.meal.yes = ref as HTMLInputElement
              }}
            />
            <span>{t.attendance.form.meal_yes}</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) => {
                inputRef.current.meal.undecided = ref as HTMLInputElement
              }}
            />
            <span>{t.attendance.form.meal_undecided}</span>
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="meal"
              value="no"
              ref={(ref) => {
                inputRef.current.meal.no = ref as HTMLInputElement
              }}
            />
            <span>{t.attendance.form.meal_no}</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">{t.attendance.form.count_label}</div>
        <div>
          <input
            disabled={loading}
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => {
              inputRef.current.count = ref as HTMLInputElement
            }}
          />
          {t.attendance.form.count_unit}
        </div>
      </div>
    </form>
  )
}
const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  const { t } = useLanguage()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        {t.attendance.modal_footer.submit}
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        {t.attendance.modal_footer.close}
      </Button>
    </>
  )
}

const AttendanceModalHeader = () => {
  const { t } = useLanguage()
  return <div className="title">{t.attendance.modal_title}</div>
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <AttendanceModalHeader />,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}
