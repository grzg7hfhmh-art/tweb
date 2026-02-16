import { STATIC_ONLY } from "../../env"
import { Button } from "../button"
import { LazyDiv } from "../lazyDiv"
import { useModal } from "../modal"
import { useLanguage } from "../store/useLanguage"
import { AttendanceInfo } from "./attendance"

export { AttendanceInfo }

export const Information1 = () => {
  const { t, names } = useLanguage()
  return (
    <LazyDiv className="card information">
      <div className="info-card">
        <div className="label">{t.information.meal_info.title}</div>
        <div className="content">
          {t.information.meal_info.content.split('\n').map((line, index) => (
            <div key={index}>
              {line}
              {index < t.information.meal_info.content.split('\n').length - 1 && <br />}
            </div>
          ))}
        </div>
      </div>
    </LazyDiv>
  )
}

export const Information2 = () => {
  const { openModal, closeModal } = useModal()
  const { t, groomInfo } = useLanguage()

  return (
    <LazyDiv className="card information">
      <div className="info-card">
        <div className="label">{t.information.title}</div>
        <div className="content">
          {t.information.donation_info.content.split('\n').map((line, index) => (
            <div key={index}>
              {line}
              {index < t.information.donation_info.content.split('\n').length - 1 && <br />}
            </div>
          ))}
        </div>

        <div className="break" />

        <Button
          style={{ width: "100%" }}
          onClick={() => {
            openModal({
              className: "donation-modal",
              closeOnClickBackground: true,
              header: <div className="title">{t.information.donation_info.groom_accounts}</div>,
              content: (
                <>
                  {groomInfo.filter(({ account }) => !!account).map(
                    ({ relation, name, account }) => (
                      <div className="account-info" key={relation}>
                        <div>
                          <div className="name">
                            <span className="relation">{relation}</span> {name}
                          </div>
                          <div>{account}</div>
                        </div>
                        <Button
                          className="copy-button"
                          onClick={async () => {
                            if (account) {
                              try {
                                navigator.clipboard.writeText(account)
                                alert(account + "\n" + t.information.donation_info.copied_alert)
                              } catch {
                                alert(t.information.donation_info.copy_failed_alert)
                              }
                            }
                          }}
                        >
                          {t.information.donation_info.copy_button}
                        </Button>
                      </div>
                    ),
                  )}
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
          {t.information.donation_info.groom_accounts_button}
        </Button>
      </div>
    </LazyDiv>
  )
}

export const Information = () => {
  if (STATIC_ONLY) {
    return (
      <>
        <LazyDiv className="card information">
          <Information1 />
        </LazyDiv>
        <LazyDiv className="card information">
          <Information2 />
        </LazyDiv>
      </>
    )
  }

  return (
    <>
      <LazyDiv className="card-group">
        <LazyDiv className="card information">
          <Information1 />
        </LazyDiv>
        <LazyDiv className="card information">
          <Information2 />
        </LazyDiv>
      </LazyDiv>
      <AttendanceInfo />
    </>
  )
}
