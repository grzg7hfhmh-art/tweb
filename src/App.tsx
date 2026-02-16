import { Cover } from "./component/cover"
import { Location } from "./component/location"
import "./App.scss"
import { BGEffect } from "./component/bgEffect"
import { Invitation } from "./component/invitation"
import { Calendar } from "./component/calendar"
import { Gallery } from "./component/gallery" 
import { Information, Information1, Information2, AttendanceInfo } from "./component/information"
import { LazyDiv } from "./component/lazyDiv"
import { ShareButton } from "./component/shareButton"
import { STATIC_ONLY } from "./env"
import { LanguageSelector } from "./component/languageSelector"
import { AttendanceButton } from "./component/attendance/AttendanceButton"
import { IntroPoster } from "./component/introPoster"
import { useState } from "react"





function App() {
  const [introTransitioning, setIntroTransitioning] = useState(false)

  return (
    <div className={`background${introTransitioning ? " intro-reveal" : ""}`}>
      <IntroPoster
        onDismissStart={() => {
          setIntroTransitioning(true)
          window.setTimeout(() => {
            setIntroTransitioning(false)
          }, 3000)
        }}
      />
      {/* <BGEffect /> */}
      <LanguageSelector />
      <div className="card-view">
        <LazyDiv className="card-group">
          {/* 표지 */}
          <Cover />

          {/* 모시는 글 */}
          <Invitation />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 결혼식 날짜 (달력) */}
          <Calendar />

          {/* 겔러리 */}
          <Gallery />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 오시는길 */}
          <Location />
        </LazyDiv>

        <LazyDiv className="card-group">
          {/* 식사 안내 */}
          <Information1 />

          {/* 마음 전하기 */}
          <Information2 />
        </LazyDiv>

        <LazyDiv className="card-group">
            <AttendanceInfo />
        </LazyDiv>

        <LazyDiv className="card-group">
          <AttendanceButton />
        </LazyDiv>

      </div>
    </div>
  )
}

export default App
