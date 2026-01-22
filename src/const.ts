import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"
import "dayjs/locale/ja"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-06-21 12:30", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`

// 예식 당월 휴무일. 켈린더에 표시하기 위함.
// 예: 예식일 8월 -> 8월 15일 광복절
export const HOLIDAYS = [15]

export const LOCATION = "진주 동방호텔 예식장 3층 그랜드홀"
export const LOCATION_ADDRESS = "경남 진주시 논개길 103"

// 카카오톡 공유 시 위치 정보로 사용할 주소.
// LOCATION 과 동일하게 설정해도 무방하나, 필요에 따라 좀 더 상세히 작성 가능.
export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

// 네이버 지도 및 카카오 네비게이션에 사용할 좌표. [경도, 위도] 형식.
export const WEDDING_HALL_POSITION = [128.0925736, 35.190245]

// 네이버 지도의 웨딩홀 장소 ID
// 네이버 지도 웹페이지에서 웨딩홀 검색 후 URL에서 확인 가능.
// 예: https://map.naver.com/p/entry/place/13321741 -> 13321741
export const NMAP_PLACE_ID = 11658881

// 카카오 지도의 웨딩홀 장소 ID
// 카카오 지도 웹페이지에서 웨딩홀 검색 후 해당 장소에서 상세보기 클릭 시 URL에서 확인 가능.
// 예: https://place.map.kakao.com/8634826 -> 8634826
export const KMAP_PLACE_ID = 7841298

// 이름 정보 (언어별)
export const NAMES = {
  ko: {
    groom: {
      fullName: "양성준",
      firstName: "성준",
      title: "장남",
      father: "양광석",
      mother: "조정희"
    },
    bride: {
      fullName: "카바야마 사리",
      firstName: "사리",
      title: "차녀",
      father: "카바야마 나리토",
      mother: "카바야마 나호코"
    }
  },
  ja: {
    groom: {
      fullName: "梁 成俊",
      firstName: "成俊",
      title: "長男",
      father: "梁 光錫",
      mother: "趙 情希"
    },
    bride: {
      fullName: "樺山 紗梨",
      firstName: "紗梨",
      title: "次女",
      father: "樺山 成人",
      mother: "樺山 菜穂子"
    }
  }
}

// 현재 언어에 따른 이름 정보 내보내기
export const getCurrentNames = (language: "ko" | "ja") => NAMES[language]

// 언어별 정보 생성 함수
export const getCurrentInfo = (language: "ko" | "ja") => {
  const names = NAMES[language]
  const relations = language === "ko" ? {
    groom: "신랑",
    groom_father: "신랑 아버지",
    groom_mother: "신랑 어머니",
    bride: "신부",
    bride_father: "신부 아버지",
    bride_mother: "신부 어머니"
  } : {
    groom: "新郎",
    groom_father: "新郎の父",
    groom_mother: "新郎の母",
    bride: "新婦",
    bride_father: "新婦の父",
    bride_mother: "新婦の母"
  }

  return {
    GROOM_INFO: [
      {
        relation: relations.groom,
        name: names.groom.fullName,
        phone: "010-0000-0000",
        account: "하나은행 00000000000000",
      },
      {
        relation: relations.groom_father,
        name: names.groom.father,
        phone: "010-0000-0000",
        account: "신한은행 000000000000",
      },
      {
        relation: relations.groom_mother,
        name: names.groom.mother,
        phone: "010-0000-0000",
        account: "국민은행 000000000000",
      },
    ],
    BRIDE_INFO: [
      {
        relation: relations.bride,
        name: names.bride.fullName,
        phone: "010-0000-0000",
        account: "우리은행 0000000000000",
      },
      {
        relation: relations.bride_father,
        name: names.bride.father,
        phone: "010-0000-0000",
        account: "하나은행 00000000000",
      },
      {
        relation: relations.bride_mother,
        name: names.bride.mother,
        phone: "010-0000-0000",
        account: "하나은행 00000000000000",
      },
    ]
  }
}

// 하위 호환성을 위한 기본 이름 (한국어)
export const GROOM_FULLNAME = NAMES.ko.groom.fullName
export const GROOM_FIRSTNAME = NAMES.ko.groom.firstName
export const GROOM_TITLE = NAMES.ko.groom.title
export const GROOM_FATHER = NAMES.ko.groom.father
export const GROOM_MOTHER = NAMES.ko.groom.mother
export const { GROOM_INFO, BRIDE_INFO } = getCurrentInfo("ko")

export const BRIDE_FULLNAME = NAMES.ko.bride.fullName
export const BRIDE_FIRSTNAME = NAMES.ko.bride.firstName
export const BRIDE_TITLE = NAMES.ko.bride.title
export const BRIDE_FATHER = NAMES.ko.bride.father
export const BRIDE_MOTHER = NAMES.ko.bride.mother

export const TRANSLATIONS = {
  ko: {
    // 표지
    cover: {
      title: "결혼합니다",
      subtitle: "Save the date",
      day_of_week: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
    },
    // 초대말
    invitation: {
      title: "Invitation",
      content: [
        "여러분께",
        "",
        "항상 변함없는 따뜻한 마음으로 저희를 격려해주셨던",
        "모든 분들께 이 기쁜 소식을 알려드립니다.",
        "",
        "저희는 앞으로 부부가 되어",
        "더욱 깊은 사랑과 신뢰로 함께하겠습니다.",
        "",
        "바쁘신 와중이시겠지만",
        "저희의 인생에서 가장 소중한 이 날",
        "축하해 주신다면 더없이 감사하겠습니다.",
      ],
    },
    // 캘린더
    calendar: {
      title: "The Wedding Day",
      date_format: `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`,
      day_names: ["일", "월", "화", "수", "목", "금", "토"],
      countdown_units: ["일", "시", "분", "초"],
      wedding_message: "{groom} & {bride}의 결혼식이 {days}일 남았습니다.",
      today_message: "오늘입니다.",
      past_message: "{days}일 지났습니다."
    },
    // 갤러리
    gallery2: {
      title: "Gallery",
    },
    // 오시는 길
    location: {
      title: "Access",
      name: "진주 동방호텔 예식장 3층 그랜드홀",
      address: "경남 진주시 논개길 103",
      how_to_arrive: "오시는 길",
      naver_map: "네이버 지도",
      kakao_map: "카카오 지도",
      kakao_navi: "카카오 네비",
      public_transport: {
        title: "대중교통",
        bus_terminal: "진주시외버스터미널: 도보 약 5~10분 거리",
        express_bus: "진주고속버스터미널: 택시로 약 5분 거리",
        city_bus: "시내버스: '동방호텔' 또는 '시외버스터미널' 정류장 하차",
        train: "기차(KTX) 이용 시: 진주역에서 택시로 약 15~20분 거리"
      },
      car: {
        title: "자가용",
        navigation: "네비게이션에 '동방호텔' 또는 '진주 동방호텔' 검색",
        parking: "호텔 내 전용 주차장 및 인근 주차장 이용 가능"
      }
    },
    // 마음 전하기
    information: {
      title: "마음 전하기",
      attendance: "참석 여부",
      donation: "축의금",
      meal_info: {
        title: "식사 안내",
        content: "식사시간: 12시 30분 ~ 14시 30분\n장소: 2층 연회장"
      },
      donation_info: {
        content: "참석이 어려워 직접 축하해주지 못하는\n분들을 위해 계좌번호를 기재하였습니다.\n넓은 마음으로 양해 부탁드립니다.",
        groom_accounts: "신랑측 계좌번호",
        bride_accounts: "신부측 계좌번호",
        groom_accounts_button: "신랑측 계좌번호 보기",
        bride_accounts_button: "신부측 계좌번호 보기",
        copy_button: "복사하기",
        copied_alert: "복사되었습니다.",
        copy_failed_alert: "복사에 실패했습니다."
      }
    },
    // 참석 의사 전달
    attendance: {
      title: "참석 의사 전달",
      guide_title: "참석 의사 전달 안내",
      guide_message: "축하의 마음으로 참석해주시는\n모든 분들을 귀하게 모실 수 있도록\n참석 및 식사 여부를 미리 여쭙고자 합니다.",
      guide_message2: "부담없이 알려주시면\n정성껏 준비하겠습니다.",
      wedding_info: "신랑 {groom} & 신부 {bride}",
      info_content: "신랑, 신부에게 참석의사를\n미리 전달할 수 있어요.",
      submit_button: "참석 의사 전달하기",
      modal_title: "참석 의사 전달하기",
      submit: "전송중...",
      success: "참석 의사가 성공적으로 전달되었습니다.",
      submit_failed: "참석 의사 전달에 실패했습니다.",
      // 폼 필드
      form: {
        side_label: "구분",
        name_label: "성함",
        meal_label: "식사",
        count_label: "참석 인원 (본인 포함)",
        name_placeholder: "참석자 성함을 입력해주세요.",
        count_unit: "명",
        submit_button: "참석 의사 전달",
        // 옵션들
        groom: "신랑",
        bride: "신부",
        meal_yes: "예정",
        meal_undecided: "미정",
        meal_no: "불참",
        // 유효성 검사 메시지
        select_side_alert: "신랑 또는 신부를 선택해주세요.",
        enter_name_alert: "성함을 입력해주세요.",
        name_too_long_alert: "성함을 {max}자 이하로 입력해주세요.",
        select_meal_alert: "식사 여부를 선택해주세요.",
        enter_count_alert: "참석 인원을 입력해주세요.",
        count_min_alert: "참석 인원을 {min}명 이상으로 입력해주세요.",
        enter_name_and_side_alert: "구분과 성함을 입력해주세요",
        send_failed_alert: "전송에 실패했습니다. 잠시 후 다시 시도해주세요."
      },
      modal_footer: {
        submit: "전달하기",
        close: "닫기"
      }
    },
    // 방명록
    guestbook: {
      title: "방명록",
      placeholder: "축하의 말씀을 남겨주세요",
      submit: "등록",
    },
    // 버튼
    button: {
      call: "전화",
      message: "문자",
      copy: "복사",
    },
    // 지도
    map: {
      lock_message: "자물쇠 버튼을 눌러\n터치 잠금 해제 후 확대 및 이동해 주세요.",
      mobile_only_alert: "모바일에서 확인하실 수 있습니다.",
      naver_map: "네이버 지도",
      kakao_navi: "카카오 내비",
      tmap: "티맵"
    },
    // 참석 버튼
    attendance_button: {
      title: "참석 여부 회신",
      description: "참석 여부를 알려주시면 준비에 도움이 됩니다.",
      button_text: "회신하기"
    },
    // 초대장 연락처
    invitation_contact: {
      title: "축하 인사 전하기",
      subtitle: "전화, 문자메세지로 축하 인사를 전해보세요.",
      button_text: "연락하기"
    },
    // 갤러리
    gallery: {
      view_all_photos: "사진 전체보기"
    },
    // 초대장 관계
    invitation_relations: {
      groom_title: "의 장남",
      bride_title: "의 차녀"
    },
    // 일반
    common: {
      close: "닫기",
      success: "정상적으로 전송되었습니다"
    }
  },
  ja: {
    // 表紙
    cover: {
      title: "結婚します",
      subtitle: "Save the date",
      day_of_week: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
    },
    // 招待文
    invitation: {
      title: "Invitation",
      content: [
        "皆様におかれましては",
        "ますますご清祥のこととお慶び申し上げます",
        "",
        "このたび私たちは結婚をすることになりました",
        "つきましては、日頃お世話になっております皆様に",
        "挙式にお立会いいただきたく存じます",
        "",
        "ご多用中誠に恐縮ではございますが",
        "ぜひご出席をいただきたくご案内申し上げます",
      ],
    },
    // カレンダー
    calendar: {
      title: "The wedding day",
      date_format: `YYYY年 M月 D日 dddd A h時${WEDDING_DATE.minute() === 0 ? "" : " m分"}`,
      day_names: ["日", "月", "火", "水", "木", "金", "土"],
      countdown_units: ["日", "時", "分", "秒"],
      wedding_message: "{groom} & {bride}の結婚式が{days}日残っています。",
      today_message: "今日です。",
      past_message: "{days}日経ちました。"
    },
    // 交通案内
    location: {
      title: "Access",
      name: "晋州東方ホテル結婚式場 3階 グランドホール",
      address: "慶尚南道晋州市論介ギル103",
      how_to_arrive: "交通案内",
      naver_map: "ネイバー地図",
      kakao_map: "カカオ地図",
      kakao_navi: "カカオナビゲーション",
      public_transport: {
        title: "公共交通機関",
        bus_terminal: "晋州市外バスターミナル: 徒歩約5~10分",
        express_bus: "晋州高速バスターミナル: タクシーで約5分",
        city_bus: "市内バス: '東方ホテル'または'市外バスターミナル'停留所下車",
        train: "KTXご利用の場合: 晋州駅からタクシーで約15~20分"
      },
      car: {
        title: "自家用車",
        navigation: "ナビゲーションで'東方ホテル'または'晋州東方ホテル'を検索",
        parking: "ホテル内専用駐車場および近隣駐車場をご利用いただけます"
      }
    },
    // 祝意
    information: {
      title: "祝意",
      attendance: "出席確認",
      donation: "祝儀",
      meal_info: {
        title: "食事案内",
        content: "食事時間: 13時00分 ~ 14時30分\n場所: 2階 宴会場"
      },
      donation_info: {
        content: "出席が難しい直接お祝いしていただけない\n方々のために口座番号を記載いたしました。\n広いお心でご了承くださいますようお願い申し上げます。",
        groom_accounts: "新郎側口座番号",
        bride_accounts: "新婦側口座番号",
        groom_accounts_button: "新郎側口座番号を見る",
        bride_accounts_button: "新婦側口座番号を見る",
        copy_button: "コピー",
        copied_alert: "コピーされました。",
        copy_failed_alert: "コピーに失敗しました。"
      }
    },
    // 出席確認
    attendance: {
      title: "出席確認",
      guide_title: "出席確認のご案内",
      guide_message: "お祝いの気持ちでご出席くださる\n皆様を大切にお迎えできるよう\n出席および食事の有無を事前にうかがいたく存じます。",
      guide_message2: "お気軽にお知らせいただければ\n心を込めて準備させていただきます。",
      wedding_info: "新郎 {groom} & 新婦 {bride}",
      info_content: "新郎、新婦に事前の出席意思を\nお伝えいただけます。",
      submit_button: "出席確認をする",
      modal_title: "出席確認をする",
      submit: "送信中...",
      success: "出席確認が正常に送信されました。",
      submit_failed: "出席確認の送信に失敗しました。",
      // フォームフィールド
      form: {
        side_label: "区分",
        name_label: "お名前",
        meal_label: "食事",
        count_label: "出席人数 (本人含む)",
        name_placeholder: "出席者のお名前を入力してください。",
        count_unit: "名",
        submit_button: "出席確認をする",
        // オプション
        groom: "新郎",
        bride: "新婦",
        meal_yes: "予定",
        meal_undecided: "未定",
        meal_no: "欠席",
        // バリデーションメッセージ
        select_side_alert: "新郎または新婦を選択してください。",
        enter_name_alert: "お名前を入力してください。",
        name_too_long_alert: "お名前を{max}文字以内で入力してください。",
        select_meal_alert: "食事の有無を選択してください。",
        enter_count_alert: "出席人数を入力してください。",
        count_min_alert: "出席人数を{min}名以上にしてください。",
        enter_name_and_side_alert: "区分とお名前を入力してください。",
        send_failed_alert: "送信に失敗しました。しばらくしてから再度お試しください。"
      },
      modal_footer: {
        submit: "送信する",
        close: "閉じる"
      }
    },
    // ゲストブック
    guestbook: {
      title: "ゲストブック",
      placeholder: "お祝いの言葉をお願いします",
      submit: "送信",
    },
    // ボタン
    button: {
      call: "電話",
      message: "メッセージ",
      copy: "コピー",
    },
    // 地図
    map: {
      lock_message: "鍵ボタンを押して\nタッチロックを解除してから拡大・移動してください。",
      mobile_only_alert: "モバイルでご確認いただけます。",
      naver_map: "ネイバー地図",
      kakao_navi: "カカオナビ",
      tmap: "ティーマップ"
    },
    // 出席ボタン
    attendance_button: {
      title: "出席確認の返信",
      description: "出席確認をお知らせいただければ準備に役立ちます。",
      button_text: "返信する"
    },
    // 招待状連絡先
    invitation_contact: {
      title: "お祝いの言葉を伝える",
      subtitle: "電話やメッセージでお祝いの言葉をお伝えください。",
      button_text: "連絡する"
    },
    // ギャラリー
    gallery: {
      view_all_photos: "写真をすべて見る"
    },
    // 招待状関係
    invitation_relations: {
      groom_title: "の長男",
      bride_title: "の次女"
    },
    // 一般
    common: {
      close: "閉じる",
      success: "正常に送信されました"
    }
  },
}
