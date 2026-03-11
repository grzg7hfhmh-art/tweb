import { useState } from "react"
import "./AttendanceModal.scss"
import { useLanguage } from "../store/useLanguage"
import { ATTENDANCE_API_URL } from "../../env"

export const AttendanceModal = () => {
  const { t } = useLanguage()
  const [side, setSide] = useState<"groom" | "bride" | null>(null)
  const [name, setName] = useState("")
  const [count, setCount] = useState("1")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = async () => {
    if (!side || !name.trim()) {
      alert(t.attendance.form.enter_name_and_side_alert)
      return
    }
    const parsedCount = Number(count)
    if (Number.isNaN(parsedCount)) {
      alert(t.attendance.form.enter_count_alert)
      return
    }
    if (parsedCount < 1) {
      alert(t.attendance.form.count_min_alert.replace("{min}", "1"))
      return
    }

    setLoading(true)

    try {
      if (!ATTENDANCE_API_URL) {
        throw new Error("ATTENDANCE_API_URL is not set")
      }

      const body = new URLSearchParams({
        side,
        name: name.trim(),
        count: String(parsedCount),
      })

      const response = await fetch(ATTENDANCE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      })

      if (!response.ok) {
        throw new Error(`Attendance submission failed: ${response.status}`)
      }

      setSuccess(true)
    } catch (e) {
      alert(t.attendance.form.send_failed_alert)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="attendance-modal">
      <h2 className="title">{t.attendance.modal_title}</h2>

      <div className="side-buttons">
        <button
          className={side === "groom" ? "active" : ""}
          onClick={() => setSide("groom")}
        >
          {t.attendance.form.groom}
        </button>
        <button
          className={side === "bride" ? "active" : ""}
          onClick={() => setSide("bride")}
        >
          {t.attendance.form.bride}
        </button>
      </div>

      <input
        className="name-input"
        placeholder={t.attendance.form.name_placeholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="count-input-group">
        <label className="count-label">{t.attendance.form.count_label}</label>
        <input
          className="count-input"
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <button className="submit-button" onClick={submit} disabled={loading}>
        {loading ? t.attendance.submit : t.attendance.form.submit_button}
      </button>

      {success && <p className="success">{t.common.success}</p>}
    </div>
  )
}
