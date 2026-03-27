const DFY_STORAGE_KEY = "dfy-daily-sales-v2";
const DFY_INVENTORY_STORAGE_KEY = "inventory-dashboard-v2";
const DFY_PENDING_PRODUCT_SYNC_KEY = "dfy-product-ledger-pending-v1";
const DFY_PENDING_INVENTORY_SYNC_KEY = "dfy-inventory-pending-v1";
const DFY_INVENTORY_SYNC_SOURCE = "dfy-product-ledger";
const DFY_DEFAULT_TARGET = 1042989;
const DFY_REMOTE_TABLE = "dfy_daily_sales";
const DFY_REMOTE_PRODUCT_TABLE = "dfy_product_ledger";
const DFY_REMOTE_INVENTORY_TABLE = "dfy_inventory_state";
const DFY_REMOTE_INVENTORY_KEY = "shared";
const DFY_REMOTE_REFRESH_INTERVAL_MS = 5000;
const DFY_DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];
const DFY_MONTH_LABELS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const DFY_PLATFORMS = ["musinsa", "ably", "kream", "official"];
const DFY_PLATFORM_LABELS = {
  musinsa: "무신사",
  ably: "에이블리",
  kream: "크림",
  official: "공홈"
};
const DFY_PAGE_ORDER = ["summary", "products", "inventory", "inventoryOverview"];
const DFY_INVENTORY_CATEGORY_ORDER = ["shortSleeve", "longSleeve", "sweatshirt", "hoodie", "outer", "pants", "accessories", "outlet"];
const DFY_PAGE_META = {
  summary: {
    chip: "01 PAGE",
    name: "일별 매출정리",
    description: "월별 기준으로 무신사, 에이블리, 크림, 공식홈페이지 매출을 한 화면에서 정리합니다. 표 입력값은 자동 저장되며, 연도와 월을 바꿔도 기존 데이터는 유지됩니다."
  },
  products: {
    chip: "02 PAGE",
    name: "상품별 일일 매출 현황",
    description: "카테고리별 상품 판매건수를 일자와 사이즈 기준으로 입력합니다. 같은 상품명 판매건수는 재고관리 페이지 출고 데이터와 자동 연동되도록 저장됩니다."
  },
  inventory: {
    chip: "03 PAGE",
    name: "입출고 내역",
    description: "선택한 날짜 기준으로 카테고리별 시즌 상품의 입고와 출고를 기록합니다. 현재재고는 읽기 전용으로 표시되며 하단 집계와 내역이 함께 갱신됩니다."
  },
  inventoryOverview: {
    chip: "04 PAGE",
    name: "재고관리 대시보드",
    description: "3페이지 재고를 카테고리별 전 시즌 묶음으로 확인하고, 2페이지 평균판매량 기준 1주~4주 뒤 예상재고를 읽기 전용으로 확인합니다."
  }
};

const DFY_SEED_ROWS = {
  "2025-03-01": createSeedRow(19, 903400, 1, 37050, 0, 0, 0, 0),
  "2025-03-02": createSeedRow(19, 919500, 0, 0, 1, 98100, 0, 0),
  "2025-03-03": createSeedRow(18, 833500, 1, 27075, 1, 48000, 0, 0),
  "2025-03-04": createSeedRow(24, 1134250, 0, 0, 0, 0, 0, 0),
  "2025-03-05": createSeedRow(24, 1108700, 1, 44228, 0, 0, 0, 0),
  "2025-03-06": createSeedRow(23, 971750, 6, 189008, 0, 0, 0, 0),
  "2025-03-07": createSeedRow(16, 710900, 2, 83404, 0, 0, 0, 0),
  "2025-03-08": createSeedRow(33, 1393800, 3, 106355, 0, 0, 0, 0),
  "2025-03-09": createSeedRow(27, 1099900, 0, 0, 1, 45600, 1, 55200),
  "2025-03-10": createSeedRow(36, 1505000, 2, 81615, 1, 52000, 0, 0),
  "2025-03-11": createSeedRow(29, 1260100, 1, 38676, 1, 52000, 0, 0),
  "2025-03-12": createSeedRow(21, 869650, 1, 52700, 0, 0, 0, 0),
  "2025-03-13": createSeedRow(32, 1271200, 0, 0, 0, 0, 0, 0),
  "2025-03-14": createSeedRow(26, 1124100, 0, 0, 0, 0, 0, 0),
  "2025-03-15": createSeedRow(37, 1645000, 4, 177398, 0, 0, 2, 100500),
  "2025-03-16": createSeedRow(39, 1415300, 0, 0, 1, 38800, 0, 0),
  "2025-03-17": createSeedRow(52, 1904200, 1, 77882, 0, 0, 0, 0),
  "2025-03-18": createSeedRow(34, 1273150, 0, 0, 0, 0, 1, 29600),
  "2025-03-19": createSeedRow(33, 1322000, 2, 80535, 0, 0, 0, 0),
  "2025-03-20": createSeedRow(33, 1325200, 1, 26199, 0, 0, 0, 0),
  "2025-03-21": createSeedRow(37, 1436660, 1, 44460, 1, 49600, 0, 0),
  "2025-03-22": createSeedRow(53, 2003950, 3, 100695, 2, 93600, 0, 0),
  "2025-03-23": createSeedRow(42, 1597000, 2, 55128, 0, 0, 0, 0),
  "2025-03-24": createSeedRow(52, 2116610, 1, 37265, 0, 0, 0, 0)
};

const DFY_PRODUCT_CATEGORIES = {
  shortSleeve: {
    label: "반팔",
    inventoryCategory: "반팔",
    items: dedupeProducts([
      createProductDefinition("That Is Where It Started (T-shirt)"),
      createProductDefinition("Entropy"),
      createProductDefinition("My Companion (Stratocaster)"),
      createProductDefinition("Distortion (T-shirt)"),
      createProductDefinition("What We Are Crazy About (T-shirt)"),
      createProductDefinition("Dazed and Confused"),
      createProductDefinition("Routine White Gray (T-shirt)"),
      createProductDefinition("Rock Naissnce White Gray (T-shirt)"),
      createProductDefinition("Rock Family Indi Pink (T-shirt)"),
      createProductDefinition("Punk sisters"),
      createProductDefinition("Hells Bells"),
      createProductDefinition("27Club 세미 크롭 반팔 티셔츠 (메란지)"),
      createProductDefinition("Dead Chord 세미 크롭 반팔 티셔츠 (브라운)"),
      createProductDefinition("Dead Chord 세미 크롭 반팔 티셔츠 (차콜)"),
      createProductDefinition("Rock Star The Legend 링거 반팔 티셔츠 (메란지)"),
      createProductDefinition("Rock Star The Legend 링거 반팔 티셔츠 (크림)"),
      createProductDefinition("Messy Youth 반팔 티셔츠 (블랙)"),
      createProductDefinition("Burning Youth Syndrome 반팔 티셔츠 (화이트 메란지)"),
      createProductDefinition("Fame&Vanity 반팔 티셔츠 (차콜)"),
      createProductDefinition("Midnight Fade 반팔 티셔츠 (차콜)"),
      createProductDefinition("Eternal Tour 반팔 티셔츠 (블랙)"),
      createProductDefinition("Eternal Tour 반팔 티셔츠 (버건디)"),
      createProductDefinition("Shine In Lies Illusion 반팔 티셔츠 (블루)"),
      createProductDefinition("Shine In Lies Illusion 반팔 티셔츠 (버건디)"),
      createProductDefinition("Shine In Lies Illusion 반팔 티셔츠 (차콜)"),
      createProductDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (아이보리)", ["OS"]),
      createProductDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (차콜)", ["OS"]),
      createProductDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (블랙)", ["OS"]),
      createProductDefinition("Glam Rock 핫픽스 반팔 크롭 티셔츠 (블랙)", ["OS"]),
      createProductDefinition("Glam Rock 핫픽스 반팔 크롭 티셔츠 (아이보리)", ["OS"])
    ])
  },
  sweatshirt: {
    label: "맨투맨",
    inventoryCategory: "맨투맨",
    items: dedupeProducts([
      createProductDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Navy)"),
      createProductDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Oatmeal)"),
      createProductDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Charcoal)"),
      createProductDefinition("(Heavy Cotton) Favorite Genre Sweatshirt"),
      createProductDefinition("Imperfection reglan sweatshirt (Black)"),
      createProductDefinition("Imperfection reglan sweatshirt (Brown)"),
      createProductDefinition("Grunge reglan sweatshirt"),
      createProductDefinition("Overdrive reglan sweatshirt (Navy)"),
      createProductDefinition("Overdrive reglan sweatshirt (Burgundy)"),
      createProductDefinition("Zarathustra reglan sweatshirt")
    ])
  },
  longSleeve: {
    label: "롱슬리브",
    inventoryCategory: "롱슬리브",
    items: dedupeProducts([
      createProductDefinition("That Is Where It Started (Raglan)"),
      createProductDefinition("That Is Where It Started"),
      createProductDefinition("My Companion Long sleeves (Stratocaster)"),
      createProductDefinition("Doom and Gloom (Layered Long Sleeve)"),
      createProductDefinition("Rock Family Long Sleeves (Indi Pink)"),
      createProductDefinition("Rock Family Long Sleeves (White Gray)"),
      createProductDefinition("Routine Long Sleeves (Brown)"),
      createProductDefinition("Routine Long Sleeves (Indi Pink)"),
      createProductDefinition("Routine Long Sleeves (White Gray)"),
      createProductDefinition("Rock Naissnce Long Sleeves (Indi Pink)"),
      createProductDefinition("Rock Naissnce Long Sleeves (White Gray)"),
      createProductDefinition("Flight 666 롱슬리브 (브라운)"),
      createProductDefinition("Flight 666 롱슬리브 (블랙)"),
      createProductDefinition("Eternal Tour 롱슬리브 (블랙)"),
      createProductDefinition("Eternal Tour 레이어드 롱슬리브 (딥 버건디)"),
      createProductDefinition("Shine In Lies Illusion 롱슬리브 (차콜)"),
      createProductDefinition("Shine In Lies Illusion 롱슬리브 (딥버건디)"),
      createProductDefinition("Midnight Fade 롱슬리브 (차콜)"),
      createProductDefinition("Glam Rock 핫픽스 페미닌 보트넥 롱슬리브 (블랙)", ["OS"]),
      createProductDefinition("Glam Rock 핫픽스 페미닌 보트넥 롱슬리브 (화이트)", ["OS"]),
      createProductDefinition("Sensual flamboyance 페미닌 보트넥 롱슬리브 (블랙)", ["OS"])
    ])
  },
  hoodie: {
    label: "후드",
    inventoryCategory: "후드티",
    items: dedupeProducts([
      createProductDefinition("Imperfection Layered Hoodie Sleeves (Black)"),
      createProductDefinition("Imperfection Layered Hoodie Sleeves (Brown)"),
      createProductDefinition("Hells Bells Layered Hoodie Sleeves"),
      createProductDefinition("(Heavy Cotton) Favorite Genre Hoodie"),
      createProductDefinition("Defiance Eyes reglan Hoodie (Burgundy)"),
      createProductDefinition("Defiance Eyes reglan Hoodie (Black)"),
      createProductDefinition("Grunge reglan Hoodie"),
      createProductDefinition("(Heavy Cotton) Dcrstar Hoodie"),
      createProductDefinition("[기모] Silver Dcrstar 오버핏 후드티 블랙"),
      createProductDefinition("What We Are Crazy About"),
      createProductDefinition("Distortion")
    ])
  },
  pants: {
    label: "팬츠",
    inventoryCategory: "팬츠",
    items: dedupeProducts([
      createProductDefinition("Rock and Roll Brain pigment sweat shorts"),
      createProductDefinition("Soldier of Fortune pigment sweat shorts")
    ])
  },
  accessories: {
    label: "잡화류",
    inventoryCategory: "잡화류",
    items: dedupeProducts([
      createProductDefinition("You are not at fault", ["S", "M"]),
      createProductDefinition("C.C.C.", ["S", "M"]),
      createProductDefinition("Hell Song", ["M"]),
      createProductDefinition("Lizard House", ["M"]),
      createProductDefinition("Electric Guitar", ["M"]),
      createProductDefinition("Satisfaction Beanie", ["M"]),
      createProductDefinition("Rock Band Ball Cap (브라운)", ["M"], { inventoryName: "Rock Band Ball Cap (2color) (브라운)" }),
      createProductDefinition("Rock Band Ball Cap (인디핑크)", ["M"], { inventoryName: "Rock Band Ball Cap (2color) (인디핑크)" }),
      createProductDefinition("Dcrstar Ball cap", ["M"]),
      createProductDefinition("커트 러그", ["OS"], { syncSizeMap: { OS: "M" } }),
      createProductDefinition("총기 러그", ["OS"], { syncSizeMap: { OS: "M" } }),
      createProductDefinition("락의공식 머플러", ["OS"], { syncSizeMap: { OS: "M" } }),
      createProductDefinition("DCR 담요", ["OS"], { syncSizeMap: { OS: "M" } })
    ])
  }
};

const DFY_INVENTORY_CATEGORIES = {
  shortSleeve: {
    label: "반팔",
    seasons: {
      initial: {
        label: "초기시즌",
        inventoryCategory: "반팔",
        inventorySeason: "초기시즌",
        items: [
          createInventoryDefinition("Glory youth Crop T-Shirts", ["OS"]),
          createInventoryDefinition("What you looking at"),
          createInventoryDefinition("V.C.R"),
          createInventoryDefinition("Always Open"),
          createInventoryDefinition("Album 1.")
        ]
      },
      season2024: {
        label: "2024",
        inventoryCategory: "반팔",
        inventorySeason: "2024",
        items: [
          createInventoryDefinition("Years and Years", ["M", "L"], { defaultStock: { M: 0, L: 3 } }),
          createInventoryDefinition("Crowd Psychology (T-shirt)", ["M", "L"], { defaultStock: { M: 29, L: 14 } }),
          createInventoryDefinition("It Is No Joke (T-shirt)", ["M", "L"], { defaultStock: { M: 6, L: 6 } }),
          createInventoryDefinition("That Is Where It Started (T-shirt)", ["M", "L"], { defaultStock: { M: 21, L: 20 } }),
          createInventoryDefinition("Entropy", ["M", "L"], { defaultStock: { M: 17, L: 25 } }),
          createInventoryDefinition("Distortion (T-shirt)", ["M", "L"], { defaultStock: { M: 12, L: 10 } }),
          createInventoryDefinition("What We Are Crazy About (T-shirt)", ["M", "L"], { defaultStock: { M: 12, L: 9 } }),
          createInventoryDefinition("Dazed and Confused", ["M", "L"], { defaultStock: { M: 15, L: 8 } }),
          createInventoryDefinition("The hammer of philosophy", ["M", "L"], { defaultStock: { M: 28, L: 10 } }),
          createInventoryDefinition("Kierkegaard", ["M", "L"], { defaultStock: { M: 18, L: 15 } }),
          createInventoryDefinition("An Informal Organization", ["M", "L"], { defaultStock: { M: 11, L: 0 } }),
          createInventoryDefinition("Enfant Terrible (Reglan)", ["OS"], { defaultStock: { OS: 31 } }),
          createInventoryDefinition("Enfant Terrible", ["OS"], { defaultStock: { OS: 62 } }),
          createInventoryDefinition("Dopamine Detox (Reglan)", ["OS"], { defaultStock: { OS: 4 } }),
          createInventoryDefinition("Dopamine Detox", ["OS"], { defaultStock: { OS: 52 } }),
          createInventoryDefinition("My Companion (Stratocaster)", ["M", "L"], { defaultStock: { M: 5, L: 3 } }),
          createInventoryDefinition("My Companion (Telecaster)", ["M", "L"], { defaultStock: { M: 12, L: 17 } }),
          createInventoryDefinition("My Companion (Les Paul)", ["M", "L"], { defaultStock: { M: 23, L: 16 } })
        ]
      },
      season25SS: {
        label: "25SS",
        inventoryCategory: "반팔",
        inventorySeason: "25SS",
        items: [
          createInventoryDefinition("Rock Family Indi Pink (T-shirt)", ["M", "L"], { defaultStock: { M: 22, L: 38 } }),
          createInventoryDefinition("World Tour Indi Pink (T-shirt)", ["M", "L"], { defaultStock: { M: 9, L: 16 } }),
          createInventoryDefinition("Routine White Gray (T-shirt)", ["M", "L"], { defaultStock: { M: 1, L: 19 } }),
          createInventoryDefinition("Rock Naissnce White Gray (T-shirt)", ["M", "L"], { defaultStock: { M: 12, L: 23 } }),
          createInventoryDefinition("3 Reason White Gray (T-shirt)", ["M", "L"], { defaultStock: { M: 10, L: 24 } }),
          createInventoryDefinition("Another Brick In The Wall", ["M", "L"], { defaultStock: { M: 7, L: 6 } }),
          createInventoryDefinition("Punk sisters", ["M", "L"], { defaultStock: { M: 4, L: 18 } }),
          createInventoryDefinition("Hells Bells", ["M", "L"], { defaultStock: { M: 7, L: 4 } })
        ]
      },
      season26SS: {
        label: "26SS",
        inventoryCategory: "반팔",
        inventorySeason: "26SS",
        items: [
          createInventoryDefinition("Glam Rock 핫픽스 반팔 크롭 티셔츠 (블랙)", ["OS"], { defaultStock: { OS: 43 } }),
          createInventoryDefinition("Glam Rock 핫픽스 반팔 크롭 티셔츠 (아이보리)", ["OS"], { defaultStock: { OS: 53 } }),
          createInventoryDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (아이보리)", ["OS"], { defaultStock: { OS: 10 } }),
          createInventoryDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (차콜)", ["OS"], { defaultStock: { OS: 16 } }),
          createInventoryDefinition("Flight 666 원 오프 숄더 보트넥 반팔 티셔츠 (블랙)", ["OS"], { defaultStock: { OS: 27 } }),
          createInventoryDefinition("Fame&Vanity 반팔 티셔츠 (차콜)", ["M", "L"], { defaultStock: { M: 13, L: 15 } }),
          createInventoryDefinition("Shine In Lies Illusion 반팔 티셔츠 (블루)", ["M", "L"], { defaultStock: { M: 14, L: 13 } }),
          createInventoryDefinition("Shine In Lies Illusion 반팔 티셔츠 (버건디)", ["M", "L"], { defaultStock: { M: 14, L: 16 } }),
          createInventoryDefinition("Shine In Lies Illusion 반팔 티셔츠 (차콜)", ["M", "L"], { defaultStock: { M: 16, L: 18 } }),
          createInventoryDefinition("Burning Youth Syndrome 반팔 티셔츠 (화이트 메란지)", ["M", "L"], { defaultStock: { M: 5, L: 9 } }),
          createInventoryDefinition("Eternal Tour 반팔 티셔츠 (블랙)", ["M", "L"], { defaultStock: { M: 16, L: 13 } }),
          createInventoryDefinition("Eternal Tour 반팔 티셔츠 (버건디)", ["M", "L"], { defaultStock: { M: 5, L: 7 } }),
          createInventoryDefinition("Midnight Fade 반팔 티셔츠 (차콜)", ["M", "L"], { defaultStock: { M: 10, L: 19 } }),
          createInventoryDefinition("Messy Youth 반팔 티셔츠 (블랙)", ["M", "L"], { defaultStock: { M: 15, L: 11 } }),
          createInventoryDefinition("Rock Star The Legend 링거 반팔 티셔츠 (메란지)", ["M", "L"], { defaultStock: { M: 15, L: 18 } }),
          createInventoryDefinition("Rock Star The Legend 링거 반팔 티셔츠 (크림)", ["M", "L"], { defaultStock: { M: 12, L: 11 } }),
          createInventoryDefinition("27Club 세미 크롭 반팔 티셔츠 (메란지)", ["M", "L"], { defaultStock: { M: 9, L: 14 } }),
          createInventoryDefinition("Dead Chord 세미 크롭 반팔 티셔츠 (브라운)", ["M", "L"], { defaultStock: { M: 16, L: 14 } }),
          createInventoryDefinition("Dead Chord 세미 크롭 반팔 티셔츠 (차콜)", ["M", "L"], { defaultStock: { M: 12, L: 13 } })
        ]
      }
    }
  },
  sweatshirt: {
    label: "맨투맨",
    seasons: {
      initial: {
        label: "초기시즌",
        inventoryCategory: "맨투맨",
        inventorySeason: "초기시즌",
        items: [
          createInventoryDefinition("Uprising", ["M", "L"], { defaultStock: { M: 8, L: 0 } }),
          createInventoryDefinition("New Wave", ["M", "L"], { defaultStock: { M: 2, L: 20 } }),
          createInventoryDefinition("Years and Years Sweatshirt Gray", ["M", "L"], { defaultStock: { M: 5, L: 14 } }),
          createInventoryDefinition("City Like Roses Sweatshirt (Burgundy)", ["M", "L"], { defaultStock: { M: 5, L: 12 } }),
          createInventoryDefinition("City Like Roses Sweatshirt (Black)", ["M", "L"], { defaultStock: { M: 14, L: 18 } })
        ]
      },
      season25SS: {
        label: "25SS",
        inventoryCategory: "맨투맨",
        inventorySeason: "25SS",
        items: [
          createInventoryDefinition("World Tour Sweatshirt (Brick)", ["M", "L"], { defaultStock: { M: 29, L: 27 } }),
          createInventoryDefinition("World Tour Sweatshirt (Olive)", ["M", "L"], { defaultStock: { M: 34, L: 35 } }),
          createInventoryDefinition("World Tour Sweatshirt (Blue Green)", ["M", "L"], { defaultStock: { M: 34, L: 37 } }),
          createInventoryDefinition("Rock Naissnce Sweatshirt (Brick)", ["M", "L"], { defaultStock: { M: 22, L: 22 } }),
          createInventoryDefinition("Rock Naissnce Sweatshirt (Olive)", ["M", "L"], { defaultStock: { M: 38, L: 34 } }),
          createInventoryDefinition("Rock Naissnce Sweatshirt (Blue Green)", ["M", "L"], { defaultStock: { M: 37, L: 33 } }),
          createInventoryDefinition("Routine Sweatshirt (Brick)", ["M", "L"], { defaultStock: { M: 26, L: 27 } }),
          createInventoryDefinition("Routine Sweatshirt (Olive)", ["M", "L"], { defaultStock: { M: 33, L: 32 } }),
          createInventoryDefinition("Routine Sweatshirt (Blue Green)", ["M", "L"], { defaultStock: { M: 37, L: 34 } })
        ]
      },
      season25FW: {
        label: "25FW",
        inventoryCategory: "맨투맨",
        inventorySeason: "25FW",
        items: [
          createInventoryDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Navy)", ["M", "L"], { defaultStock: { M: 5, L: 11 } }),
          createInventoryDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Oatmeal)", ["M", "L"], { defaultStock: { M: 18, L: 8 } }),
          createInventoryDefinition("(Heavy Cotton) Strawberry Fields Forever Sweatshirt (Charcoal)", ["M", "L"], { defaultStock: { M: 16, L: 15 } }),
          createInventoryDefinition("(Heavy Cotton) Favorite Genre Sweatshirt", ["M", "L"], { defaultStock: { M: 15, L: 17 } }),
          createInventoryDefinition("Imperfection reglan sweatshirt (Black)", ["M", "L"], { defaultStock: { M: 11, L: 15 } }),
          createInventoryDefinition("Imperfection reglan sweatshirt (Brown)", ["M", "L"], { defaultStock: { M: 15, L: 19 } }),
          createInventoryDefinition("Grunge reglan sweatshirt", ["M", "L"], { defaultStock: { M: 12, L: 17 } }),
          createInventoryDefinition("Overdrive reglan sweatshirt (Navy)", ["M", "L"], { defaultStock: { M: 7, L: 12 } }),
          createInventoryDefinition("Overdrive reglan sweatshirt (Burgundy)", ["M", "L"], { defaultStock: { M: 15, L: 12 } }),
          createInventoryDefinition("Zarathustra reglan sweatshirt", ["M", "L"], { defaultStock: { M: 26, L: 22 } })
        ]
      }
    }
  },
  hoodie: {
    label: "후드티",
    seasons: {
      season2024: {
        label: "2024",
        inventoryCategory: "후드티",
        inventorySeason: "2024",
        items: [
          createInventoryDefinition("(Heavy Cotton) Entelecheia Charcoal", ["M", "L"], { defaultStock: { M: 4, L: 0 } }),
          createInventoryDefinition("(Heavy Cotton) Entelecheia Navy", ["M", "L"], { defaultStock: { M: 0, L: 8 } }),
          createInventoryDefinition("(Heavy Cotton) The hammer of philosophy Charcoal", ["M", "L"], { defaultStock: { M: 4, L: 16 } }),
          createInventoryDefinition("(Heavy Cotton) The hammer of philosophy Navy", ["M", "L"], { defaultStock: { M: 9, L: 14 } }),
          createInventoryDefinition("Years and Years Gray", ["M", "L"], { defaultStock: { M: 11, L: 8 } }),
          createInventoryDefinition("Years and Years Gray (기모)", ["M", "L"], { defaultStock: { M: 7, L: 2 } }),
          createInventoryDefinition("Years and Years Cream", ["M", "L"], { defaultStock: { M: 6, L: 26 } }),
          createInventoryDefinition("Years and Years Cream (기모)", ["M", "L"], { defaultStock: { M: 0, L: 10 } }),
          createInventoryDefinition("Rock Goddesses Black", ["M", "L"], { defaultStock: { M: 5, L: 0 } }),
          createInventoryDefinition("What We Are Crazy About", ["M", "L"], { defaultStock: { M: 12, L: 5 } }),
          createInventoryDefinition("Distortion", ["M", "L"], { defaultStock: { M: 13, L: 7 } }),
          createInventoryDefinition("City Like Roses Hoodie (Burgundy)", ["M", "L"], { defaultStock: { M: 8, L: 0 } }),
          createInventoryDefinition("City Like Roses Hoodie (Black)", ["M", "L"], { defaultStock: { M: 17, L: 14 } }),
          createInventoryDefinition("They Became Grizzlies", ["M", "L"], { defaultStock: { M: 5, L: 2 } })
        ]
      },
      season25FW: {
        label: "25FW",
        inventoryCategory: "후드티",
        inventorySeason: "25FW",
        items: [
          createInventoryDefinition("Imperfection Layered Hoodie Sleeves (Black)", ["M", "L"], { defaultStock: { M: 17, L: 26 } }),
          createInventoryDefinition("Imperfection Layered Hoodie Sleeves (Brown)", ["M", "L"], { defaultStock: { M: 22, L: 14 } }),
          createInventoryDefinition("Hells Bells Layered Hoodie Sleeves", ["M", "L"], { defaultStock: { M: 14, L: 11 } }),
          createInventoryDefinition("(Heavy Cotton) Favorite Genre Hoodie", ["M", "L"], { defaultStock: { M: 10, L: 11 } }),
          createInventoryDefinition("Defiance Eyes reglan Hoodie (Burgundy)", ["M", "L"], { defaultStock: { M: 6, L: 13 } }),
          createInventoryDefinition("Defiance Eyes reglan Hoodie (Black)", ["M", "L"], { defaultStock: { M: 15, L: 10 } }),
          createInventoryDefinition("Grunge reglan Hoodie", ["M", "L"], { defaultStock: { M: 14, L: 18 } }),
          createInventoryDefinition("(Heavy Cotton) Dcrstar Hoodie", ["M", "L"], { defaultStock: { M: 8, L: 10 } }),
          createInventoryDefinition("[기모] Silver Dcrstar 오버핏 후드티 블랙", ["M", "L"], { defaultStock: { M: 16, L: 22 } })
        ]
      }
    }
  },
  outer: {
    label: "아우터",
    seasons: {
      season25SS: {
        label: "25SS",
        inventoryCategory: "아우터",
        inventorySeason: "25SS",
        items: [
          createInventoryDefinition("Doom and Gloom Hoodie Zip-Up (Pigment Charcoal)", ["M", "L"], { defaultStock: { M: 29, L: 23 } }),
          createInventoryDefinition("The Doors of Perception Hoodie Zip-Up (Pigment Charcoal)", ["M", "L"], { defaultStock: { M: 22, L: 11 } })
        ]
      }
    }
  },
  pants: {
    label: "팬츠",
    seasons: {
      season2024: {
        label: "2024",
        inventoryCategory: "팬츠",
        inventorySeason: "2024",
        items: [
          createInventoryDefinition("Rock and Roll Brain pigment sweat shorts", ["M", "L"], { defaultStock: { M: 26, L: 10 } }),
          createInventoryDefinition("Soldier of Fortune pigment sweat shorts", ["M", "L"], { defaultStock: { M: 24, L: 12 } })
        ]
      }
    }
  },
  accessories: {
    label: "잡화류",
    seasons: {
      common: {
        label: "공통",
        inventoryCategory: "잡화류",
        inventorySeason: "공통",
        items: [
          createInventoryDefinition("You are not at fault", ["M", "L"], { defaultStock: { M: 0, L: 0 } }),
          createInventoryDefinition("C.C.C.", ["M", "L"], { defaultStock: { M: 0, L: 0 } }),
          createInventoryDefinition("Hell Song", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Lizard House", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Satisfaction Beanie", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Electric Guitar", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Rock Band Ball Cap (브라운)", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Rock Band Ball Cap (인디핑크)", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Dcrstar Ball cap", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("커트 러그", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("총기 러그", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("락의공식 머플러", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("DCR 담요", ["OS"], { defaultStock: { OS: 0 } })
        ]
      }
    }
  },
  outlet: {
    label: "아울렛",
    seasons: {
      sweatshirt: {
        label: "맨투맨",
        inventoryCategory: "아울렛",
        inventorySeason: "맨투맨",
        items: [
          createInventoryDefinition("They dont care about your future", ["M", "L"], { defaultStock: { M: 19, L: 0 } }),
          createInventoryDefinition("(Heavy Cotton) Saint of Defiance (Navy)", ["M", "L"], { defaultStock: { M: 11, L: 1 } })
        ]
      },
      shortSleeve: {
        label: "반팔",
        inventoryCategory: "아울렛",
        inventorySeason: "반팔",
        items: [
          createInventoryDefinition("The Catcher in the Rye (Black)", ["OS"], { defaultStock: { OS: 44 } }),
          createInventoryDefinition("The Catcher in the Rye", ["OS"], { defaultStock: { OS: 66 } }),
          createInventoryDefinition("Do you know shelley", ["OS"], { defaultStock: { OS: 53 } }),
          createInventoryDefinition("Rock, Stock And Two Smoking Barrels", ["OS"], { defaultStock: { OS: 35 } }),
          createInventoryDefinition("Deep Dive In Your Mind", ["OS"], { defaultStock: { OS: 31 } }),
          createInventoryDefinition("NARCISSIST", ["OS"], { defaultStock: { OS: 70 } }),
          createInventoryDefinition("Bullet (노랑)", ["OS"], { defaultStock: { OS: 94 } }),
          createInventoryDefinition("Bullet (차콜)", ["OS"], { defaultStock: { OS: 67 } }),
          createInventoryDefinition("Die Verwandlung", ["OS"], { defaultStock: { OS: 18 } }),
          createInventoryDefinition("Face To Face", ["OS"], { defaultStock: { OS: 30 } }),
          createInventoryDefinition("Land : Horses", ["OS"], { defaultStock: { OS: 4 } })
        ]
      },
      pants: {
        label: "팬츠",
        inventoryCategory: "아울렛",
        inventorySeason: "팬츠",
        items: [
          createInventoryDefinition("Khaki Cargo Pants", ["M", "L"], { defaultStock: { M: 0, L: 6 } }),
          createInventoryDefinition("Denim Cargo Pants", ["M", "L"], { defaultStock: { M: 16, L: 18 } }),
          createInventoryDefinition("Glitter Skirt", ["M", "L"], { defaultStock: { M: 26, L: 26 } }),
          createInventoryDefinition("Blue Skirt Pants", ["M", "L"], { defaultStock: { M: 11, L: 22 } })
        ]
      },
      hoodie: {
        label: "후드티",
        inventoryCategory: "아울렛",
        inventorySeason: "후드티",
        items: [
          createInventoryDefinition("(Heavy Cotton) House of Liberty (Charcoal)", ["M", "L"], { defaultStock: { M: 8, L: 15 } }),
          createInventoryDefinition("(Heavy Cotton) House of Liberty (Navy)", ["M", "L"], { defaultStock: { M: 21, L: 18 } }),
          createInventoryDefinition("(Heavy Cotton) Wild flower (Charcoal)", ["M", "L"], { defaultStock: { M: 21, L: 22 } }),
          createInventoryDefinition("(Heavy Cotton) Wild flower (Navy)", ["M", "L"], { defaultStock: { M: 19, L: 18 } }),
          createInventoryDefinition("(Heavy Cotton) Primordial Rockstar (Charcoal)", ["M", "L"], { defaultStock: { M: 2, L: 3 } }),
          createInventoryDefinition("(Heavy Cotton) Primordial Rockstar (Black)", ["M", "L"], { defaultStock: { M: 14, L: 9 } }),
          createInventoryDefinition("(Heavy Cotton) Breaking the mold (Navy)", ["M", "L"], { defaultStock: { M: 15, L: 18 } }),
          createInventoryDefinition("(Heavy Cotton) Headquarters (Charcoal)", ["M", "L"], { defaultStock: { M: 21, L: 15 } }),
          createInventoryDefinition("(Heavy Cotton) Headquarters (Navy)", ["M", "L"], { defaultStock: { M: 24, L: 22 } }),
          createInventoryDefinition("(Heavy Cotton) Do you know Elton John (Charcoal)", ["M", "L"], { defaultStock: { M: 30, L: 26 } }),
          createInventoryDefinition("(Heavy Cotton) Do you know Elton John (Navy)", ["M", "L"], { defaultStock: { M: 27, L: 30 } })
        ]
      }
    }
  },
  longSleeve: {
    label: "롱슬리브",
    seasons: {
      season2024: {
        label: "2024",
        inventoryCategory: "롱슬리브",
        inventorySeason: "2024",
        items: [
          createInventoryDefinition("That Is Where It Started (Raglan)", ["M", "L"], { defaultStock: { M: 61, L: 38 } }),
          createInventoryDefinition("That Is Where It Started", ["M", "L"], { defaultStock: { M: 23, L: 20 } }),
          createInventoryDefinition("Doom and Gloom (Layered Long Sleeve)", ["M", "L"], { defaultStock: { M: 11, L: 21 } }),
          createInventoryDefinition("Doom and Gloom (Pigment)", ["M", "L"], { defaultStock: { M: 12, L: 13 } }),
          createInventoryDefinition("How About You Guys Try it", ["M", "L"], { defaultStock: { M: 7, L: 5 } }),
          createInventoryDefinition("Crowd Psychology", ["M", "L"], { defaultStock: { M: 19, L: 3 } }),
          createInventoryDefinition("My Companion Long sleeves (Stratocaster)", ["M", "L"], { defaultStock: { M: 12, L: 24 } }),
          createInventoryDefinition("Black House (Layered Long Sleeve)", ["M", "L"], { defaultStock: { M: 15, L: 20 } }),
          createInventoryDefinition("Black House (Pigment)", ["M", "L"], { defaultStock: { M: 13, L: 25 } }),
          createInventoryDefinition("Psychedelic (Layered Long Sleeve)", ["M", "L"], { defaultStock: { M: 18, L: 20 } }),
          createInventoryDefinition("Psychedelic (Pigment)", ["M", "L"], { defaultStock: { M: 17, L: 18 } }),
          createInventoryDefinition("The Doors of Perception (Layered Long Sleeve)", ["M", "L"], { defaultStock: { M: 29, L: 27 } }),
          createInventoryDefinition("The Doors of Perception", ["OS"], { defaultStock: { OS: 36 } }),
          createInventoryDefinition("British Invasion (Charcoal)", ["OS"], { defaultStock: { OS: 18 } }),
          createInventoryDefinition("British Invasion (White)", ["OS"], { defaultStock: { OS: 19 } }),
          createInventoryDefinition("Wish You Were Here", ["OS"], { defaultStock: { OS: 41 } }),
          createInventoryDefinition("Deep Dive In Your Mind", ["OS"], { defaultStock: { OS: 31 } }),
          createInventoryDefinition("Anti-Christ (Pigment)", ["M", "L"], { defaultStock: { M: 26, L: 29 } })
        ]
      },
      season25SS: {
        label: "25SS",
        inventoryCategory: "롱슬리브",
        inventorySeason: "25SS",
        items: [
          createInventoryDefinition("Rock Family Long Sleeves (Indi Pink)", ["M", "L"], { defaultStock: { M: 10, L: 16 } }),
          createInventoryDefinition("Rock Family Long Sleeves (White Gray)", ["M", "L"], { defaultStock: { M: 13, L: 6 } }),
          createInventoryDefinition("Routine Long Sleeves (Brown)", ["M", "L"], { defaultStock: { M: 16, L: 23 } }),
          createInventoryDefinition("Routine Long Sleeves (Indi Pink)", ["M", "L"], { defaultStock: { M: 17, L: 9 } }),
          createInventoryDefinition("Routine Long Sleeves (White Gray)", ["M", "L"], { defaultStock: { M: 19, L: 8 } }),
          createInventoryDefinition("3 Reason Long Sleeves (Indi Pink)", ["M", "L"], { defaultStock: { M: 17, L: 23 } }),
          createInventoryDefinition("3 Reason Long Sleeves (White Gray)", ["M", "L"], { defaultStock: { M: 3, L: 15 } }),
          createInventoryDefinition("World Tour Long Sleeves (Indi Pink)", ["M", "L"], { defaultStock: { M: 0, L: 21 } }),
          createInventoryDefinition("World Tour Long Sleeves (White Gray)", ["M", "L"], { defaultStock: { M: 17, L: 0 } }),
          createInventoryDefinition("Rock Naissnce Long Sleeves (Indi Pink)", ["M", "L"], { defaultStock: { M: 6, L: 7 } }),
          createInventoryDefinition("Rock Naissnce Long Sleeves (White Gray)", ["M", "L"], { defaultStock: { M: 2, L: 16 } })
        ]
      },
      season26SS: {
        label: "26SS",
        inventoryCategory: "롱슬리브",
        inventorySeason: "26SS",
        items: [
          createInventoryDefinition("Eternal Tour 롱슬리브 (블랙)", ["M", "L"], { defaultStock: { M: 9, L: 10 } }),
          createInventoryDefinition("Eternal Tour 레이어드 롱슬리브 (딥 버건디)", ["M", "L"], { defaultStock: { M: 10, L: 6 } }),
          createInventoryDefinition("Shine In Lies Illusion 롱슬리브 (딥버건디)", ["M", "L"], { defaultStock: { M: 7, L: 9 } }),
          createInventoryDefinition("Shine In Lies Illusion 롱슬리브 (차콜)", ["M", "L"], { defaultStock: { M: 8, L: 10 } }),
          createInventoryDefinition("Midnight Fade 롱슬리브 (차콜)", ["M", "L"], { defaultStock: { M: 7, L: 9 } }),
          createInventoryDefinition("Flight 666 롱슬리브 (브라운)", ["M", "L"], { defaultStock: { M: 9, L: 11 } }),
          createInventoryDefinition("Flight 666 롱슬리브 (블랙)", ["M", "L"], { defaultStock: { M: 12, L: 12 } }),
          createInventoryDefinition("Sensual flamboyance 페미닌 보트넥 롱슬리브 (블랙)", ["OS"], { defaultStock: { OS: 0 } }),
          createInventoryDefinition("Glam Rock 핫픽스 페미닌 보트넥 롱슬리브 (블랙)", ["OS"], { defaultStock: { OS: 2 } }),
          createInventoryDefinition("Glam Rock 핫픽스 페미닌 보트넥 롱슬리브 (화이트)", ["OS"], { defaultStock: { OS: 11 } })
        ]
      }
    }
  }
};

const DFY_PRODUCT_ROWS = buildProductRows();
const DFY_PRODUCT_ROW_MAP = new Map(DFY_PRODUCT_ROWS.map((row) => [row.rowId, row]));

const salesTableBody = document.getElementById("salesTableBody");
const salesTableFoot = document.getElementById("salesTableFoot");
const expectedCostInput = document.getElementById("expectedCostInput");
const breakEvenSalesValue = document.getElementById("breakEvenSalesValue");
const targetSalesValue = document.getElementById("targetSalesValue");
const currentSalesValue = document.getElementById("currentSalesValue");
const dailyTargetValue = document.getElementById("dailyTargetValue");
const salesAchievementValue = document.getElementById("salesAchievementValue");
const averageOrderValue = document.getElementById("averageOrderValue");
const settlementAovValue = document.getElementById("settlementAovValue");
const requiredOrdersValue = document.getElementById("requiredOrdersValue");
const orderAchievementValue = document.getElementById("orderAchievementValue");
const salesGapValue = document.getElementById("salesGapValue");
const orderGapValue = document.getElementById("orderGapValue");
const bestDayValue = document.getElementById("bestDayValue");
const worstDayValue = document.getElementById("worstDayValue");
const platformSalesChart = document.getElementById("platformSalesChart");
const weekdayChart = document.getElementById("weekdayChart");
const weekdayRankSummary = document.getElementById("weekdayRankSummary");
const weekdaySummaryBody = document.getElementById("weekdaySummaryBody");
const saveIndicator = document.getElementById("saveIndicator");
const monthHeadline = document.getElementById("monthHeadline");
const monthSubcopy = document.getElementById("monthSubcopy");
const monthPickerButton = document.getElementById("monthPickerButton");
const monthPickerLabel = document.getElementById("monthPickerLabel");
const monthPickerPanel = document.getElementById("monthPickerPanel");
const pickerPrevYearButton = document.getElementById("pickerPrevYearButton");
const pickerNextYearButton = document.getElementById("pickerNextYearButton");
const pickerYearLabel = document.getElementById("pickerYearLabel");
const monthGrid = document.getElementById("monthGrid");
const prevDfyPageButton = document.getElementById("prevDfyPageButton");
const nextDfyPageButton = document.getElementById("nextDfyPageButton");
const pageIndicatorText = document.getElementById("pageIndicatorText");
const heroPageChip = document.getElementById("heroPageChip");
const heroPageName = document.getElementById("heroPageName");
const heroDescription = document.getElementById("heroDescription");
const pageSections = document.querySelectorAll(".dfy-page");
const productPageHeadline = document.getElementById("productPageHeadline");
const productCategoryButtons = document.getElementById("productCategoryButtons");
const productAverageDivisor = document.getElementById("productAverageDivisor");
const productLedgerHead = document.getElementById("productLedgerHead");
const productLedgerBody = document.getElementById("productLedgerBody");
const productLedgerFoot = document.getElementById("productLedgerFoot");
const productCategoryChart = document.getElementById("productCategoryChart");
const inventoryDateInput = document.getElementById("inventoryDateInput");
const inventoryDateCard = document.getElementById("inventoryDateCard");
const inventoryInboundCard = document.getElementById("inventoryInboundCard");
const inventoryOutboundCard = document.getElementById("inventoryOutboundCard");
const inventoryCategoryButtons = document.getElementById("inventoryCategoryButtons");
const inventorySeasonButtons = document.getElementById("inventorySeasonButtons");
const inventoryStockEditButton = document.getElementById("inventoryStockEditButton");
const inventoryHeadline = document.getElementById("inventoryHeadline");
const inventoryTableBody = document.getElementById("inventoryTableBody");
const inventoryDailySummaryBody = document.getElementById("inventoryDailySummaryBody");
const inventoryHistoryBody = document.getElementById("inventoryHistoryBody");
const inventoryOverviewHeadline = document.getElementById("inventoryOverviewHeadline");
const inventoryOverviewCategoryButtons = document.getElementById("inventoryOverviewCategoryButtons");
const inventoryForecastButtons = document.getElementById("inventoryForecastButtons");
const inventoryOverviewSections = document.getElementById("inventoryOverviewSections");
const inventoryEditModal = document.getElementById("inventoryEditModal");
const inventoryEditBackdrop = document.getElementById("inventoryEditBackdrop");
const inventoryEditCaption = document.getElementById("inventoryEditCaption");
const inventoryEditBody = document.getElementById("inventoryEditBody");
const inventoryEditCloseButton = document.getElementById("inventoryEditCloseButton");
const inventoryEditCancelButton = document.getElementById("inventoryEditCancelButton");
const inventoryEditSaveButton = document.getElementById("inventoryEditSaveButton");
const supabaseConfig = window.DFY_APP_CONFIG || {};
const supabaseClient = window.supabase && supabaseConfig.supabaseUrl && supabaseConfig.supabaseAnonKey
  ? window.supabase.createClient(supabaseConfig.supabaseUrl, supabaseConfig.supabaseAnonKey)
  : null;

const today = new Date();
const todayKey = formatDateKey(today);
const todayMonthKey = formatMonthKey(today);
let state = loadState();
let currentMonth = normalizeMonthKey(state.ui?.currentMonth) || todayMonthKey;
let currentPage = normalizePageKey(state.ui?.currentPage);
let currentProductCategory = normalizeCategoryKey(state.ui?.currentProductCategory);
let currentInventoryCategory = normalizeInventoryCategoryKey(state.ui?.currentInventoryCategory);
let currentInventorySeason = normalizeInventorySeasonKey(currentInventoryCategory, state.ui?.currentInventorySeason);
let currentInventoryOverviewCategory = normalizeInventoryCategoryKey(state.ui?.currentInventoryOverviewCategory || state.ui?.currentInventoryCategory);
let currentInventoryForecastWeeks = normalizeInventoryForecastWeeks(state.ui?.currentInventoryForecastWeeks);
let currentInventoryDate = normalizeInventoryDateKey(state.ui?.currentInventoryDate) || todayKey;
let pickerYear = Number(currentMonth.slice(0, 4));
let saveMessage = "자동 저장 준비 중";
let remoteSaveTimer = null;
let pendingRemoteKeys = new Set();
let remoteProductSaveTimer = null;
let pendingRemoteProductKeys = new Set();
let remoteInventorySaveTimer = null;
let remoteBootstrapComplete = false;
let isRemoteHydrating = false;
let lastRemoteSensitiveEditAt = 0;
let skipInventoryBlurCommit = false;
let isInventoryEditModalOpen = false;

init();
function init() {
  ensureMonthData(currentMonth);
  inventoryEditModal.hidden = true;
  renderProductCategoryButtons();
  renderInventoryCategoryButtons();
  renderInventorySeasonButtons();
  syncPageHistory(true);
  bindEvents();
  render();
  queueTodayInputFocus(currentPage);
  startRemoteRefreshLoop();
  void hydrateFromSupabase();
}

function createSeedRow(musinsaOrders, musinsaSales, ablyOrders, ablySales, kreamOrders, kreamSales, officialOrders, officialSales) {
  return {
    musinsa: { orders: musinsaOrders, sales: musinsaSales },
    ably: { orders: ablyOrders, sales: ablySales },
    kream: { orders: kreamOrders, sales: kreamSales },
    official: { orders: officialOrders, sales: officialSales },
    dailyTarget: DFY_DEFAULT_TARGET
  };
}

function createProductDefinition(name, sizes = ["M", "L"], options = {}) {
  return {
    name,
    sizes: [...sizes],
    inventoryName: options.inventoryName || name,
    syncSizeMap: options.syncSizeMap || {}
  };
}

function createInventoryDefinition(name, sizes = ["M", "L"], options = {}) {
  return {
    name,
    sizes: [...sizes],
    inventoryName: options.inventoryName || name,
    defaultStock: typeof options.defaultStock === "object" && options.defaultStock !== null
      ? { ...options.defaultStock }
      : (Number.isFinite(options.defaultStock) ? options.defaultStock : 20)
  };
}

function dedupeProducts(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.name}|${item.sizes.join(",")}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildProductRows() {
  return Object.entries(DFY_PRODUCT_CATEGORIES).flatMap(([categoryKey, category]) => {
    return category.items.flatMap((item, itemIndex) => {
      return item.sizes.map((size, sizeIndex) => ({
        rowId: `${categoryKey}:${slugify(item.name)}:${size}`,
        categoryKey,
        inventoryCategory: category.inventoryCategory,
        inventoryName: item.inventoryName,
        inventorySize: item.syncSizeMap?.[size] || size,
        name: item.name,
        size,
        itemIndex,
        sizeIndex,
        rowSpan: item.sizes.length,
        isFirstSize: sizeIndex === 0
      }));
    });
  });
}

function loadState() {
  const fallbackRows = cloneRows(DFY_SEED_ROWS);
  const stored = localStorage.getItem(DFY_STORAGE_KEY);
  const pendingProductEntries = getPendingProductSyncEntries();

  if (!stored) {
    const productLedger = {};
    pendingProductEntries.forEach((entry) => {
      if (!productLedger[entry.monthKey]) {
        productLedger[entry.monthKey] = {};
      }
      if (!productLedger[entry.monthKey][entry.rowId]) {
        productLedger[entry.monthKey][entry.rowId] = {};
      }
      if (entry.quantity > 0) {
        productLedger[entry.monthKey][entry.rowId][entry.dateKey] = entry.quantity;
      }
    });
    return {
      rows: fallbackRows,
      meta: {},
      productLedger,
      ui: {
        currentMonth: todayMonthKey,
        currentPage: "summary",
        currentProductCategory: getDefaultCategoryKey(),
        currentInventoryCategory: getDefaultInventoryCategoryKey(),
        currentInventorySeason: getDefaultInventorySeasonKey(getDefaultInventoryCategoryKey()),
        currentInventoryOverviewCategory: getDefaultInventoryCategoryKey(),
        currentInventoryForecastWeeks: 1,
        currentInventoryDate: todayKey
      }
    };
  }

  try {
    const parsed = JSON.parse(stored);
    const parsedProductLedger = normalizeProductLedger(parsed.productLedger);
    pendingProductEntries.forEach((entry) => {
      if (!parsedProductLedger[entry.monthKey]) {
        parsedProductLedger[entry.monthKey] = {};
      }
      if (!parsedProductLedger[entry.monthKey][entry.rowId]) {
        parsedProductLedger[entry.monthKey][entry.rowId] = {};
      }
      if (entry.quantity > 0) {
        parsedProductLedger[entry.monthKey][entry.rowId][entry.dateKey] = entry.quantity;
      } else {
        delete parsedProductLedger[entry.monthKey][entry.rowId][entry.dateKey];
      }
    });
    const parsedRows = Object.fromEntries(
      Object.entries(parsed.rows || {}).map(([dateKey, row]) => [dateKey, normalizeRow(row)])
    );
    const parsedMeta = Object.fromEntries(
      Object.entries(parsed.meta || {}).map(([monthKey, meta]) => [
        monthKey,
        { expectedCost: Math.max(0, Number(meta?.expectedCost) || 0) }
      ])
    );

    return {
      rows: { ...fallbackRows, ...parsedRows },
      meta: parsedMeta,
      productLedger: parsedProductLedger,
      ui: {
        currentMonth: normalizeMonthKey(parsed.ui?.currentMonth) || todayMonthKey,
        currentPage: normalizePageKey(parsed.ui?.currentPage),
        currentProductCategory: normalizeCategoryKey(parsed.ui?.currentProductCategory),
        currentInventoryCategory: normalizeInventoryCategoryKey(parsed.ui?.currentInventoryCategory),
        currentInventorySeason: normalizeInventorySeasonKey(
          normalizeInventoryCategoryKey(parsed.ui?.currentInventoryCategory),
          parsed.ui?.currentInventorySeason
        ),
        currentInventoryOverviewCategory: normalizeInventoryCategoryKey(parsed.ui?.currentInventoryOverviewCategory || parsed.ui?.currentInventoryCategory),
        currentInventoryForecastWeeks: normalizeInventoryForecastWeeks(parsed.ui?.currentInventoryForecastWeeks),
        currentInventoryDate: normalizeInventoryDateKey(parsed.ui?.currentInventoryDate) || todayKey
      }
    };
  } catch (error) {
    return {
      rows: fallbackRows,
      meta: {},
      productLedger: {},
      ui: {
        currentMonth: todayMonthKey,
        currentPage: "summary",
        currentProductCategory: getDefaultCategoryKey(),
        currentInventoryCategory: getDefaultInventoryCategoryKey(),
        currentInventorySeason: getDefaultInventorySeasonKey(getDefaultInventoryCategoryKey()),
        currentInventoryOverviewCategory: getDefaultInventoryCategoryKey(),
        currentInventoryForecastWeeks: 1,
        currentInventoryDate: todayKey
      }
    };
  }
}

function normalizeProductLedger(productLedger) {
  if (!productLedger || typeof productLedger !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(productLedger).map(([monthKey, rowMap]) => [
      monthKey,
      Object.fromEntries(
        Object.entries(rowMap || {}).map(([rowId, dateMap]) => [
          rowId,
          Object.fromEntries(
            Object.entries(dateMap || {}).map(([dateKey, value]) => [dateKey, Math.max(0, Number(value) || 0)])
          )
        ])
      )
    ])
  );
}

function loadPendingProductSyncMap() {
  try {
    const raw = localStorage.getItem(DFY_PENDING_PRODUCT_SYNC_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function savePendingProductSyncMap(map) {
  localStorage.setItem(DFY_PENDING_PRODUCT_SYNC_KEY, JSON.stringify(map || {}));
}

function markPendingProductSyncEntry(monthKey, rowId, dateKey) {
  const pendingMap = loadPendingProductSyncMap();
  const entryKey = createRemoteProductEntryKey(dateKey, rowId);
  pendingMap[entryKey] = {
    monthKey,
    rowId,
    dateKey,
    quantity: getProductCellValue(monthKey, rowId, dateKey),
    changedAt: new Date().toISOString()
  };
  savePendingProductSyncMap(pendingMap);
}

function clearPendingProductSyncEntries(entryKeys) {
  if (!entryKeys.length) {
    return;
  }
  const pendingMap = loadPendingProductSyncMap();
  let hasChanges = false;
  entryKeys.forEach((entryKey) => {
    if (entryKey in pendingMap) {
      delete pendingMap[entryKey];
      hasChanges = true;
    }
  });
  if (hasChanges) {
    savePendingProductSyncMap(pendingMap);
  }
}

function getPendingProductSyncEntries() {
  return Object.values(loadPendingProductSyncMap())
    .map((entry) => ({
      monthKey: String(entry?.monthKey || ""),
      rowId: String(entry?.rowId || ""),
      dateKey: String(entry?.dateKey || ""),
      quantity: Math.max(0, Number(entry?.quantity) || 0),
      changedAt: String(entry?.changedAt || "")
    }))
    .filter((entry) => entry.monthKey && entry.rowId && entry.dateKey);
}

function normalizeSharedInventoryState(inventoryState) {
  return {
    items: Array.isArray(inventoryState?.items) ? inventoryState.items : [],
    transactions: Array.isArray(inventoryState?.transactions)
      ? inventoryState.transactions.filter((transaction) => transaction?.source !== DFY_INVENTORY_SYNC_SOURCE)
      : [],
    dfyProductSalesSync: null
  };
}

function loadPendingInventorySyncState() {
  try {
    const raw = localStorage.getItem(DFY_PENDING_INVENTORY_SYNC_KEY);
    if (!raw) {
      return null;
    }
    return normalizeSharedInventoryState(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

function savePendingInventorySyncState(inventoryState) {
  localStorage.setItem(
    DFY_PENDING_INVENTORY_SYNC_KEY,
    JSON.stringify(normalizeSharedInventoryState(inventoryState))
  );
}

function clearPendingInventorySyncState() {
  localStorage.removeItem(DFY_PENDING_INVENTORY_SYNC_KEY);
}

function areInventoryStatesEqual(leftState, rightState) {
  return JSON.stringify(normalizeSharedInventoryState(leftState))
    === JSON.stringify(normalizeSharedInventoryState(rightState));
}

function bindEvents() {
  prevDfyPageButton.addEventListener("click", () => shiftPage(-1));
  nextDfyPageButton.addEventListener("click", () => shiftPage(1));
  monthPickerButton.addEventListener("click", toggleMonthPicker);
  pickerPrevYearButton.addEventListener("click", () => shiftPickerYear(-1));
  pickerNextYearButton.addEventListener("click", () => shiftPickerYear(1));

  monthGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-month]");
    if (!button) return;
    closeMonthPicker();
    setCurrentMonth(`${pickerYear}-${button.dataset.month}`);
  });

  document.addEventListener("click", (event) => {
    if (!monthPickerPanel.hidden && !event.target.closest(".month-picker")) {
      closeMonthPicker();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMonthPicker();
      closeInventoryEditModal();
    }
  });

  window.addEventListener("popstate", (event) => {
    const nextPage = normalizePageKey(event.state?.page);
    if (nextPage === currentPage) {
      return;
    }
    currentPage = nextPage;
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderPageFrame();
    queueTodayInputFocus(currentPage);
  });

  expectedCostInput.addEventListener("focus", () => {
    expectedCostInput.value = String(getMonthMeta(currentMonth).expectedCost || "");
  });
  expectedCostInput.addEventListener("input", () => updateMonthMeta("expectedCost", parseNumericValue(expectedCostInput.value), false));
  expectedCostInput.addEventListener("blur", () => updateMonthMeta("expectedCost", parseNumericValue(expectedCostInput.value), true));
  expectedCostInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      expectedCostInput.blur();
    }
  });

  salesTableBody.addEventListener("focusin", handleSalesInputFocus);
  salesTableBody.addEventListener("input", handleSalesInputChange);
  salesTableBody.addEventListener("focusout", handleSalesInputBlur, true);
  salesTableBody.addEventListener("keydown", handleSalesInputKeydown);

  productCategoryButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    currentProductCategory = normalizeCategoryKey(button.dataset.category);
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderProductCategoryButtons();
    renderProductPage();
    if (currentPage === "products") {
      queueTodayInputFocus("products");
    }
  });

  productLedgerBody.addEventListener("focusin", handleProductInputFocus);
  productLedgerBody.addEventListener("input", handleProductInputChange);
  productLedgerBody.addEventListener("focusout", handleProductInputBlur, true);
  productLedgerBody.addEventListener("keydown", handleProductInputKeydown);

  inventoryDateInput.addEventListener("change", () => {
    currentInventoryDate = normalizeInventoryDateKey(inventoryDateInput.value) || todayKey;
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderInventoryPage();
  });

  inventoryCategoryButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-inventory-category]");
    if (!button) {
      return;
    }

    currentInventoryCategory = normalizeInventoryCategoryKey(button.dataset.inventoryCategory);
    currentInventorySeason = getDefaultInventorySeasonKey(currentInventoryCategory);
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderInventoryCategoryButtons();
    renderInventorySeasonButtons();
    renderInventoryPage();
  });

  inventorySeasonButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-inventory-season]");
    if (!button) {
      return;
    }

    currentInventorySeason = normalizeInventorySeasonKey(currentInventoryCategory, button.dataset.inventorySeason);
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderInventorySeasonButtons();
    renderInventoryPage();
  });

  inventoryOverviewCategoryButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-inventory-overview-category]");
    if (!button) {
      return;
    }
    currentInventoryOverviewCategory = normalizeInventoryCategoryKey(button.dataset.inventoryOverviewCategory);
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderInventoryOverviewPage();
  });

  inventoryForecastButtons.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-forecast-weeks]");
    if (!button) {
      return;
    }
    currentInventoryForecastWeeks = normalizeInventoryForecastWeeks(button.dataset.forecastWeeks);
    saveState(`자동 저장됨 · ${formatTime(new Date())}`);
    renderInventoryOverviewPage();
  });

  inventoryStockEditButton.addEventListener("click", openInventoryEditModal);
  inventoryEditBackdrop.addEventListener("click", closeInventoryEditModal);
  inventoryEditCloseButton.addEventListener("click", closeInventoryEditModal);
  inventoryEditCancelButton.addEventListener("click", closeInventoryEditModal);
  inventoryEditSaveButton.addEventListener("click", saveInventoryEditModal);

  inventoryTableBody.addEventListener("focusin", handleInventoryInputFocus);
  inventoryTableBody.addEventListener("input", handleInventoryInputChange);
  inventoryTableBody.addEventListener("focusout", handleInventoryInputBlur, true);
  inventoryTableBody.addEventListener("keydown", handleInventoryInputKeydown);

  window.addEventListener("pagehide", commitPendingInputsBeforeUnload);
  window.addEventListener("beforeunload", commitPendingInputsBeforeUnload);
}

function commitPendingInputsBeforeUnload() {
  const activeElement = document.activeElement;
  if (!(activeElement instanceof HTMLInputElement)) {
    return;
  }

  if (activeElement.classList.contains("product-input") && activeElement.dataset.rowId && activeElement.dataset.date) {
    updateProductCellFromInput(activeElement, false);
    return;
  }

  if (activeElement.classList.contains("table-input") && activeElement.dataset.date) {
    updateCellFromInput(activeElement, false);
    return;
  }

  if (activeElement.classList.contains("inventory-input") && activeElement.dataset.itemId) {
    commitInventoryInput(activeElement, false);
    return;
  }

  if (activeElement.classList.contains("inventory-edit-input")) {
    saveInventoryEditModal();
  }
}

function handleSalesInputFocus(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.date) return;
  input.value = String(getCellValue(input.dataset.date, input.dataset.platform, input.dataset.field) || "");
}

function handleSalesInputChange(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.date) return;
  markRemoteSensitiveEdit();
  updateCellFromInput(input, false);
}

function handleSalesInputBlur(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.date) return;
  updateCellFromInput(input, true);
}

function handleSalesInputKeydown(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.date) return;
  if (handleSalesArrowNavigation(event, input)) return;
  if (event.key === "Enter") {
    event.preventDefault();
    focusNextSalesInput(input);
  }
}

function handleProductInputFocus(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.rowId || !input.dataset.date) return;
  input.value = String(getProductCellValue(currentMonth, input.dataset.rowId, input.dataset.date) || "");
}

function handleProductInputChange(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.rowId || !input.dataset.date) return;
  markRemoteSensitiveEdit();
  updateProductCellFromInput(input, false);
}

function handleProductInputBlur(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.rowId || !input.dataset.date) return;
  updateProductCellFromInput(input, true);
}

function handleProductInputKeydown(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.rowId || !input.dataset.date) return;
  if (handleProductArrowNavigation(event, input)) return;
  if (event.key === "Enter") {
    event.preventDefault();
    focusNextProductInput(input);
  }
}

function handleInventoryInputFocus(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.itemId) {
    return;
  }

  input.value = String(getInventoryTransactionQuantity(input.dataset.itemId, input.dataset.size, input.dataset.type, currentInventoryDate) || "");
}

function handleInventoryInputChange() {
  markRemoteSensitiveEdit();
}

function handleInventoryInputBlur(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.itemId) {
    return;
  }

  if (skipInventoryBlurCommit) {
    skipInventoryBlurCommit = false;
    return;
  }

  commitInventoryInput(input, true);
}

function handleInventoryInputKeydown(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.itemId) {
    return;
  }

  if (handleInventoryArrowNavigation(event, input)) {
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();
    focusInventoryColumnInput(input, event.shiftKey ? -1 : 1);
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    focusInventoryRowInput(input, event.shiftKey ? -1 : 1);
  }
}

function render() {
  ensureMonthData(currentMonth);
  renderPageFrame();
  renderMonthPickerSummary();
  renderHeadline();
  renderSummary();
  renderBody();
  renderFooter();
  renderPlatformSalesChart();
  renderInsights();
  renderProductPage();
  renderInventoryPage();
  renderInventoryOverviewPage();
  saveIndicator.textContent = saveMessage;
}

function renderPageFrame() {
  const pageMeta = DFY_PAGE_META[currentPage];
  const pageIndex = DFY_PAGE_ORDER.indexOf(currentPage);
  pageSections.forEach((section) => section.classList.toggle("is-active", section.dataset.page === currentPage));
  prevDfyPageButton.disabled = pageIndex === 0;
  nextDfyPageButton.disabled = pageIndex === DFY_PAGE_ORDER.length - 1;
  pageIndicatorText.textContent = `${pageMeta.chip} · ${pageMeta.name}`;
  heroPageChip.textContent = pageMeta.chip;
  heroPageName.textContent = pageMeta.name;
  heroDescription.textContent = pageMeta.description;
}

function renderProductCategoryButtons() {
  productCategoryButtons.innerHTML = Object.entries(DFY_PRODUCT_CATEGORIES)
    .map(([categoryKey, category]) => `
      <button class="category-button${categoryKey === currentProductCategory ? " is-active" : ""}" type="button" data-category="${categoryKey}" role="tab" aria-selected="${categoryKey === currentProductCategory ? "true" : "false"}">${escapeHtml(category.label)}</button>
    `)
    .join("");
}

function renderInventoryCategoryButtons() {
  inventoryCategoryButtons.innerHTML = DFY_INVENTORY_CATEGORY_ORDER
    .filter((categoryKey) => categoryKey in DFY_INVENTORY_CATEGORIES)
    .map((categoryKey) => [categoryKey, DFY_INVENTORY_CATEGORIES[categoryKey]])
    .map(([categoryKey, category]) => `
      <button
        class="category-button${categoryKey === currentInventoryCategory ? " is-active" : ""}"
        type="button"
        data-inventory-category="${categoryKey}"
        role="tab"
        aria-selected="${categoryKey === currentInventoryCategory ? "true" : "false"}"
      >
        ${escapeHtml(category.label)}
      </button>
    `)
    .join("");
}

function renderInventorySeasonButtons() {
  const seasons = DFY_INVENTORY_CATEGORIES[currentInventoryCategory]?.seasons || {};
  inventorySeasonButtons.innerHTML = Object.entries(seasons)
    .map(([seasonKey, season]) => `
      <button
        class="category-button${seasonKey === currentInventorySeason ? " is-active" : ""}"
        type="button"
        data-inventory-season="${seasonKey}"
        role="tab"
        aria-selected="${seasonKey === currentInventorySeason ? "true" : "false"}"
      >
        ${escapeHtml(season.label)}
      </button>
    `)
    .join("");
}

function renderMonthPickerSummary() {
  const [yearValue, monthValue] = currentMonth.split("-");
  monthPickerLabel.textContent = `${yearValue}년 ${monthValue}월`;
  if (!monthPickerPanel.hidden) {
    renderMonthPickerPanel();
  }
}

function renderHeadline() {
  const [yearValue, monthValue] = currentMonth.split("-").map(Number);
  monthHeadline.textContent = `${yearValue}년 ${monthValue}월 일별 매출정리`;
  monthSubcopy.textContent = "월별 기준값으로 집계되며, 하단 TOTAL 행에서 플랫폼별 주문건수와 매출 합계를 확인할 수 있습니다.";
}
function renderSummary() {
  const metrics = getMonthlyMetrics(currentMonth);
  if (document.activeElement !== expectedCostInput) {
    expectedCostInput.value = metrics.expectedCost ? formatNumber(metrics.expectedCost) : "";
  }
  breakEvenSalesValue.textContent = formatCurrency(metrics.breakEvenSales);
  breakEvenSalesValue.classList.add("break-even");
  targetSalesValue.textContent = formatCurrency(metrics.targetSales);
  currentSalesValue.textContent = formatCurrency(metrics.currentSales);
  dailyTargetValue.textContent = formatCurrency(metrics.dailyTargetSales);
  salesAchievementValue.textContent = formatPercent(metrics.salesAchievementRate);
  averageOrderValue.textContent = formatCurrency(metrics.averageOrderValue);
  settlementAovValue.textContent = formatCurrency(metrics.settlementAverageOrderValue);
  requiredOrdersValue.textContent = formatCount(metrics.requiredOrders);
  orderAchievementValue.textContent = formatPercent(metrics.orderAchievementRate);
  salesGapValue.textContent = formatSignedCurrency(metrics.currentSales - metrics.targetSales);
  orderGapValue.textContent = formatSignedCount(metrics.totalOrders - metrics.requiredOrders);
  applyMetricTone(salesAchievementValue, metrics.salesAchievementRate - 1);
  applyMetricTone(orderAchievementValue, metrics.orderAchievementRate - 1);
  applyMetricTone(salesGapValue, metrics.currentSales - metrics.targetSales);
  applyMetricTone(orderGapValue, metrics.totalOrders - metrics.requiredOrders);
}

function renderBody() {
  const monthRows = getMonthRows(currentMonth);
  salesTableBody.innerHTML = monthRows.map((row, index) => {
    const weekday = new Date(`${row.dateKey}T00:00:00`).getDay();
    const isToday = row.dateKey === todayKey;
    const dayClass = weekday === 0 ? "is-sunday" : weekday === 6 ? "is-saturday" : "";
    const todayClass = isToday ? " is-today" : "";
    const lastRowClass = index === monthRows.length - 1 ? " month-end" : "";
    const rowDelta = calculateDailyDelta(row);
    return `
      <tr class="${lastRowClass.trim()}" data-date="${row.dateKey}">
        <td class="date-cell sticky-col sticky-date${todayClass}">${formatDisplayDate(row.dateKey)}</td>
        <td class="day-cell sticky-col sticky-day group-end ${dayClass}${todayClass}">${DFY_DAY_LABELS[weekday]}</td>
        ${renderInputCell(row.dateKey, "musinsa", "orders")}
        ${renderInputCell(row.dateKey, "musinsa", "sales", true)}
        ${renderInputCell(row.dateKey, "ably", "orders")}
        ${renderInputCell(row.dateKey, "ably", "sales", true)}
        ${renderInputCell(row.dateKey, "kream", "orders")}
        ${renderInputCell(row.dateKey, "kream", "sales", true)}
        ${renderInputCell(row.dateKey, "official", "orders")}
        ${renderInputCell(row.dateKey, "official", "sales", true)}
        <td class="metric-cell" data-role="total-orders">${formatCellValue(calculateTotalOrders(row))}</td>
        <td class="metric-cell group-end" data-role="total-sales">${formatCellValue(calculateTotalSales(row))}</td>
        <td class="metric-cell ${rowDelta >= 0 ? "is-good" : "is-bad"}" data-role="daily-delta">${formatSignedNumber(rowDelta)}</td>
      </tr>
    `;
  }).join("");
}

function renderFooter() {
  const monthRows = getMonthRows(currentMonth);
  const totalsByPlatform = Object.fromEntries(DFY_PLATFORMS.map((platform) => [platform, { orders: 0, sales: 0 }]));
  monthRows.forEach((row) => {
    DFY_PLATFORMS.forEach((platform) => {
      totalsByPlatform[platform].orders += row[platform].orders;
      totalsByPlatform[platform].sales += row[platform].sales;
    });
  });
  const totalOrders = monthRows.reduce((sum, row) => sum + calculateTotalOrders(row), 0);
  const totalSales = monthRows.reduce((sum, row) => sum + calculateTotalSales(row), 0);
  const deltaTotal = monthRows.reduce((sum, row) => sum + calculateDailyDelta(row), 0);
  salesTableFoot.innerHTML = `
    <tr>
      <th class="sticky-col sticky-date total-label">TOTAL</th>
      <th class="sticky-col sticky-day total-label group-end"></th>
      ${DFY_PLATFORMS.map((platform) => `
        <td class="metric-cell">${formatCellValue(totalsByPlatform[platform].orders)}</td>
        <td class="metric-cell group-end">${formatCellValue(totalsByPlatform[platform].sales)}</td>
      `).join("")}
      <td class="metric-cell">${formatCellValue(totalOrders)}</td>
      <td class="metric-cell group-end">${formatCellValue(totalSales)}</td>
      <td class="metric-cell ${deltaTotal >= 0 ? "is-good" : "is-bad"}">${formatSignedNumber(deltaTotal)}</td>
    </tr>
  `;
}

function renderInputCell(dateKey, platform, field, isGroupEnd = false) {
  const value = getCellValue(dateKey, platform, field);
  return `
    <td class="${isGroupEnd ? "group-end" : ""}">
      <input class="table-input" type="text" inputmode="numeric" data-date="${dateKey}" data-platform="${platform}" data-field="${field}" placeholder="-" value="${value ? formatNumber(value) : ""}" aria-label="${formatDisplayDate(dateKey)} ${DFY_PLATFORM_LABELS[platform]} ${field === "orders" ? "주문건수" : "매출"}">
    </td>
  `;
}

function renderPlatformSalesChart() {
  const rows = getMonthRows(currentMonth);
  const maxSales = Math.max(0, ...rows.flatMap((row) => DFY_PLATFORMS.map((platform) => row[platform].sales)));
  platformSalesChart.innerHTML = rows.map((row) => {
    const bars = DFY_PLATFORMS.map((platform) => {
      const sales = row[platform].sales;
      const height = maxSales ? Math.max(4, Math.round((sales / maxSales) * 240)) : 4;
      return `<span class="platform-chart-bar ${platform}" style="height:${height}px" title="${DFY_PLATFORM_LABELS[platform]} ${formatCurrency(sales)}"></span>`;
    }).join("");
    return `<div class="platform-chart-day"><div class="platform-chart-bars">${bars}</div><div class="platform-chart-label">${formatDisplayDate(row.dateKey)}</div></div>`;
  }).join("");
}

function renderInsights() {
  const insight = getWeekdayInsight(currentMonth);
  const rankedWeekdays = [...insight.weekdays].sort((left, right) => right.average - left.average || left.index - right.index).map((item, index) => ({ ...item, rank: index + 1 }));
  const maxAverage = Math.max(...insight.weekdays.map((item) => item.average), 0);
  bestDayValue.textContent = insight.best ? `${formatDisplayDate(insight.best.dateKey)} (${insight.best.weekdayLabel}) ${formatCurrency(insight.best.sales)}` : "-";
  worstDayValue.textContent = insight.worst ? `${formatDisplayDate(insight.worst.dateKey)} (${insight.worst.weekdayLabel}) ${formatCurrency(insight.worst.sales)}` : "-";
  weekdayRankSummary.textContent = rankedWeekdays.some((item) => item.average > 0) ? rankedWeekdays.map((item) => item.label).join(" > ") : "-";
  weekdayChart.innerHTML = insight.weekdays.map((item) => {
    const height = maxAverage ? Math.max(8, Math.round((item.average / maxAverage) * 220)) : 8;
    return `<div class="weekday-bar-card"><span class="weekday-bar-value">${item.average ? formatNumber(item.average) : "-"}</span><div class="weekday-bar-track"><div class="weekday-bar" style="height:${height}px"></div></div><strong class="weekday-bar-label">${item.label}</strong></div>`;
  }).join("");
  weekdaySummaryBody.innerHTML = insight.weekdays.map((item) => {
    const ranked = rankedWeekdays.find((entry) => entry.label === item.label);
    return `<tr><td>${ranked?.rank || "-"}</td><td>${item.label}</td><td>${item.average ? formatCurrency(item.average) : "-"}</td></tr>`;
  }).join("");
}

function renderProductPage() {
  ensureProductMonthData(currentMonth);
  renderProductCategoryButtons();
  const [yearValue, monthValue] = currentMonth.split("-").map(Number);
  const divisor = getAverageDivisor(currentMonth);
  productPageHeadline.textContent = `${yearValue}년 ${monthValue}월 상품별 일일 매출 현황`;
  productAverageDivisor.textContent = String(divisor);
  renderProductLedgerHead();
  renderProductLedgerBody();
  renderProductLedgerFoot();
  renderProductCategoryChart();
}

function renderInventoryPage() {
  ensureInventoryItemsExist();
  renderInventoryCategoryButtons();
  renderInventorySeasonButtons();

  inventoryDateInput.value = currentInventoryDate;
  inventoryHeadline.textContent = "입출고 내역";
  inventoryDateCard.textContent = formatInventoryDate(currentInventoryDate);

  const summary = getInventoryDailySummary(currentInventoryDate);
  inventoryInboundCard.textContent = `+${formatNumber(summary.totalIn)}`;
  inventoryOutboundCard.textContent = `-${formatNumber(summary.totalOut)}`;

  renderInventoryTable();
  renderInventoryDailySummaryTable(summary.rows);
  renderInventoryHistoryTable();

  if (isInventoryEditModalOpen) {
    renderInventoryEditModal();
  }
}

function renderInventoryOverviewPage() {
  ensureInventoryItemsExist();
  inventoryOverviewHeadline.textContent = "재고관리 대시보드";
  renderInventoryOverviewCategoryButtons();
  renderInventoryForecastButtons();
  renderInventoryOverviewSections();
}

function renderInventoryOverviewCategoryButtons() {
  inventoryOverviewCategoryButtons.innerHTML = DFY_INVENTORY_CATEGORY_ORDER
    .filter((categoryKey) => categoryKey in DFY_INVENTORY_CATEGORIES)
    .map((categoryKey) => [categoryKey, DFY_INVENTORY_CATEGORIES[categoryKey]])
    .map(([categoryKey, category]) => `
      <button
        class="category-button${categoryKey === currentInventoryOverviewCategory ? " is-active" : ""}"
        type="button"
        data-inventory-overview-category="${categoryKey}"
        role="tab"
        aria-selected="${categoryKey === currentInventoryOverviewCategory ? "true" : "false"}"
      >
        ${escapeHtml(category.label)}
      </button>
    `)
    .join("");
}

function renderInventoryForecastButtons() {
  inventoryForecastButtons.innerHTML = [0, 1, 2, 3, 4]
    .map((weeks) => `
      <button
        class="category-button${weeks === currentInventoryForecastWeeks ? " is-active" : ""}"
        type="button"
        data-forecast-weeks="${weeks}"
        role="tab"
        aria-selected="${weeks === currentInventoryForecastWeeks ? "true" : "false"}"
      >
        ${weeks === 0 ? "현재고" : `${weeks}주`}
      </button>
    `)
    .join("");
}

function renderInventoryOverviewSections() {
  const inventoryState = ensureInventoryItemsExist();
  const category = DFY_INVENTORY_CATEGORIES[currentInventoryOverviewCategory];
  if (!category) {
    inventoryOverviewSections.innerHTML = "";
    return;
  }

  inventoryOverviewSections.innerHTML = Object.values(category.seasons).map((season) => {
    const rows = season.items.map((item, itemIndex) => {
      const record = inventoryState.items.find((entry) => entry.id === createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName))
        || createInventoryItemRecord(season, item, itemIndex);
      const sizes = Array.isArray(record.sizes) && record.sizes.length ? record.sizes : [...item.sizes];
      const isOsOnly = sizes.length === 1 && sizes[0] === "OS";
      return `
        <tr>
          <th class="inventory-item-name">${escapeHtml(record.name)}</th>
          ${renderInventoryStockGroup(inventoryState, record, sizes, isOsOnly)}
          ${renderInventoryForecastGroup(inventoryState, record, isOsOnly, currentInventoryForecastWeeks)}
        </tr>
      `;
    }).join("");

    return `
      <section class="inventory-season-card">
        <div class="inventory-season-card-top">
          <div>
            <p class="panel-kicker">Season</p>
            <h3>${escapeHtml(season.label)}</h3>
          </div>
          <p class="inventory-season-meta">${currentInventoryForecastWeeks === 0 ? "현재 재고 기준 보기" : `${currentMonth} 평균판매량 기준 · ${currentInventoryForecastWeeks}주 뒤 예상재고`}</p>
        </div>
        <div class="inventory-table-wrap">
          <table class="inventory-input-table inventory-overview-table">
            <thead>
              <tr>
                <th rowspan="2">품목명</th>
                <th class="inventory-group-header stock" colspan="2">현재재고</th>
                <th class="inventory-group-header inbound" colspan="2">${currentInventoryForecastWeeks === 0 ? "현재고" : `${currentInventoryForecastWeeks}주 뒤 예상재고`}</th>
              </tr>
              <tr>
                <th class="inventory-subheader stock">M</th>
                <th class="inventory-subheader stock">L</th>
                <th class="inventory-subheader inbound">M</th>
                <th class="inventory-subheader inbound">L</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    `;
  }).join("");
}

function calculateInventoryForecastValue(inventoryState, item, size, weeks) {
  const normalizedWeeks = normalizeInventoryForecastWeeks(weeks);
  const currentStock = getCurrentInventoryStockForRow(inventoryState, item, size);
  if (!normalizedWeeks) {
    return currentStock;
  }
  const averageSales = calculateInventoryAverageDailySales(currentMonth, item, size);
  return currentStock - (averageSales * normalizedWeeks * 7);
}

function calculateInventoryAverageDailySales(monthKey, item, size) {
  return DFY_PRODUCT_ROWS.reduce((sum, row) => {
    if (
      row.inventoryCategory !== item.category
      || row.inventoryName !== item.name
      || row.inventorySize !== size
    ) {
      return sum;
    }

    return sum + calculateProductRowAverage(monthKey, row.rowId);
  }, 0);
}

function renderInventoryForecastGroup(inventoryState, item, isOsOnly, weeks) {
  if (isOsOnly) {
    const projectedValue = calculateInventoryForecastValue(inventoryState, item, "OS", weeks);
    return `
      <td class="inventory-size-slot inventory-stock-cell">
        <div class="inventory-size-box is-readonly is-os-stock ${getInventoryStockToneClass(projectedValue)}">
          <span class="inventory-size-label">OS</span>
          <strong class="inventory-size-value">${formatRoundedStock(projectedValue)}</strong>
        </div>
      </td>
      <td class="inventory-size-slot inventory-empty-cell"></td>
    `;
  }

  return ["M", "L"].map((size) => {
    const projectedValue = calculateInventoryForecastValue(inventoryState, item, size, weeks);
    return `<td class="inventory-size-slot inventory-stock-cell"><div class="inventory-size-box is-readonly is-stock-center ${getInventoryStockToneClass(projectedValue)}"><strong class="inventory-size-value">${formatRoundedStock(projectedValue)}</strong></div></td>`;
  }).join("");
}

function openInventoryEditModal() {
  isInventoryEditModalOpen = true;
  renderInventoryEditModal();
  inventoryEditModal.hidden = false;
  const firstInput = inventoryEditBody.querySelector("input");
  if (firstInput instanceof HTMLInputElement) {
    firstInput.focus();
    firstInput.select();
  }
}

function closeInventoryEditModal() {
  isInventoryEditModalOpen = false;
  inventoryEditModal.hidden = true;
}

function renderInventoryEditModal() {
  const inventoryState = ensureInventoryItemsExist();
  const season = getCurrentInventorySeasonConfig();
  inventoryEditCaption.textContent = `${season.inventoryCategory} · ${season.label} 현재재고를 수정합니다.`;
  inventoryEditBody.innerHTML = season.items.map((item, itemIndex) => {
    const record = inventoryState.items.find((entry) => entry.id === createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName))
      || createInventoryItemRecord(season, item, itemIndex);
    const sizes = Array.isArray(record.sizes) && record.sizes.length ? record.sizes : [...item.sizes];
    const isOsOnly = sizes.length === 1 && sizes[0] === "OS";
    return `
      <tr>
        <th class="inventory-item-name">${escapeHtml(record.name)}</th>
        ${renderInventoryEditGroup(inventoryState, record, isOsOnly)}
      </tr>
    `;
  }).join("");
}

function renderInventoryEditGroup(inventoryState, item, isOsOnly) {
  if (isOsOnly) {
    return `
      <td class="inventory-size-slot">
        <div class="inventory-size-box">
          <span class="inventory-size-label">OS</span>
          <input
            class="inventory-edit-input"
            type="text"
            inputmode="numeric"
            data-item-id="${item.id}"
            data-size="OS"
            value="${formatNumber(getCurrentInventoryStockForRow(inventoryState, item, "OS"))}"
            placeholder="0"
          >
        </div>
      </td>
      <td class="inventory-size-slot inventory-empty-cell"></td>
    `;
  }

  return ["M", "L"].map((size) => `
    <td class="inventory-size-slot inventory-edit-cell">
      <input
        class="inventory-edit-input"
        type="text"
        inputmode="numeric"
        data-item-id="${item.id}"
        data-size="${size}"
        value="${formatNumber(getCurrentInventoryStockForRow(inventoryState, item, size))}"
        placeholder="0"
      >
    </td>
  `).join("");
}

function saveInventoryEditModal() {
  const inventoryState = ensureInventoryItemsExist();
  const inputs = Array.from(inventoryEditBody.querySelectorAll("input[data-item-id][data-size]"));
  inputs.forEach((input) => {
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const desiredCurrentStock = parseNumericValue(input.value);
    const item = inventoryState.items.find((entry) => entry.id === input.dataset.itemId);
    if (!item) {
      return;
    }
    const size = input.dataset.size;
    const movementTotal = getInventoryTransactions(inventoryState)
      .filter((transaction) => transaction.itemId === item.id && transaction.size === size)
      .reduce((sum, transaction) => sum + (transaction.type === "in" ? transaction.quantity : -transaction.quantity), 0);
    item.initialStock = { ...(item.initialStock || {}), [size]: desiredCurrentStock - movementTotal };
  });
  saveSharedInventoryState(inventoryState);
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);
  renderInventoryPage();
  renderInventoryOverviewPage();
  closeInventoryEditModal();
}

function renderInventoryTable() {
  const inventoryState = ensureInventoryItemsExist();
  const season = getCurrentInventorySeasonConfig();

  inventoryTableBody.innerHTML = season.items.map((item, itemIndex) => {
    const record = inventoryState.items.find((entry) => entry.id === createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName))
      || createInventoryItemRecord(season, item, itemIndex);
    const sizes = Array.isArray(record.sizes) && record.sizes.length ? record.sizes : [...item.sizes];
    const isOsOnly = sizes.length === 1 && sizes[0] === "OS";

    return `
      <tr data-item-id="${record.id}">
        <th class="inventory-item-name">${escapeHtml(record.name)}</th>
        ${renderInventoryStockGroup(inventoryState, record, sizes, isOsOnly)}
        ${renderInventoryInputGroup(record, sizes, "in", isOsOnly)}
        ${renderInventoryInputGroup(record, sizes, "out", isOsOnly)}
      </tr>
    `;
  }).join("");
}

function renderInventoryStockGroup(inventoryState, item, sizes, isOsOnly) {
  if (isOsOnly) {
    const currentStock = getCurrentInventoryStockForRow(inventoryState, item, "OS");
    return `
      <td class="inventory-size-slot inventory-stock-cell">
        <div class="inventory-size-box is-readonly is-os-stock ${getInventoryStockToneClass(currentStock)}">
          <span class="inventory-size-label">OS</span>
          <strong class="inventory-size-value">${formatNumber(currentStock)}</strong>
        </div>
      </td>
      <td class="inventory-size-slot inventory-empty-cell"></td>
    `;
  }

  return ["M", "L"].map((size) => {
    const currentStock = getCurrentInventoryStockForRow(inventoryState, item, size);
    return `<td class="inventory-size-slot inventory-stock-cell"><div class="inventory-size-box is-readonly is-stock-center ${getInventoryStockToneClass(currentStock)}"><strong class="inventory-size-value">${formatNumber(currentStock)}</strong></div></td>`;
  }).join("");
}

function renderInventoryInputGroup(item, sizes, type, isOsOnly) {
  if (isOsOnly) {
    const value = getInventoryTransactionQuantity(item.id, "OS", type, currentInventoryDate);
    const label = type === "in" ? "OS+" : "OS-";
    const gridCol = type === "in" ? 0 : 2;
    return `
      <td class="inventory-size-slot">${renderInventoryInputField(item, "OS", type, value, label, gridCol)}</td>
      <td class="inventory-size-slot inventory-empty-cell"></td>
    `;
  }

  return ["M", "L"].map((size, index) => {
    const value = getInventoryTransactionQuantity(item.id, size, type, currentInventoryDate);
    const label = type === "in" ? `${size}+` : `${size}-`;
    const gridCol = type === "in" ? index : index + 2;
    return `<td class="inventory-size-slot">${renderInventoryInputField(item, size, type, value, label, gridCol)}</td>`;
  }).join("");
}

function renderInventoryInputField(item, size, type, value, label, gridCol) {
  return `
    <div class="inventory-size-box">
      <span class="inventory-size-label">${escapeHtml(label)}</span>
      <input
        class="inventory-input inventory-grid-input"
        type="text"
        inputmode="numeric"
        data-item-id="${item.id}"
        data-size="${size}"
        data-type="${type}"
        data-grid-col="${gridCol}"
        value="${value ? formatNumber(value) : ""}"
        placeholder="0"
      >
    </div>
  `;
}

function renderInventoryDailySummaryTable(rows) {
  inventoryDailySummaryBody.innerHTML = rows.length
    ? rows.map((row) => `
      <tr>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.size)}</td>
        <td class="is-good">+${formatNumber(row.inbound)}</td>
        <td class="is-bad">-${formatNumber(row.outbound)}</td>
        <td>${formatSignedNumber(row.net)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="5">입력된 내역이 없습니다.</td></tr>`;
}

function renderInventoryHistoryTable() {
  const inventoryState = ensureInventoryItemsExist();
  const season = getCurrentInventorySeasonConfig();
  const rows = getInventoryTransactions(inventoryState)
    .filter((transaction) => transaction.date === currentInventoryDate)
    .filter((transaction) => transaction.category === season.inventoryCategory && transaction.season === season.inventorySeason)
    .sort((left, right) => {
      if (left.name === right.name) {
        return left.size.localeCompare(right.size, "ko");
      }
      return left.name.localeCompare(right.name, "ko");
    });

  inventoryHistoryBody.innerHTML = rows.length
    ? rows.map((transaction) => `
      <tr>
        <td>${formatInventoryDate(transaction.date)}</td>
        <td>${escapeHtml(transaction.season || "")}</td>
        <td>${escapeHtml(transaction.name || "")}</td>
        <td>${escapeHtml(transaction.size || "")}</td>
        <td>${transaction.type === "in" ? "입고" : "출고"}</td>
        <td>${formatNumber(transaction.quantity)}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="6">입출고 내역이 없습니다.</td></tr>`;
}

function renderProductLedgerHead() {
  const dateKeys = getDateKeysForMonth(currentMonth);
  const weekdayHeaders = dateKeys.map((dateKey) => {
    const weekday = new Date(`${dateKey}T00:00:00`).getDay();
    const classes = ["date-col", weekday === 0 ? "is-sunday" : "", weekday === 6 ? "is-saturday" : "", dateKey === todayKey ? "is-today" : ""].filter(Boolean).join(" ");
    return `<th class="${classes}">${DFY_DAY_LABELS[weekday]}</th>`;
  }).join("");
  const dateHeaders = dateKeys.map((dateKey) => {
    const weekday = new Date(`${dateKey}T00:00:00`).getDay();
    const classes = ["date-col", weekday === 0 ? "is-sunday" : "", weekday === 6 ? "is-saturday" : "", dateKey === todayKey ? "is-today" : ""].filter(Boolean).join(" ");
    return `<th class="${classes}">${formatDisplayDate(dateKey)}</th>`;
  }).join("");
  productLedgerHead.innerHTML = `<tr class="product-weekday-row"><th class="product-sticky-col product-head-name" rowspan="2">상품명</th><th class="product-sticky-col product-head-size" rowspan="2">사이즈</th><th class="product-sticky-col product-head-total" rowspan="2">합계</th><th class="product-sticky-col product-head-average" rowspan="2">평균판매량</th>${weekdayHeaders}</tr><tr class="product-date-row">${dateHeaders}</tr>`;
}

function renderProductLedgerBody() {
  const rows = getProductRowsForCategory(currentProductCategory);
  const dateKeys = getDateKeysForMonth(currentMonth);
  productLedgerBody.innerHTML = rows.map((row) => {
    const rowTotal = calculateProductRowTotal(currentMonth, row.rowId);
    const rowAverage = calculateProductRowAverage(currentMonth, row.rowId);
    const rowClass = row.itemIndex % 2 === 1 ? "group-alt" : "";
    return `<tr class="${rowClass}" data-row-id="${row.rowId}">${row.isFirstSize ? `<th class="product-sticky-col product-name-cell" rowspan="${row.rowSpan}">${escapeHtml(row.name)}</th>` : ""}<th class="product-sticky-col product-size-cell">${escapeHtml(row.size)}</th><td class="product-sticky-col product-total-cell" data-role="row-total">${formatCellValue(rowTotal)}</td><td class="product-sticky-col product-average-cell" data-role="row-average">${formatAverageCell(rowAverage, rowTotal)}</td>${dateKeys.map((dateKey) => renderProductInputCell(row.rowId, row.name, row.size, dateKey)).join("")}</tr>`;
  }).join("");
}

function renderProductInputCell(rowId, productName, size, dateKey) {
  const value = getProductCellValue(currentMonth, rowId, dateKey);
  return `<td><input class="product-input" type="text" inputmode="numeric" data-row-id="${rowId}" data-date="${dateKey}" placeholder="-" value="${value ? formatNumber(value) : ""}" aria-label="${formatDisplayDate(dateKey)} ${escapeHtml(productName)} ${size} 판매건수"></td>`;
}

function renderProductLedgerFoot() {
  const dateKeys = getDateKeysForMonth(currentMonth);
  const grandTotal = getProductRowsForCategory(currentProductCategory).reduce((sum, row) => sum + calculateProductRowTotal(currentMonth, row.rowId), 0);
  const grandAverage = calculateProductGrandAverage(currentMonth, currentProductCategory);
  productLedgerFoot.innerHTML = `<tr><th class="product-sticky-col product-name-cell product-footer-label">일자 합계</th><th class="product-sticky-col product-size-cell product-footer-spacer">-</th><th class="product-sticky-col product-total-cell product-footer-label">${formatCellValue(grandTotal)}</th><th class="product-sticky-col product-average-cell product-footer-label">${formatAverageCell(grandAverage, grandTotal)}</th>${dateKeys.map((dateKey) => `<td class="product-date-total" data-role="date-total" data-date="${dateKey}">${formatCellValue(calculateProductDateTotal(currentMonth, currentProductCategory, dateKey))}</td>`).join("")}</tr>`;
}

function renderProductCategoryChart() {
  const categoryTotals = Object.entries(DFY_PRODUCT_CATEGORIES).map(([categoryKey, category]) => ({
    categoryKey,
    label: category.label,
    total: calculateCategoryTotalForMonth(currentMonth, categoryKey)
  }));
  const maxTotal = Math.max(...categoryTotals.map((item) => item.total), 0);

  productCategoryChart.innerHTML = categoryTotals.map((item) => {
    const height = maxTotal ? Math.max(10, Math.round((item.total / maxTotal) * 220)) : 10;
    return `<div class="category-bar-card"><span class="category-bar-value">${formatCellValue(item.total)}</span><div class="category-bar-track"><div class="category-bar ${item.categoryKey}" style="height:${height}px"></div></div><strong class="category-bar-label">${item.label}</strong></div>`;
  }).join("");
}

function ensureInventoryItemsExist() {
  const inventoryState = loadSharedInventoryState();
  let hasChanges = false;

  Object.values(DFY_INVENTORY_CATEGORIES).forEach((category) => {
    Object.values(category.seasons).forEach((season) => {
      season.items.forEach((item, index) => {
        const itemId = createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName);
        const existingIndex = inventoryState.items.findIndex((entry) => entry.id === itemId);
        const desiredRecord = createInventoryItemRecord(season, item, index);

        if (existingIndex === -1) {
          hasChanges = true;
          inventoryState.items.push(desiredRecord);
          return;
        }

        const existingRecord = inventoryState.items[existingIndex];
        const existingSizes = Array.isArray(existingRecord.sizes) ? existingRecord.sizes : [];
        const desiredSizes = desiredRecord.sizes;
        const needsSizeMigration = existingSizes.join("|") !== desiredSizes.join("|");
        const preservedInitialStock = Object.fromEntries(
          desiredSizes.map((size) => [
            size,
            Number(
              existingRecord.initialStock?.[size]
              ?? existingRecord.initialStock?.OS
              ?? desiredRecord.initialStock?.[size]
              ?? desiredRecord.initialStock?.OS
              ?? 0
            ) || 0
          ])
        );
        const nextRecord = { ...existingRecord, ...desiredRecord, initialStock: preservedInitialStock };

        if (needsSizeMigration && desiredSizes.length === 1 && desiredSizes[0] === "OS") {
          const migratedStock = Number(
            existingRecord.initialStock?.OS
            ?? existingRecord.initialStock?.M
            ?? existingRecord.initialStock?.L
            ?? desiredRecord.initialStock.OS
            ?? 0
          ) || 0;
          nextRecord.initialStock = { OS: migratedStock };
          inventoryState.transactions = inventoryState.transactions.map((transaction) => (
            transaction.itemId === itemId ? { ...transaction, size: "OS" } : transaction
          ));
        } else if (needsSizeMigration) {
          nextRecord.initialStock = desiredRecord.initialStock;
        }

        if (
          needsSizeMigration
          || existingRecord.name !== nextRecord.name
          || existingRecord.category !== nextRecord.category
          || existingRecord.season !== nextRecord.season
          || JSON.stringify(existingRecord.initialStock || {}) !== JSON.stringify(nextRecord.initialStock || {})
          || existingRecord.displayOrder !== nextRecord.displayOrder
        ) {
          hasChanges = true;
          inventoryState.items[existingIndex] = nextRecord;
        }
      });
    });
  });

  if (hasChanges) {
    saveSharedInventoryState(inventoryState);
  }

  return inventoryState;
}

function loadSharedInventoryState() {
  try {
    const raw = localStorage.getItem(DFY_INVENTORY_STORAGE_KEY);
    if (!raw) {
      return normalizeSharedInventoryState({ items: [], transactions: [] });
    }

    return normalizeSharedInventoryState(JSON.parse(raw));
  } catch (error) {
    return normalizeSharedInventoryState({ items: [], transactions: [] });
  }
}

function saveSharedInventoryState(inventoryState, options = {}) {
  const normalizedState = normalizeSharedInventoryState(inventoryState);
  localStorage.setItem(DFY_INVENTORY_STORAGE_KEY, JSON.stringify(normalizedState));
  savePendingInventorySyncState(normalizedState);
  if (remoteBootstrapComplete) {
    queueRemoteInventorySave(normalizedState, options);
  }
}

function createInventoryItemId(season, category, name) {
  const slug = `${season}-${category}-${name}-기본`
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `item-${slug}`;
}

function createInventoryItemRecord(season, item, index) {
  const sizes = [...item.sizes];
  const initialStock = typeof item.defaultStock === "object" && item.defaultStock !== null
    ? Object.fromEntries(sizes.map((size) => [size, Number(item.defaultStock[size] ?? item.defaultStock.OS ?? 0) || 0]))
    : Object.fromEntries(sizes.map((size) => [size, Number(item.defaultStock) || 0]));
  return {
    id: createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName),
    name: item.inventoryName,
    baseName: item.inventoryName,
    familyName: item.inventoryName,
    color: "기본",
    season: season.inventorySeason,
    category: season.inventoryCategory,
    oneSize: sizes.length === 1 && sizes[0] === "OS",
    sizes,
    sizeLabel: sizes.length === 1 ? sizes[0] : sizes.join("/"),
    initialStock,
    displayOrder: index
  };
}

function getCurrentInventorySeasonConfig() {
  return DFY_INVENTORY_CATEGORIES[currentInventoryCategory].seasons[currentInventorySeason];
}

function getInventorySelectionRows(inventoryState) {
  const season = getCurrentInventorySeasonConfig();
  return season.items.flatMap((item, itemIndex) => {
    const record = inventoryState.items.find((entry) => entry.id === createInventoryItemId(season.inventorySeason, season.inventoryCategory, item.inventoryName))
      || createInventoryItemRecord(season, item, itemIndex);
    const sizes = Array.isArray(record.sizes) && record.sizes.length ? record.sizes : [...item.sizes];

    return sizes.map((size, sizeIndex) => ({
      item: record,
      size,
      itemIndex,
      rowSpan: sizes.length,
      isFirstSize: sizeIndex === 0
    }));
  });
}

function getInventoryTransactions(inventoryState) {
  return Array.isArray(inventoryState.transactions)
    ? inventoryState.transactions.filter((transaction) => transaction?.source !== DFY_INVENTORY_SYNC_SOURCE)
    : [];
}

function getCurrentInventoryStockForRow(inventoryState, item, size) {
  const initialStockMap = item.initialStock || {};
  const initialValue = Number(initialStockMap[size] ?? initialStockMap.OS ?? 0) || 0;

  return getInventoryTransactions(inventoryState)
    .filter((transaction) => transaction.itemId === item.id && transaction.size === size)
    .reduce((stock, transaction) => stock + (transaction.type === "in" ? transaction.quantity : -transaction.quantity), initialValue);
}

function getInventoryStockToneClass(value) {
  const numericValue = Number(value || 0);
  if (numericValue < 5) {
    return "is-critical";
  }
  if (numericValue < 10) {
    return "is-warning";
  }
  return "";
}

function getInventoryTransactionQuantity(itemId, size, type, dateKey) {
  const inventoryState = ensureInventoryItemsExist();
  return getInventoryTransactions(inventoryState)
    .filter((transaction) =>
      transaction.source === "dfy-inventory-page"
      && transaction.itemId === itemId
      && transaction.size === size
      && transaction.type === type
      && transaction.date === dateKey
    )
    .reduce((sum, transaction) => sum + Number(transaction.quantity || 0), 0);
}

function commitInventoryInput(input, shouldFormat) {
  const quantity = parseNumericValue(input.value);
  const inventoryState = ensureInventoryItemsExist();
  const nextTransactions = getInventoryTransactions(inventoryState).filter((transaction) => !(
    transaction.source === "dfy-inventory-page"
    && transaction.itemId === input.dataset.itemId
    && transaction.size === input.dataset.size
    && transaction.type === input.dataset.type
    && transaction.date === currentInventoryDate
  ));

  if (quantity > 0) {
    const item = inventoryState.items.find((entry) => entry.id === input.dataset.itemId);
    nextTransactions.push({
      id: `dfy-inventory-page-${currentInventoryDate}-${input.dataset.itemId}-${input.dataset.size}-${input.dataset.type}`,
      itemId: input.dataset.itemId,
      date: currentInventoryDate,
      type: input.dataset.type,
      quantity,
      size: input.dataset.size,
      source: "dfy-inventory-page",
      category: item?.category || "",
      season: item?.season || "",
      name: item?.name || ""
    });
  }

  inventoryState.transactions = nextTransactions;
  saveSharedInventoryState(inventoryState);
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);

  if (shouldFormat) {
    input.value = quantity ? formatNumber(quantity) : "";
  }

  renderInventoryPage();
}

function focusInventoryRowInput(input, direction) {
  const { rowIndex, colIndex } = getInventoryInputPosition(input);
  skipInventoryBlurCommit = true;
  commitInventoryInput(input, true);
  if (!focusInventoryInputByPosition(rowIndex + direction, colIndex)) {
    skipInventoryBlurCommit = false;
    input.blur();
  }
}

function focusInventoryColumnInput(input, direction) {
  const { rowIndex, colIndex } = getInventoryInputPosition(input);
  skipInventoryBlurCommit = true;
  commitInventoryInput(input, true);
  if (!focusInventoryInputByPosition(rowIndex, colIndex + direction)) {
    skipInventoryBlurCommit = false;
    input.blur();
  }
}

function handleInventoryArrowNavigation(event, input) {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    return false;
  }

  event.preventDefault();
  const { rowIndex, colIndex } = getInventoryInputPosition(input);
  skipInventoryBlurCommit = true;
  commitInventoryInput(input, true);
  const didFocus = event.key === "ArrowUp"
    ? focusInventoryInputByPosition(rowIndex - 1, colIndex)
    : event.key === "ArrowDown"
      ? focusInventoryInputByPosition(rowIndex + 1, colIndex)
      : event.key === "ArrowLeft"
        ? focusInventoryInputByPosition(rowIndex, colIndex - 1)
      : focusInventoryInputByPosition(rowIndex, colIndex + 1);

  if (!didFocus) {
    skipInventoryBlurCommit = false;
    input.blur();
  }

  return true;
}

function getInventoryInputPosition(input) {
  const currentRow = input.closest("tr");
  const rows = Array.from(inventoryTableBody.querySelectorAll("tr"));
  const rowIndex = rows.indexOf(currentRow);
  const gridCol = Number(input.dataset.gridCol);
  return { rowIndex, colIndex: Number.isNaN(gridCol) ? -1 : gridCol };
}

function focusInventoryInputByPosition(rowIndex, colIndex, horizontalDirection = 0) {
  const rows = Array.from(inventoryTableBody.querySelectorAll("tr"));
  const targetRow = rows[rowIndex];
  if (!targetRow) {
    return false;
  }

  const inputs = Array.from(targetRow.querySelectorAll("input[data-type]"));
  if (!inputs.length || colIndex < 0) {
    return false;
  }

  const exactInput = inputs.find((entry) => Number(entry.dataset.gridCol) === colIndex);
  let targetInput = exactInput || null;

  if (!targetInput && horizontalDirection === 0) {
    const fallbackCols = colIndex % 2 === 1 ? [colIndex - 1] : [colIndex + 1];
    targetInput = fallbackCols
      .map((candidate) => inputs.find((entry) => Number(entry.dataset.gridCol) === candidate))
      .find(Boolean) || null;
  }

  if (!targetInput && horizontalDirection !== 0) {
    for (let nextCol = colIndex; nextCol >= 0 && nextCol <= 3; nextCol += horizontalDirection) {
      targetInput = inputs.find((entry) => Number(entry.dataset.gridCol) === nextCol) || null;
      if (targetInput) {
        break;
      }
    }
  }

  if (!(targetInput instanceof HTMLInputElement)) {
    return false;
  }

  targetInput.focus();
  targetInput.select();
  return true;
}

function getInventoryDailySummary(dateKey) {
  const inventoryState = ensureInventoryItemsExist();
  const season = getCurrentInventorySeasonConfig();
  const rows = getInventoryTransactions(inventoryState)
    .filter((transaction) => transaction.date === dateKey)
    .filter((transaction) => transaction.category === season.inventoryCategory && transaction.season === season.inventorySeason)
    .reduce((map, transaction) => {
      const key = `${transaction.name}|${transaction.size}`;
      if (!map.has(key)) {
        map.set(key, {
          name: transaction.name,
          size: transaction.size,
          inbound: 0,
          outbound: 0,
          net: 0
        });
      }

      const row = map.get(key);
      if (transaction.type === "in") {
        row.inbound += Number(transaction.quantity || 0);
      } else {
        row.outbound += Number(transaction.quantity || 0);
      }
      row.net = row.inbound - row.outbound;
      return map;
    }, new Map());

  const summaryRows = Array.from(rows.values()).sort((left, right) => left.name.localeCompare(right.name, "ko"));

  return {
    totalIn: summaryRows.reduce((sum, row) => sum + row.inbound, 0),
    totalOut: summaryRows.reduce((sum, row) => sum + row.outbound, 0),
    rows: summaryRows
  };
}
function updateCellFromInput(input, shouldFormat) {
  const { date, platform, field } = input.dataset;
  const nextValue = parseNumericValue(input.value);
  state.rows[date][platform][field] = nextValue;
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);
  queueRemoteSave([date]);
  if (shouldFormat) {
    input.value = nextValue ? formatNumber(nextValue) : "";
  }
  refreshRowMetrics(date);
  renderSummary();
  renderFooter();
  renderPlatformSalesChart();
  renderInsights();
}

function updateProductCellFromInput(input, shouldFormat) {
  const { rowId, date } = input.dataset;
  const nextValue = parseNumericValue(input.value);
  setProductCellValue(currentMonth, rowId, date, nextValue);
  markPendingProductSyncEntry(currentMonth, rowId, date);
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);
  queueRemoteProductSave([{ monthKey: currentMonth, rowId, dateKey: date }]);
  if (shouldFormat) {
    input.value = nextValue ? formatNumber(nextValue) : "";
  }
  refreshProductRowMetrics(rowId);
  refreshProductFooterTotals();
  renderProductCategoryChart();
}

function updateMonthMeta(field, value, shouldFormat) {
  const meta = getMonthMeta(currentMonth);
  meta[field] = Math.max(0, Number(value) || 0);
  const monthKeys = getMonthRows(currentMonth).map((row) => row.dateKey);
  syncDailyTargetFromMeta(currentMonth);
  queueRemoteSave(monthKeys);
  refreshAllRowMetrics();
  renderFooter();
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);
  renderSummary();
  renderPlatformSalesChart();
  renderInsights();
  if (shouldFormat) {
    expectedCostInput.value = meta[field] ? formatNumber(meta[field]) : "";
  }
}

function focusNextSalesInput(input) {
  updateCellFromInput(input, true);
  const currentRow = input.closest("tr");
  const nextRow = currentRow?.nextElementSibling;
  if (!nextRow) {
    input.blur();
    return;
  }
  const nextInput = nextRow.querySelector(`input[data-platform="${input.dataset.platform}"][data-field="${input.dataset.field}"]`);
  if (!nextInput) {
    input.blur();
    return;
  }
  nextInput.focus();
  nextInput.select();
}

function handleSalesArrowNavigation(event, input) {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return false;
  event.preventDefault();
  updateCellFromInput(input, true);
  const currentRow = input.closest("tr");
  if (!currentRow) return true;
  let targetInput = null;
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    const siblingRow = event.key === "ArrowUp" ? currentRow.previousElementSibling : currentRow.nextElementSibling;
    targetInput = siblingRow?.querySelector(`input[data-platform="${input.dataset.platform}"][data-field="${input.dataset.field}"]`) || null;
  } else {
    const inputs = Array.from(currentRow.querySelectorAll("input[data-date]"));
    const currentIndex = inputs.indexOf(input);
    if (currentIndex !== -1) {
      const nextIndex = event.key === "ArrowLeft" ? currentIndex - 1 : currentIndex + 1;
      targetInput = inputs[nextIndex] || null;
    }
  }
  if (targetInput) {
    targetInput.focus();
    targetInput.select();
  } else {
    input.blur();
  }
  return true;
}

function focusNextProductInput(input) {
  updateProductCellFromInput(input, true);
  const currentRow = input.closest("tr");
  const nextRow = currentRow?.nextElementSibling;
  if (!nextRow) {
    input.blur();
    return;
  }
  const nextInput = nextRow.querySelector(`input[data-date="${input.dataset.date}"]`);
  if (!nextInput) {
    input.blur();
    return;
  }
  nextInput.focus();
  nextInput.select();
}

function handleProductArrowNavigation(event, input) {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return false;
  event.preventDefault();
  updateProductCellFromInput(input, true);
  const currentRow = input.closest("tr");
  if (!currentRow) return true;
  let targetInput = null;
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    const siblingRow = event.key === "ArrowUp" ? currentRow.previousElementSibling : currentRow.nextElementSibling;
    targetInput = siblingRow?.querySelector(`input[data-date="${input.dataset.date}"]`) || null;
  } else {
    const inputs = Array.from(currentRow.querySelectorAll("input[data-date]"));
    const currentIndex = inputs.indexOf(input);
    if (currentIndex !== -1) {
      const nextIndex = event.key === "ArrowLeft" ? currentIndex - 1 : currentIndex + 1;
      targetInput = inputs[nextIndex] || null;
    }
  }
  if (targetInput) {
    targetInput.focus();
    targetInput.select();
  } else {
    input.blur();
  }
  return true;
}

function refreshAllRowMetrics() { getMonthRows(currentMonth).forEach((row) => refreshRowMetrics(row.dateKey)); }

function refreshRowMetrics(dateKey) {
  const rowData = state.rows[dateKey];
  const rowElement = salesTableBody.querySelector(`tr[data-date="${dateKey}"]`);
  if (!rowData || !rowElement) return;
  const totalOrders = calculateTotalOrders(rowData);
  const totalSales = calculateTotalSales(rowData);
  const delta = calculateDailyDelta(rowData);
  const totalOrdersCell = rowElement.querySelector('[data-role="total-orders"]');
  const totalSalesCell = rowElement.querySelector('[data-role="total-sales"]');
  const deltaCell = rowElement.querySelector('[data-role="daily-delta"]');
  totalOrdersCell.textContent = formatCellValue(totalOrders);
  totalSalesCell.textContent = formatCellValue(totalSales);
  deltaCell.textContent = formatSignedNumber(delta);
  deltaCell.classList.toggle("is-good", delta >= 0);
  deltaCell.classList.toggle("is-bad", delta < 0);
}

function refreshProductRowMetrics(rowId) {
  const rowElement = productLedgerBody.querySelector(`tr[data-row-id="${rowId}"]`);
  if (!rowElement) return;
  const totalCell = rowElement.querySelector('[data-role="row-total"]');
  const averageCell = rowElement.querySelector('[data-role="row-average"]');
  const total = calculateProductRowTotal(currentMonth, rowId);
  totalCell.textContent = formatCellValue(total);
  averageCell.textContent = formatAverageCell(calculateProductRowAverage(currentMonth, rowId), total);
}

function refreshProductFooterTotals() {
  const footRow = productLedgerFoot.querySelector("tr");
  if (!footRow) return;
  const rows = getProductRowsForCategory(currentProductCategory);
  const grandTotal = rows.reduce((sum, row) => sum + calculateProductRowTotal(currentMonth, row.rowId), 0);
  footRow.children[2].textContent = formatCellValue(grandTotal);
  footRow.children[3].textContent = formatAverageCell(calculateProductGrandAverage(currentMonth, currentProductCategory), grandTotal);
  productLedgerFoot.querySelectorAll('[data-role="date-total"]').forEach((cell) => {
    cell.textContent = formatCellValue(calculateProductDateTotal(currentMonth, currentProductCategory, cell.dataset.date));
  });
}

function getWeekdayInsight(monthKey) {
  const weekdayBuckets = [
    { label: "월", total: 0, count: 0, average: 0, index: 0 },
    { label: "화", total: 0, count: 0, average: 0, index: 1 },
    { label: "수", total: 0, count: 0, average: 0, index: 2 },
    { label: "목", total: 0, count: 0, average: 0, index: 3 },
    { label: "금", total: 0, count: 0, average: 0, index: 4 },
    { label: "토", total: 0, count: 0, average: 0, index: 5 },
    { label: "일", total: 0, count: 0, average: 0, index: 6 }
  ];
  const filledRows = getMonthRows(monthKey).map((row) => ({ dateKey: row.dateKey, sales: calculateTotalSales(row), weekday: getWeekdayMondayIndex(row.dateKey) })).filter((row) => row.sales > 0);
  filledRows.forEach((row) => { weekdayBuckets[row.weekday].total += row.sales; weekdayBuckets[row.weekday].count += 1; });
  weekdayBuckets.forEach((bucket) => { bucket.average = bucket.count ? Math.round(bucket.total / bucket.count) : 0; });
  const best = filledRows.length ? filledRows.reduce((top, row) => (row.sales > top.sales ? row : top), filledRows[0]) : null;
  const worst = filledRows.length ? filledRows.reduce((low, row) => (row.sales < low.sales ? row : low), filledRows[0]) : null;
  return { weekdays: weekdayBuckets, best: best ? { ...best, weekdayLabel: weekdayBuckets[best.weekday].label } : null, worst: worst ? { ...worst, weekdayLabel: weekdayBuckets[worst.weekday].label } : null };
}

function getMonthlyMetrics(monthKey) {
  const rows = getMonthRows(monthKey);
  const daysInMonth = getDaysInMonth(monthKey);
  const meta = getMonthMeta(monthKey);
  const totalOrders = rows.reduce((sum, row) => sum + calculateTotalOrders(row), 0);
  const currentSales = rows.reduce((sum, row) => sum + calculateTotalSales(row), 0);
  const averageOrderValueRaw = totalOrders ? currentSales / totalOrders : 0;
  const settlementAovRaw = averageOrderValueRaw * 0.7;
  const requiredOrdersRaw = settlementAovRaw ? meta.expectedCost / settlementAovRaw : 0;
  const requiredOrders = Math.ceil(requiredOrdersRaw);
  const breakEvenSales = Math.round(averageOrderValueRaw * requiredOrders);
  const targetSales = Math.round(breakEvenSales * 1.5);
  const dailyTargetSales = daysInMonth ? Math.round(targetSales / daysInMonth) : 0;
  const salesAchievementRate = targetSales ? currentSales / targetSales : 0;
  const orderAchievementRate = requiredOrders ? totalOrders / requiredOrders : 0;
  return { totalOrders, currentSales, breakEvenSales, targetSales, dailyTargetSales, expectedCost: meta.expectedCost, averageOrderValue: Math.round(averageOrderValueRaw), settlementAverageOrderValue: Math.round(settlementAovRaw), requiredOrders, salesAchievementRate, orderAchievementRate };
}

function getMonthMeta(monthKey) { state.meta = state.meta || {}; if (!state.meta[monthKey]) { state.meta[monthKey] = { expectedCost: 0 }; } return state.meta[monthKey]; }

function ensureMonthData(monthKey) {
  const [yearValue, monthValue] = monthKey.split("-").map(Number);
  const daysInMonth = new Date(yearValue, monthValue, 0).getDate();
  const defaultTarget = getMonthTarget(monthKey);
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${monthKey}-${pad(day)}`;
    if (!state.rows[dateKey]) state.rows[dateKey] = createEmptyRow(defaultTarget);
    else state.rows[dateKey] = normalizeRow(state.rows[dateKey], defaultTarget);
  }
  getMonthMeta(monthKey);
  syncDailyTargetFromMeta(monthKey);
}

function ensureProductMonthData(monthKey) {
  state.productLedger = state.productLedger || {};
  if (!state.productLedger[monthKey]) state.productLedger[monthKey] = {};
  getProductRowsForCategory(currentProductCategory).forEach((row) => {
    if (!state.productLedger[monthKey][row.rowId]) state.productLedger[monthKey][row.rowId] = {};
  });
}

function getMonthTarget(monthKey) {
  const existingRow = getMonthRows(monthKey).find((row) => row.dailyTarget > 0);
  return existingRow?.dailyTarget || 0;
}

function syncDailyTargetFromMeta(monthKey) {
  const daysInMonth = getDaysInMonth(monthKey);
  const targetSales = calculateMonthlyTargetSales(monthKey);
  const dailyTarget = daysInMonth ? Math.round(targetSales / daysInMonth) : 0;
  getMonthRows(monthKey).forEach((row) => { state.rows[row.dateKey].dailyTarget = dailyTarget; });
  return dailyTarget;
}

function calculateBreakEvenSales(monthKey) {
  const rows = getMonthRows(monthKey);
  const totalOrders = rows.reduce((sum, row) => sum + calculateTotalOrders(row), 0);
  const currentSales = rows.reduce((sum, row) => sum + calculateTotalSales(row), 0);
  const expectedCost = getMonthMeta(monthKey).expectedCost;
  const averageOrderValueRaw = totalOrders ? currentSales / totalOrders : 0;
  const settlementAov = averageOrderValueRaw * 0.7;
  const requiredOrders = settlementAov ? Math.ceil(expectedCost / settlementAov) : 0;
  return Math.round(averageOrderValueRaw * requiredOrders);
}

function calculateMonthlyTargetSales(monthKey) { return Math.round(calculateBreakEvenSales(monthKey) * 1.5); }
function getMonthRows(monthKey) { return Object.keys(state.rows).filter((dateKey) => dateKey.startsWith(monthKey)).sort().map((dateKey) => ({ dateKey, ...state.rows[dateKey] })); }
function getCellValue(dateKey, platform, field) { return state.rows[dateKey]?.[platform]?.[field] || 0; }
function createEmptyRow(target = DFY_DEFAULT_TARGET) { return { musinsa: { orders: 0, sales: 0 }, ably: { orders: 0, sales: 0 }, kream: { orders: 0, sales: 0 }, official: { orders: 0, sales: 0 }, dailyTarget: target || DFY_DEFAULT_TARGET }; }
function normalizeRow(row, fallbackTarget = DFY_DEFAULT_TARGET) { const normalized = createEmptyRow(fallbackTarget); DFY_PLATFORMS.forEach((platform) => { normalized[platform].orders = Math.max(0, Number(row?.[platform]?.orders) || 0); normalized[platform].sales = Math.max(0, Number(row?.[platform]?.sales) || 0); }); normalized.dailyTarget = Math.max(0, Number(row?.dailyTarget) || fallbackTarget); return normalized; }
function calculateTotalOrders(row) { return DFY_PLATFORMS.reduce((sum, platform) => sum + row[platform].orders, 0); }
function calculateTotalSales(row) { return DFY_PLATFORMS.reduce((sum, platform) => sum + row[platform].sales, 0); }
function calculateDailyDelta(row) { return calculateTotalSales(row) - row.dailyTarget; }
function getProductRowsForCategory(categoryKey) { return DFY_PRODUCT_ROWS.filter((row) => row.categoryKey === categoryKey); }
function getDateKeysForMonth(monthKey) { const daysInMonth = getDaysInMonth(monthKey); return Array.from({ length: daysInMonth }, (_, index) => `${monthKey}-${pad(index + 1)}`); }
function getProductCellValue(monthKey, rowId, dateKey) { return state.productLedger?.[monthKey]?.[rowId]?.[dateKey] || 0; }
function setProductCellValue(monthKey, rowId, dateKey, value) { ensureProductMonthData(monthKey); const monthLedger = state.productLedger[monthKey]; if (!monthLedger[rowId]) monthLedger[rowId] = {}; if (value > 0) { monthLedger[rowId][dateKey] = value; return; } delete monthLedger[rowId][dateKey]; }
function calculateProductRowTotal(monthKey, rowId) { return getDateKeysForMonth(monthKey).reduce((sum, dateKey) => sum + getProductCellValue(monthKey, rowId, dateKey), 0); }
function calculateProductRowAverage(monthKey, rowId) { const divisor = getAverageDivisor(monthKey); return divisor ? calculateProductRowTotal(monthKey, rowId) / divisor : 0; }
function calculateProductDateTotal(monthKey, categoryKey, dateKey) { return getProductRowsForCategory(categoryKey).reduce((sum, row) => sum + getProductCellValue(monthKey, row.rowId, dateKey), 0); }
function calculateProductGrandAverage(monthKey, categoryKey) { const divisor = getAverageDivisor(monthKey); const grandTotal = getProductRowsForCategory(categoryKey).reduce((sum, row) => sum + calculateProductRowTotal(monthKey, row.rowId), 0); return divisor ? grandTotal / divisor : 0; }
function calculateCategoryTotalForMonth(monthKey, categoryKey) { return getProductRowsForCategory(categoryKey).reduce((sum, row) => sum + calculateProductRowTotal(monthKey, row.rowId), 0); }
function getAverageDivisor(monthKey) { const daysInMonth = getDaysInMonth(monthKey); return Math.max(1, Math.min(today.getDate(), daysInMonth)); }
function shiftPage(delta) { const currentIndex = DFY_PAGE_ORDER.indexOf(currentPage); const nextPage = DFY_PAGE_ORDER[currentIndex + delta]; if (!nextPage) return; setCurrentPage(nextPage); }
function setCurrentPage(pageKey, options = {}) {
  const nextPage = normalizePageKey(pageKey);
  if (nextPage === currentPage) return;
  currentPage = nextPage;
  saveState(`자동 저장됨 · ${formatTime(new Date())}`);
  syncPageHistory(Boolean(options.replace));
  renderPageFrame();
  queueTodayInputFocus(currentPage);
}
function syncPageHistory(replace = false) {
  const pageState = { page: currentPage };
  if (replace) {
    window.history.replaceState(pageState, "", window.location.href);
    return;
  }
  window.history.pushState(pageState, "", window.location.href);
}
function toggleMonthPicker() { if (monthPickerPanel.hidden) { openMonthPicker(); return; } closeMonthPicker(); }
function openMonthPicker() { pickerYear = Number(currentMonth.slice(0, 4)); monthPickerPanel.hidden = false; monthPickerButton.setAttribute("aria-expanded", "true"); renderMonthPickerPanel(); }
function closeMonthPicker() { monthPickerPanel.hidden = true; monthPickerButton.setAttribute("aria-expanded", "false"); }
function shiftPickerYear(delta) { pickerYear += delta; renderMonthPickerPanel(); }
function renderMonthPickerPanel() { const selectedYear = Number(currentMonth.slice(0, 4)); const selectedMonth = currentMonth.slice(5, 7); pickerYearLabel.textContent = `${pickerYear}년`; monthGrid.innerHTML = DFY_MONTH_LABELS.map((label, index) => { const monthValue = pad(index + 1); const monthKey = `${pickerYear}-${monthValue}`; const selectedClass = pickerYear === selectedYear && monthValue === selectedMonth ? " is-selected" : ""; const currentClass = monthKey === todayMonthKey ? " is-current" : ""; return `<button class="month-option${selectedClass}${currentClass}" type="button" data-month="${monthValue}" role="option" aria-selected="${selectedClass ? "true" : "false"}">${label}</button>`; }).join(""); }
function setCurrentMonth(monthKey) { currentMonth = monthKey; pickerYear = Number(monthKey.slice(0, 4)); ensureMonthData(currentMonth); ensureProductMonthData(currentMonth); saveState(`자동 저장됨 · ${formatTime(new Date())}`); render(); queueTodayInputFocus(currentPage); }
function createInventoryLookupKey(category, name) { return `${String(category || "").trim()}::${String(name || "").trim()}`; }
function normalizeMonthKey(value) { return /^\d{4}-\d{2}$/.test(String(value || "")) ? value : ""; }
function normalizePageKey(value) { return DFY_PAGE_ORDER.includes(value) ? value : "summary"; }
function normalizeCategoryKey(value) { return Object.prototype.hasOwnProperty.call(DFY_PRODUCT_CATEGORIES, value) ? value : getDefaultCategoryKey(); }
function getDefaultCategoryKey() { return Object.keys(DFY_PRODUCT_CATEGORIES)[0]; }
function normalizeInventoryCategoryKey(value) { return Object.prototype.hasOwnProperty.call(DFY_INVENTORY_CATEGORIES, value) ? value : getDefaultInventoryCategoryKey(); }
function getDefaultInventoryCategoryKey() { return Object.keys(DFY_INVENTORY_CATEGORIES)[0]; }
function normalizeInventoryForecastWeeks(value) { return [0, 1, 2, 3, 4].includes(Number(value)) ? Number(value) : 1; }
function normalizeInventorySeasonKey(categoryKey, seasonKey) {
  const seasons = DFY_INVENTORY_CATEGORIES[categoryKey]?.seasons || {};
  return Object.prototype.hasOwnProperty.call(seasons, seasonKey) ? seasonKey : getDefaultInventorySeasonKey(categoryKey);
}
function getDefaultInventorySeasonKey(categoryKey) { return Object.keys(DFY_INVENTORY_CATEGORIES[categoryKey]?.seasons || {})[0] || ""; }
function normalizeInventoryDateKey(value) { return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) ? value : ""; }
function parseNumericValue(value) { const numeric = String(value || "").replace(/[^\d]/g, ""); return numeric ? Number(numeric) : 0; }
function formatNumber(value) { return Number(value || 0).toLocaleString("ko-KR"); }
function formatRoundedStock(value) { return Math.round(Number(value) || 0).toLocaleString("ko-KR"); }
function formatCellValue(value) { return value ? formatNumber(value) : "-"; }
function formatAverageCell(value, baseValue = value) { return baseValue ? Number(value || 0).toLocaleString("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "-"; }
function formatCurrency(value) { return `${formatNumber(Math.round(value || 0))}원`; }
function formatCount(value) { return `${formatNumber(Math.round(value || 0))}건`; }
function formatSignedCurrency(value) { const rounded = Math.round(value || 0); const absolute = formatNumber(Math.abs(rounded)); if (rounded > 0) return `+${absolute}원`; if (rounded < 0) return `-${absolute}원`; return "0원"; }
function formatSignedCount(value) { const rounded = Math.round(value || 0); const absolute = formatNumber(Math.abs(rounded)); if (rounded > 0) return `+${absolute}건`; if (rounded < 0) return `-${absolute}건`; return "0건"; }
function formatPercent(value) { return `${((value || 0) * 100).toFixed(1)}%`; }
function formatSignedNumber(value) { const absolute = formatNumber(Math.abs(value)); if (value > 0) return `+${absolute}`; if (value < 0) return `-${absolute}`; return "0"; }
function formatDisplayDate(dateKey) { const [, monthValue, dayValue] = dateKey.split("-"); return `${Number(monthValue)}/${Number(dayValue)}`; }
function formatInventoryDate(dateKey) { const [yearValue, monthValue, dayValue] = String(dateKey || "").split("-"); return yearValue && monthValue && dayValue ? `${yearValue}. ${monthValue}. ${dayValue}.` : "-"; }
function getWeekdayMondayIndex(dateKey) { const weekday = new Date(`${dateKey}T00:00:00`).getDay(); return weekday === 0 ? 6 : weekday - 1; }
function getDaysInMonth(monthKey) { const [yearValue, monthValue] = monthKey.split("-").map(Number); return new Date(yearValue, monthValue, 0).getDate(); }
function formatMonthKey(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`; }
function formatDateKey(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
function pad(value) { return String(value).padStart(2, "0"); }
function formatTime(date) { return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }); }
function queueTodayInputFocus(pageKey) {
  if (!todayKey.startsWith(currentMonth)) {
    return;
  }

  window.requestAnimationFrame(() => {
    if (pageKey === "summary") {
      const targetInput = salesTableBody.querySelector(`tr[data-date="${todayKey}"] input[data-platform="musinsa"][data-field="orders"]`);
      if (targetInput instanceof HTMLInputElement) {
        targetInput.focus();
        targetInput.select();
      }
      return;
    }

    if (pageKey === "products") {
      const targetInput = productLedgerBody.querySelector(`input[data-date="${todayKey}"]`);
      if (targetInput instanceof HTMLInputElement) {
        targetInput.focus();
        targetInput.select();
      }
    }
  });
}
function markRemoteSensitiveEdit() { lastRemoteSensitiveEditAt = Date.now(); }
function applyMetricTone(element, delta) { element.classList.toggle("is-good", delta >= 0); element.classList.toggle("is-bad", delta < 0); }
function cloneRows(rows) { return JSON.parse(JSON.stringify(rows)); }
function slugify(value) { return String(value || "").toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, ""); }
function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;"); }

function cleanupLegacyProductLedgerInventorySync() {
  try {
    const inventoryState = loadSharedInventoryState();
    if (!inventoryState || !Array.isArray(inventoryState.items)) return;
    const originalTransactions = Array.isArray(inventoryState.transactions) ? inventoryState.transactions : [];
    const retainedTransactions = originalTransactions.filter((transaction) => transaction?.source !== DFY_INVENTORY_SYNC_SOURCE);
    const hasLegacyTransactions = retainedTransactions.length !== originalTransactions.length;
    const hasLegacyMeta = Boolean(inventoryState.dfyProductSalesSync);
    if (!hasLegacyTransactions && !hasLegacyMeta) {
      return;
    }
    inventoryState.transactions = retainedTransactions;
    inventoryState.dfyProductSalesSync = null;
    saveSharedInventoryState(inventoryState, { silentRemote: true });
  } catch (error) {
    return;
  }
}

function saveState(message) {
  state.ui = {
    currentMonth,
    currentPage,
    currentProductCategory,
    currentInventoryCategory,
    currentInventorySeason,
    currentInventoryOverviewCategory,
    currentInventoryForecastWeeks,
    currentInventoryDate
  };
  localStorage.setItem(DFY_STORAGE_KEY, JSON.stringify(state));
  saveMessage = message;
  saveIndicator.textContent = saveMessage;
}

function queueRemoteSave(dateKeys) {
  if (!supabaseClient || !dateKeys.length) return;
  dateKeys.forEach((dateKey) => pendingRemoteKeys.add(dateKey));
  if (remoteSaveTimer) clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(() => {
    const keysToSave = Array.from(pendingRemoteKeys);
    pendingRemoteKeys = new Set();
    void upsertRowsToSupabase(keysToSave);
  }, 300);
}

async function hydrateFromSupabase() {
  if (!supabaseClient || isRemoteHydrating) return;
  isRemoteHydrating = true;
  try {
    await hydrateSalesFromSupabase();
    await hydrateProductLedgerFromSupabase();
    await hydrateInventoryStateFromSupabase();
    remoteBootstrapComplete = true;
    cleanupLegacyProductLedgerInventorySync();
    saveState("Supabase 데이터 동기화 완료");
    render();
  } finally {
    isRemoteHydrating = false;
  }
}

async function hydrateSalesFromSupabase() {
  const { data, error } = await supabaseClient.from(DFY_REMOTE_TABLE).select("*").order("sales_date", { ascending: true });
  if (error) {
    console.error("Supabase hydrate failed", error);
    saveIndicator.textContent = `Supabase 불러오기 실패 · ${error.message || "오류"}`;
    return;
  }
  data.forEach((record) => {
    const monthKey = String(record.sales_date || "").slice(0, 7);
    if (monthKey) {
      getMonthMeta(monthKey).expectedCost = Math.max(0, Number(record.expected_cost) || 0);
    }
    state.rows[record.sales_date] = normalizeRow({
      musinsa: { orders: record.musinsa_orders, sales: record.musinsa_sales },
      ably: { orders: record.ably_orders, sales: record.ably_sales },
      kream: { orders: record.kream_orders, sales: record.kream_sales },
      official: { orders: record.official_orders, sales: record.official_sales },
      dailyTarget: record.daily_target
    }, DFY_DEFAULT_TARGET);
  });
}

async function upsertRowsToSupabase(dateKeys) {
  if (!supabaseClient || !dateKeys.length) return;
  const payload = dateKeys.map((dateKey) => {
    const row = state.rows[dateKey];
    const monthKey = String(dateKey).slice(0, 7);
    return {
      sales_date: dateKey,
      musinsa_orders: row.musinsa.orders,
      musinsa_sales: row.musinsa.sales,
      ably_orders: row.ably.orders,
      ably_sales: row.ably.sales,
      kream_orders: row.kream.orders,
      kream_sales: row.kream.sales,
      official_orders: row.official.orders,
      official_sales: row.official.sales,
      expected_cost: getMonthMeta(monthKey).expectedCost,
      daily_target: row.dailyTarget
    };
  });
  const { error } = await supabaseClient.from(DFY_REMOTE_TABLE).upsert(payload, { onConflict: "sales_date" });
  if (error) {
    console.error("Supabase upsert failed", error, payload);
    saveIndicator.textContent = `Supabase 저장 실패 · ${error.message || "오류"}`;
    return;
  }
  saveIndicator.textContent = `Supabase 저장 완료 · ${formatTime(new Date())}`;
}

function queueRemoteProductSave(entries) {
  if (!supabaseClient || !entries.length) return;
  entries.forEach((entry) => pendingRemoteProductKeys.add(createRemoteProductEntryKey(entry.dateKey, entry.rowId)));
  if (remoteProductSaveTimer) {
    clearTimeout(remoteProductSaveTimer);
    remoteProductSaveTimer = null;
  }
  const keysToSave = Array.from(pendingRemoteProductKeys);
  pendingRemoteProductKeys = new Set();
  void upsertProductLedgerToSupabase(keysToSave);
}

async function hydrateProductLedgerFromSupabase() {
  const localLedgerSnapshot = normalizeProductLedger(state.productLedger);
  const pendingLocalEntries = getPendingProductSyncEntries();
  const pendingEntryMap = new Map(
    pendingLocalEntries.map((entry) => [createRemoteProductEntryKey(entry.dateKey, entry.rowId), entry])
  );
  const { data, error } = await supabaseClient
    .from(DFY_REMOTE_PRODUCT_TABLE)
    .select("*")
    .order("date_key", { ascending: true });

  if (error) {
    console.error("Supabase product hydrate failed", error);
    saveIndicator.textContent = `Supabase 상품연동 실패 · ${error.message || "오류"}`;
    return;
  }

  if (!data.length) {
    const localEntries = pendingLocalEntries.length
      ? pendingLocalEntries
      : getAllProductLedgerRemoteEntries(localLedgerSnapshot);
    if (localEntries.length) {
      queueRemoteProductSave(localEntries);
    }
    return;
  }

  const nextLedger = normalizeProductLedger(localLedgerSnapshot);
  const confirmedEntryKeys = [];

  data.forEach((record) => {
    const dateKey = String(record.date_key || "");
    const monthKey = String(record.month_key || dateKey.slice(0, 7));
    const rowId = String(record.row_id || "");
    const quantity = Math.max(0, Number(record.quantity) || 0);
    const entryKey = createRemoteProductEntryKey(dateKey, rowId);
    const pendingEntry = pendingEntryMap.get(entryKey);
    const remoteUpdatedAt = Number(new Date(record.updated_at || 0)) || 0;
    const pendingChangedAt = Number(new Date(pendingEntry?.changedAt || 0)) || 0;
    if (!monthKey || !dateKey || !rowId) {
      return;
    }

    if (pendingEntry && pendingEntry.quantity !== quantity) {
      if (!remoteUpdatedAt || pendingChangedAt > remoteUpdatedAt) {
        return;
      }
      confirmedEntryKeys.push(entryKey);
    }

    if (!nextLedger[monthKey]) {
      nextLedger[monthKey] = {};
    }
    if (!nextLedger[monthKey][rowId]) {
      nextLedger[monthKey][rowId] = {};
    }

    if (quantity > 0) {
      nextLedger[monthKey][rowId][dateKey] = quantity;
    } else {
      delete nextLedger[monthKey][rowId][dateKey];
    }

    if (pendingEntry && pendingEntry.quantity === quantity) {
      confirmedEntryKeys.push(entryKey);
    }
  });

  state.productLedger = normalizeProductLedger(nextLedger);

  if (pendingLocalEntries.length) {
    const entriesToReplay = [];
    pendingLocalEntries.forEach((entry) => {
      const entryKey = createRemoteProductEntryKey(entry.dateKey, entry.rowId);
      if (!confirmedEntryKeys.includes(entryKey)) {
        setProductCellValue(entry.monthKey, entry.rowId, entry.dateKey, entry.quantity);
        entriesToReplay.push(entry);
      }
    });
    clearPendingProductSyncEntries(confirmedEntryKeys);
    if (entriesToReplay.length) {
      queueRemoteProductSave(entriesToReplay);
    }
  }
}

async function upsertProductLedgerToSupabase(entryKeys) {
  if (!supabaseClient || !entryKeys.length) return;
  const payload = entryKeys.map((entryKey) => {
    const { dateKey, rowId } = parseRemoteProductEntryKey(entryKey);
    const monthKey = dateKey.slice(0, 7);
    return {
      month_key: monthKey,
      date_key: dateKey,
      row_id: rowId,
      quantity: getProductCellValue(monthKey, rowId, dateKey)
    };
  });

  const { error } = await supabaseClient
    .from(DFY_REMOTE_PRODUCT_TABLE)
    .upsert(payload, { onConflict: "date_key,row_id" });

  if (error) {
    console.error("Supabase product upsert failed", error, payload);
    saveIndicator.textContent = `Supabase 상품저장 실패 · ${error.message || "오류"}`;
    return;
  }

  saveIndicator.textContent = `Supabase 상품저장 완료 · ${formatTime(new Date())}`;
}

function queueRemoteInventorySave(inventoryState, options = {}) {
  if (!supabaseClient) return;
  const snapshot = normalizeSharedInventoryState(inventoryState);
  if (remoteInventorySaveTimer) {
    clearTimeout(remoteInventorySaveTimer);
    remoteInventorySaveTimer = null;
  }
  void upsertInventoryStateToSupabase(snapshot, options);
}

async function hydrateInventoryStateFromSupabase() {
  const pendingInventoryState = loadPendingInventorySyncState();
  const { data, error } = await supabaseClient
    .from(DFY_REMOTE_INVENTORY_TABLE)
    .select("*")
    .eq("state_key", DFY_REMOTE_INVENTORY_KEY)
    .maybeSingle();

  if (error) {
    console.error("Supabase inventory hydrate failed", error);
    saveIndicator.textContent = `Supabase 재고불러오기 실패 · ${error.message || "오류"}`;
    return;
  }

  if (!data) {
    const localInventoryState = pendingInventoryState || loadSharedInventoryState();
    if (localInventoryState.items.length || localInventoryState.transactions.length) {
      localStorage.setItem(DFY_INVENTORY_STORAGE_KEY, JSON.stringify(localInventoryState));
      queueRemoteInventorySave(localInventoryState, { silentRemote: true });
    }
    return;
  }

  const remoteInventoryState = normalizeSharedInventoryState({
    items: data.items,
    transactions: data.transactions,
    dfyProductSalesSync: data.meta?.dfyProductSalesSync || null
  });

  if (pendingInventoryState) {
    if (areInventoryStatesEqual(remoteInventoryState, pendingInventoryState)) {
      clearPendingInventorySyncState();
      localStorage.setItem(DFY_INVENTORY_STORAGE_KEY, JSON.stringify(remoteInventoryState));
      return;
    }
    localStorage.setItem(DFY_INVENTORY_STORAGE_KEY, JSON.stringify(pendingInventoryState));
    queueRemoteInventorySave(pendingInventoryState, { silentRemote: true });
    return;
  }

  localStorage.setItem(DFY_INVENTORY_STORAGE_KEY, JSON.stringify(remoteInventoryState));
}

async function upsertInventoryStateToSupabase(inventoryState, options = {}) {
  if (!supabaseClient) return;
  const payload = {
    state_key: DFY_REMOTE_INVENTORY_KEY,
    items: inventoryState.items,
    transactions: inventoryState.transactions,
    meta: {
      dfyProductSalesSync: inventoryState.dfyProductSalesSync || null
    }
  };

  const { error } = await supabaseClient
    .from(DFY_REMOTE_INVENTORY_TABLE)
    .upsert(payload, { onConflict: "state_key" });

  if (error) {
    console.error("Supabase inventory upsert failed", error, payload);
    if (!options.silentRemote) {
      saveIndicator.textContent = `Supabase 재고저장 실패 · ${error.message || "오류"}`;
    }
    return;
  }

  if (!options.silentRemote) {
    saveIndicator.textContent = `Supabase 재고저장 완료 · ${formatTime(new Date())}`;
  }
}

function createRemoteProductEntryKey(dateKey, rowId) {
  return `${dateKey}::${rowId}`;
}

function parseRemoteProductEntryKey(value) {
  const [dateKey, ...rest] = String(value || "").split("::");
  return { dateKey, rowId: rest.join("::") };
}

function getAllProductLedgerRemoteEntries(productLedger = state.productLedger) {
  return Object.entries(productLedger || {}).flatMap(([monthKey, rowMap]) => (
    Object.entries(rowMap || {}).flatMap(([rowId, dateMap]) => (
      Object.keys(dateMap || {}).map((dateKey) => ({ monthKey, rowId, dateKey }))
    ))
  ));
}

function hasActiveRemoteEditFocus() {
  if (Date.now() - lastRemoteSensitiveEditAt < 2000) {
    return true;
  }
  const activeElement = document.activeElement;
  return activeElement instanceof HTMLInputElement
    && activeElement.classList.contains("inventory-edit-input");
}

function hasPendingRemoteWrites() {
  return Boolean(remoteSaveTimer || remoteProductSaveTimer || remoteInventorySaveTimer);
}

function startRemoteRefreshLoop() {
  if (!supabaseClient) return;
  setInterval(() => {
    if (document.hidden) return;
    if (hasActiveRemoteEditFocus()) return;
    if (hasPendingRemoteWrites()) return;
    void hydrateFromSupabase();
  }, DFY_REMOTE_REFRESH_INTERVAL_MS);

  window.addEventListener("focus", () => {
    if (hasActiveRemoteEditFocus()) return;
    if (hasPendingRemoteWrites()) return;
    void hydrateFromSupabase();
  });
}
