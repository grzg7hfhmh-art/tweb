import "./Attendance.scss"
import { useModal } from "../modal"
import { useLanguage } from "../store/useLanguage"
import { AttendanceModal } from "./AttendanceModal"

export function AttendanceButton() {
  const { openModal } = useModal()
  const { t } = useLanguage()

  return (
    <div className="attendance-wrapper">
      <div className="attendance-card">
        <h2 className="attendance-title">{t.attendance_button.title}</h2>
        <p className="attendance-desc">
          {t.attendance_button.description}
        </p>

        <button
          className="attendance-button"
          onClick={() =>
            openModal({
              content: <AttendanceModal />,
              closeOnClickBackground: true,
            })
          }
        >
          {t.attendance_button.button_text}
        </button>
        <br />
        <br />
      </div>
    </div>
  )
}
