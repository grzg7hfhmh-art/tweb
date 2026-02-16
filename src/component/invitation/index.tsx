import { LazyDiv } from "../lazyDiv"
import { useLanguage } from "../store/useLanguage"

export const Invitation = () => {
  const { t, names } = useLanguage()
  
  return (
    <LazyDiv className="card invitation">
      <h2 className="english">{t.invitation.title}</h2>

      <div className="break" />

      {t.invitation.content.map((line, idx) => (
        <div key={idx} className={line === "" ? "break" : "content"}>
          {line}
        </div>
      ))}

      <div className="break" />

      <div className="name">
        {names.groom.father} · {names.groom.mother}
        <span className="relation">
          {t.invitation_relations.groom_title}
        </span>{" "}
        {names.groom.fullName}
      </div>
      <div className="name">
        {names.bride.father} · {names.bride.mother}
        <span className="relation">
          {t.invitation_relations.bride_title}
        </span>{" "}
        <br />{names.bride.fullName}
      </div>

      <div className="break" />
    </LazyDiv>
  )
}
