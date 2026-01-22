import { useState } from "react"
import "./AttendanceModal.scss"
import { useModal } from "../modal"
import { useLanguage } from "../store/useLanguage"

export const AttendanceModal = () => {
  const { closeModal } = useModal()
  const { t } = useLanguage()
  const [side, setSide] = useState<"groom" | "bride" | null>(null)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = async () => {
    if (!side || !name.trim()) {
      alert(t.attendance.form.enter_name_and_side_alert)
      return
    }

    setLoading(true)

    try {
      const body = new URLSearchParams({
        side,
        name: name.trim(),
      })

      await fetch(import.meta.env.VITE_ATTENDANCE_API_URL, {
        method: "POST",
        body,
      })

      setSuccess(true)
      setTimeout(() => {
        closeModal()
      }, 1200)
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

      <button className="submit-button" onClick={submit} disabled={loading}>
        {loading ? t.attendance.submit : t.attendance.form.submit_button}
      </button>

      {success && <p className="success">{t.common.success}</p>}
    </div>
  )
}
