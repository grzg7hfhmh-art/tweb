import { Fragment } from "react/jsx-runtime"
import {
  BRIDE_FULLNAME,
  BRIDE_INFO,
  BRIDE_FATHER,
  BRIDE_MOTHER,
  GROOM_FULLNAME,
  GROOM_INFO,
  GROOM_FATHER,
  GROOM_MOTHER,
  GROOM_TITLE,
  BRIDE_TITLE,
} from "../../const"
import { useModal } from "../modal"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useLanguage } from "../store/useLanguage"
import PhoneIcon from "../../icons/phone-flip-icon.svg?react"
import EnvelopeIcon from "../../icons/envelope-icon.svg?react"

export const Invitation = () => {
  const { t, names, groomInfo, brideInfo } = useLanguage()
  const { openModal, closeModal } = useModal()
  
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

      <Button
        onClick={() => {
          openModal({
            className: "contact-modal",
            closeOnClickBackground: true,
            header: (
              <div className="title-group">
                <div className="title">{t.invitation_contact.title}</div>
                <div className="subtitle">
                  {t.invitation_contact.subtitle}
                </div>
              </div>
            ),
            content: (
              <>
                <div className="contact-info">
                  {groomInfo.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() => {
                              window.open(`tel:${phone}`, "_self")
                            }}
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() => {
                              window.open(`sms:${phone}`, "_self")
                            }}
                          />
                        </div>
                      </Fragment>
                    ),
                  )}
                </div>
                <div className="contact-info">
                  {brideInfo.filter(({ phone }) => !!phone).map(
                    ({ relation, name, phone }) => (
                      <Fragment key={relation}>
                        <div className="relation">{relation}</div>
                        <div>{name}</div>
                        <div>
                          <PhoneIcon
                            className="flip icon"
                            onClick={() => {
                              window.open(`tel:${phone}`, "_self")
                            }}
                          />
                          <EnvelopeIcon
                            className="icon"
                            onClick={() => {
                              window.open(`sms:${phone}`, "_self")
                            }}
                          />
                        </div>
                      </Fragment>
                    ),
                  )}
                </div>
              </>
            ),
            footer: (
              <Button
                buttonStyle="style2"
                className="bg-light-grey-color text-dark-color"
                onClick={closeModal}
              >
                {t.common.close}
              </Button>
            ),
          })
        }}
      >
        {t.invitation_contact.button_text}
      </Button>
    </LazyDiv>
  )
}
