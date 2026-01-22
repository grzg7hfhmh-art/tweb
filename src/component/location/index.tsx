import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"
import { useLanguage } from "../store/useLanguage"

export const Location = () => {
  const { t } = useLanguage()
  
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">{t.location.title}</h2>
        <div className="addr">
          {t.location.name}
          <div className="detail">{t.location.address}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">{t.location.public_transport.title}</div>
          <div />
          <div className="content">
            <div>{t.location.public_transport.bus_terminal}</div>
            <div>{t.location.public_transport.express_bus}</div>
            <div>{t.location.public_transport.city_bus}</div>
            <div>{t.location.public_transport.train}</div>
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">{t.location.car.title}</div>
          <div />
          <div className="content">
            <div>{t.location.car.navigation}</div>
            <div>{t.location.car.parking}</div>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
