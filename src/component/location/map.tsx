import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import { useLanguage } from "../store/useLanguage"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  KMAP_PLACE_ID,
  LOCATION,
  NMAP_PLACE_ID,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

export const Map = () => {
  return NAVER_MAP_CLIENT_ID ? <NaverMap /> : <div className="map-placeholder">Map is not available</div>
}

const NaverMap = () => {
  const naver = useNaver()
  const kakao = useKakao()
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  const checkDevice = () => {
    const userAgent = window.navigator.userAgent
    if (userAgent.match(/(iPhone|iPod|iPad)/)) {
      return "ios"
    } else if (userAgent.match(/(Android)/)) {
      return "android"
    } else {
      return "other"
    }
  }

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: WEDDING_HALL_POSITION,
        zoom: 17,
      })

      new naver.maps.Marker({ position: WEDDING_HALL_POSITION, map })

      return () => {
        map.destroy()
      }
    }
  }, [naver])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> {t.map.lock_message.split('\n').map((line, index) => (
                  <div key={index}>
                    {line}
                    {index < t.map.lock_message.split('\n').length - 1 && <br />}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
        <div className="map-inner" ref={ref}></div>
      </div>
      <div className="navigation">
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                break
              default:
                window.open(
                  `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={nmapIcon} alt="naver-map-icon" />
          {t.map.naver_map}
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android":
                if (kakao)
                  kakao.Navi.start({
                    name: LOCATION,
                    x: WEDDING_HALL_POSITION[0],
                    y: WEDDING_HALL_POSITION[1],
                    coordType: "wgs84",
                  })
                break
              default:
                window.open(
                  `https://map.kakao.com/link/map/${KMAP_PLACE_ID}`,
                  "_blank",
                )
                break
            }
          }}
        >
          <img src={knaviIcon} alt="kakao-navi-icon" />
          {t.map.kakao_navi}
        </button>
        <button
          onClick={() => {
            switch (checkDevice()) {
              case "ios":
              case "android": {
                const params = new URLSearchParams({
                  goalx: WEDDING_HALL_POSITION[0].toString(),
                  goaly: WEDDING_HALL_POSITION[1].toString(),
                  goalName: LOCATION,
                })
                window.open(`tmap://route?${params.toString()}`, "_self")
                break
              }
              default: {
                alert(t.map.mobile_only_alert)
                break
              }
            }
          }}
        >
          <img src={tmapIcon} alt="t-map-icon" />
          {t.map.tmap}
        </button>
      </div>
    </>
  )
}
