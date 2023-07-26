import { create } from "zustand";

interface iCountryState {
  country: {
    tw: string;
    en: string;
    mobileCode: string;
  }[];
}

const useCountryStore = create<iCountryState>()((set) => ({
  country: [
    {
      tw: "阿富汗",
      en: "Afghanistan",
      mobileCode: "+93",
    },
    {
      tw: "奧蘭群島",
      en: "Åland Islands",
      mobileCode: "+358-18",
    },
    {
      tw: "阿爾巴尼亞",
      en: "Albania",
      mobileCode: "+355",
    },
    {
      tw: "阿爾及利亞",
      en: "Algeria",
      mobileCode: "+213",
    },
    {
      tw: "美屬薩摩亞",
      en: "American Samoa",
      mobileCode: "+1-684",
    },
    {
      tw: "安道爾",
      en: "Andorra",
      mobileCode: "+376",
    },
    {
      tw: "安哥拉",
      en: "Angola",
      mobileCode: "+244",
    },
    {
      tw: "安圭拉",
      en: "Anguilla",
      mobileCode: "+1-264",
    },
    {
      tw: "南極洲",
      en: "Antarctica",
      mobileCode: "+",
    },
    {
      tw: "安提瓜和巴布達",
      en: "Antigua and Barbuda",
      mobileCode: "+1-268",
    },
    {
      tw: "阿根廷",
      en: "Argentina",
      mobileCode: "+54",
    },
    {
      tw: "亞美尼亞",
      en: "Armenia",
      mobileCode: "+374",
    },
    {
      tw: "阿魯巴島",
      en: "Aruba",
      mobileCode: "+297",
    },
    {
      tw: "澳大利亞",
      en: "Australia",
      mobileCode: "+61",
    },
    {
      tw: "奧地利",
      en: "Austria",
      mobileCode: "+43",
    },
    {
      tw: "阿塞拜疆",
      en: "Azerbaijan",
      mobileCode: "+994",
    },
    {
      tw: "巴哈馬",
      en: "Bahamas, The",
      mobileCode: "+1-242",
    },
    {
      tw: "巴林",
      en: "Bahrain",
      mobileCode: "+973",
    },
    {
      tw: "孟加拉國",
      en: "Bangladesh",
      mobileCode: "+880",
    },
    {
      tw: "巴巴多斯",
      en: "Barbados",
      mobileCode: "+1-246",
    },
    {
      tw: "白俄羅斯",
      en: "Belarus",
      mobileCode: "+375",
    },
    {
      tw: "比利時",
      en: "Belgium",
      mobileCode: "+32",
    },
    {
      tw: "伯利茲",
      en: "Belize",
      mobileCode: "+501",
    },
    {
      tw: "貝寧",
      en: "Benin",
      mobileCode: "+229",
    },
    {
      tw: "百慕大",
      en: "Bermuda",
      mobileCode: "+1-441",
    },
    {
      tw: "不丹",
      en: "Bhutan",
      mobileCode: "+975",
    },
    {
      tw: "委內瑞拉玻利瓦爾共和國",
      en: "Bolivarian Republic of Venezuela",
      mobileCode: "+58",
    },
    {
      tw: "玻利維亞",
      en: "Bolivia",
      mobileCode: "+591",
    },
    {
      tw: "博內爾島、聖尤斯特歇斯島和薩巴島",
      en: "Bonaire, Sint Eustatius and Saba",
      mobileCode: "+599",
    },
    {
      tw: "波斯尼亞和黑塞哥維那",
      en: "Bosnia and Herzegovina",
      mobileCode: "+387",
    },
    {
      tw: "博茨瓦納",
      en: "Botswana",
      mobileCode: "+267",
    },
    {
      tw: "布維島",
      en: "Bouvet Island",
      mobileCode: "+",
    },
    {
      tw: "巴西",
      en: "Brazil",
      mobileCode: "+55",
    },
    {
      tw: "英屬印度洋領地",
      en: "British Indian Ocean Territory",
      mobileCode: "+246",
    },
    {
      tw: "文萊",
      en: "Brunei",
      mobileCode: "+673",
    },
    {
      tw: "保加利亞",
      en: "Bulgaria",
      mobileCode: "+359",
    },
    {
      tw: "布基納法索",
      en: "Burkina Faso",
      mobileCode: "+226",
    },
    {
      tw: "布隆迪",
      en: "Burundi",
      mobileCode: "+257",
    },
    {
      tw: "佛得角",
      en: "Cabo Verde",
      mobileCode: "+238",
    },
    {
      tw: "柬埔寨",
      en: "Cambodia",
      mobileCode: "+855",
    },
    {
      tw: "喀麥隆",
      en: "Cameroon",
      mobileCode: "+237",
    },
    {
      tw: "加拿大",
      en: "Canada",
      mobileCode: "+1",
    },
    {
      tw: "開曼群島",
      en: "Cayman Islands",
      mobileCode: "+1-345",
    },
    {
      tw: "中非共和國",
      en: "Central African Republic",
      mobileCode: "+236",
    },
    {
      tw: "乍得",
      en: "Chad",
      mobileCode: "+235",
    },
    {
      tw: "智利",
      en: "Chile",
      mobileCode: "+56",
    },
    {
      tw: "中國",
      en: "China",
      mobileCode: "+86",
    },
    {
      tw: "聖誕島",
      en: "Christmas Island",
      mobileCode: "+61",
    },
    {
      tw: "科科斯（基林）群島",
      en: "Cocos (Keeling) Islands",
      mobileCode: "+61",
    },
    {
      tw: "哥倫比亞",
      en: "Colombia",
      mobileCode: "+57",
    },
    {
      tw: "科摩羅",
      en: "Comoros",
      mobileCode: "+269",
    },
    {
      tw: "剛果",
      en: "Congo",
      mobileCode: "+242",
    },
    {
      tw: "剛果（金）",
      en: "Congo (DRC)",
      mobileCode: "+243",
    },
    {
      tw: "庫克群島",
      en: "Cook Islands",
      mobileCode: "+682",
    },
    {
      tw: "哥斯達黎加",
      en: "Costa Rica",
      mobileCode: "+506",
    },
    {
      tw: "象牙海岸",
      en: "Côte d'Ivoire",
      mobileCode: "+225",
    },
    {
      tw: "克羅地亞",
      en: "Croatia",
      mobileCode: "+385",
    },
    {
      tw: "古巴",
      en: "Cuba",
      mobileCode: "+53",
    },
    {
      tw: "庫拉索",
      en: "Curaçao",
      mobileCode: "+599",
    },
    {
      tw: "塞浦路斯",
      en: "Cyprus",
      mobileCode: "+357",
    },
    {
      tw: "捷克共和國",
      en: "Czech Republic",
      mobileCode: "+420",
    },
    {
      tw: "東帝汶民主共和國",
      en: "Democratic Republic of Timor-Leste",
      mobileCode: "+670",
    },
    {
      tw: "丹麥",
      en: "Denmark",
      mobileCode: "+45",
    },
    {
      tw: "吉布提",
      en: "Djibouti",
      mobileCode: "+253",
    },
    {
      tw: "多米尼加",
      en: "Dominica",
      mobileCode: "+1-767",
    },
    {
      tw: "多明尼加共和國",
      en: "Dominican Republic",
      mobileCode: "+1-809 and 1-829",
    },
    {
      tw: "厄瓜多爾",
      en: "Ecuador",
      mobileCode: "+593",
    },
    {
      tw: "埃及",
      en: "Egypt",
      mobileCode: "+20",
    },
    {
      tw: "救星",
      en: "El Salvador",
      mobileCode: "+503",
    },
    {
      tw: "赤道幾內亞",
      en: "Equatorial Guinea",
      mobileCode: "+240",
    },
    {
      tw: "厄立特里亞",
      en: "Eritrea",
      mobileCode: "+291",
    },
    {
      tw: "愛沙尼亞",
      en: "Estonia",
      mobileCode: "+372",
    },
    {
      tw: "埃塞俄比亞",
      en: "Ethiopia",
      mobileCode: "+251",
    },
    {
      tw: "福克蘭群島（福克蘭群島）",
      en: "Falkland Islands (Islas Malvinas)",
      mobileCode: "+500",
    },
    {
      tw: "法羅群島",
      en: "Faroe Islands",
      mobileCode: "+298",
    },
    {
      tw: "斐濟群島",
      en: "Fiji Islands",
      mobileCode: "+679",
    },
    {
      tw: "芬蘭",
      en: "Finland",
      mobileCode: "+358",
    },
    {
      tw: "法國",
      en: "France",
      mobileCode: "+33",
    },
    {
      tw: "法屬圭亞那",
      en: "French Guiana",
      mobileCode: "+594",
    },
    {
      tw: "法屬波利尼西亞",
      en: "French Polynesia",
      mobileCode: "+689",
    },
    {
      tw: "法國南部和南極土地",
      en: "French Southern and Antarctic Lands",
      mobileCode: "+",
    },
    {
      tw: "加蓬",
      en: "Gabon",
      mobileCode: "+241",
    },
    {
      tw: "岡比亞",
      en: "Gambia, The",
      mobileCode: "+220",
    },
    {
      tw: "喬治亞州",
      en: "Georgia",
      mobileCode: "+995",
    },
    {
      tw: "德國",
      en: "Germany",
      mobileCode: "+49",
    },
    {
      tw: "加納",
      en: "Ghana",
      mobileCode: "+233",
    },
    {
      tw: "直布羅陀",
      en: "Gibraltar",
      mobileCode: "+350",
    },
    {
      tw: "希臘",
      en: "Greece",
      mobileCode: "+30",
    },
    {
      tw: "格陵蘭",
      en: "Greenland",
      mobileCode: "+299",
    },
    {
      tw: "格林納達",
      en: "Grenada",
      mobileCode: "+1-473",
    },
    {
      tw: "瓜德羅普島",
      en: "Guadeloupe",
      mobileCode: "+590",
    },
    {
      tw: "關島",
      en: "Guam",
      mobileCode: "+1-671",
    },
    {
      tw: "危地馬拉",
      en: "Guatemala",
      mobileCode: "+502",
    },
    {
      tw: "根西島",
      en: "Guernsey",
      mobileCode: "+44-1481",
    },
    {
      tw: "幾內亞",
      en: "Guinea",
      mobileCode: "+224",
    },
    {
      tw: "幾內亞比紹",
      en: "Guinea-Bissau",
      mobileCode: "+245",
    },
    {
      tw: "圭亞那",
      en: "Guyana",
      mobileCode: "+592",
    },
    {
      tw: "海地",
      en: "Haiti",
      mobileCode: "+509",
    },
    {
      tw: "赫德島和麥克唐納群島",
      en: "Heard Island and McDonald Islands",
      mobileCode: "+ ",
    },
    {
      tw: "洪都拉斯",
      en: "Honduras",
      mobileCode: "+504",
    },
    {
      tw: "香港特別行政區",
      en: "Hong Kong SAR",
      mobileCode: "+852",
    },
    {
      tw: "匈牙利",
      en: "Hungary",
      mobileCode: "+36",
    },
    {
      tw: "冰島",
      en: "Iceland",
      mobileCode: "+354",
    },
    {
      tw: "印度",
      en: "India",
      mobileCode: "+91",
    },
    {
      tw: "印度尼西亞",
      en: "Indonesia",
      mobileCode: "+62",
    },
    {
      tw: "伊朗",
      en: "Iran",
      mobileCode: "+98",
    },
    {
      tw: "伊拉克",
      en: "Iraq",
      mobileCode: "+964",
    },
    {
      tw: "愛爾蘭",
      en: "Ireland",
      mobileCode: "+353",
    },
    {
      tw: "以色列",
      en: "Israel",
      mobileCode: "+972",
    },
    {
      tw: "意大利",
      en: "Italy",
      mobileCode: "+39",
    },
    {
      tw: "牙買加",
      en: "Jamaica",
      mobileCode: "+1-876",
    },
    {
      tw: "揚馬延",
      en: "Jan Mayen",
      mobileCode: "+47",
    },
    {
      tw: "日本",
      en: "Japan",
      mobileCode: "+81",
    },
    {
      tw: "球衣",
      en: "Jersey",
      mobileCode: "+44-1534",
    },
    {
      tw: "約旦",
      en: "Jordan",
      mobileCode: "+962",
    },
    {
      tw: "哈薩克斯坦",
      en: "Kazakhstan",
      mobileCode: "+7",
    },
    {
      tw: "肯尼亞",
      en: "Kenya",
      mobileCode: "+254",
    },
    {
      tw: "基里巴斯",
      en: "Kiribati",
      mobileCode: "+686",
    },
    {
      tw: "韓國",
      en: "Korea",
      mobileCode: "+82",
    },
    {
      tw: "科索沃",
      en: "Kosovo",
      mobileCode: "+",
    },
    {
      tw: "科威特",
      en: "Kuwait",
      mobileCode: "+965",
    },
    {
      tw: "吉爾吉斯斯坦",
      en: "Kyrgyzstan",
      mobileCode: "+996",
    },
    {
      tw: "老撾",
      en: "Laos",
      mobileCode: "+856",
    },
    {
      tw: "拉脫維亞",
      en: "Latvia",
      mobileCode: "+371",
    },
    {
      tw: "黎巴嫩",
      en: "Lebanon",
      mobileCode: "+961",
    },
    {
      tw: "萊索托",
      en: "Lesotho",
      mobileCode: "+266",
    },
    {
      tw: "利比里亞",
      en: "Liberia",
      mobileCode: "+231",
    },
    {
      tw: "利比亞",
      en: "Libya",
      mobileCode: "+218",
    },
    {
      tw: "列支敦士登",
      en: "Liechtenstein",
      mobileCode: "+423",
    },
    {
      tw: "立陶宛",
      en: "Lithuania",
      mobileCode: "+370",
    },
    {
      tw: "盧森堡",
      en: "Luxembourg",
      mobileCode: "+352",
    },
    {
      tw: "澳門特別行政區",
      en: "Macao SAR",
      mobileCode: "+853",
    },
    {
      tw: "馬其頓、前南斯拉夫共和國",
      en: "Macedonia, Former Yugoslav Republic of",
      mobileCode: "+389",
    },
    {
      tw: "馬達加斯加",
      en: "Madagascar",
      mobileCode: "+261",
    },
    {
      tw: "馬拉維",
      en: "Malawi",
      mobileCode: "+265",
    },
    {
      tw: "馬來西亞",
      en: "Malaysia",
      mobileCode: "+60",
    },
    {
      tw: "馬爾代夫",
      en: "Maldives",
      mobileCode: "+960",
    },
    {
      tw: "馬里",
      en: "Mali",
      mobileCode: "+223",
    },
    {
      tw: "馬耳他",
      en: "Malta",
      mobileCode: "+356",
    },
    {
      tw: "馬恩島",
      en: "Man, Isle of",
      mobileCode: "+44-1624",
    },
    {
      tw: "馬紹爾群島",
      en: "Marshall Islands",
      mobileCode: "+692",
    },
    {
      tw: "馬提尼克島",
      en: "Martinique",
      mobileCode: "+596",
    },
    {
      tw: "毛里塔尼亞",
      en: "Mauritania",
      mobileCode: "+222",
    },
    {
      tw: "毛里求斯",
      en: "Mauritius",
      mobileCode: "+230",
    },
    {
      tw: "馬約特島",
      en: "Mayotte",
      mobileCode: "+262",
    },
    {
      tw: "墨西哥",
      en: "Mexico",
      mobileCode: "+52",
    },
    {
      tw: "密克羅尼西亞",
      en: "Micronesia",
      mobileCode: "+691",
    },
    {
      tw: "摩爾多瓦",
      en: "Moldova",
      mobileCode: "+373",
    },
    {
      tw: "摩納哥",
      en: "Monaco",
      mobileCode: "+377",
    },
    {
      tw: "蒙古",
      en: "Mongolia",
      mobileCode: "+976",
    },
    {
      tw: "黑山",
      en: "Montenegro",
      mobileCode: "+382",
    },
    {
      tw: "蒙特塞拉特",
      en: "Montserrat",
      mobileCode: "+1-664",
    },
    {
      tw: "摩洛哥",
      en: "Morocco",
      mobileCode: "+212",
    },
    {
      tw: "莫桑比克",
      en: "Mozambique",
      mobileCode: "+258",
    },
    {
      tw: "緬甸",
      en: "Myanmar",
      mobileCode: "+95",
    },
    {
      tw: "納米比亞",
      en: "Namibia",
      mobileCode: "+264",
    },
    {
      tw: "瑙魯",
      en: "Nauru",
      mobileCode: "+674",
    },
    {
      tw: "尼泊爾",
      en: "Nepal",
      mobileCode: "+977",
    },
    {
      tw: "荷蘭人",
      en: "Netherlands",
      mobileCode: "+31",
    },
    {
      tw: "新喀裡多尼亞",
      en: "New Caledonia",
      mobileCode: "+687",
    },
    {
      tw: "新西蘭",
      en: "New Zealand",
      mobileCode: "+64",
    },
    {
      tw: "尼加拉瓜",
      en: "Nicaragua",
      mobileCode: "+505",
    },
    {
      tw: "尼日爾",
      en: "Niger",
      mobileCode: "+227",
    },
    {
      tw: "尼日利亞",
      en: "Nigeria",
      mobileCode: "+234",
    },
    {
      tw: "紐埃",
      en: "Niue",
      mobileCode: "+683",
    },
    {
      tw: "諾福克島",
      en: "Norfolk Island",
      mobileCode: "+672",
    },
    {
      tw: "北朝鮮",
      en: "North Korea",
      mobileCode: "+850",
    },
    {
      tw: "北馬里亞納群島",
      en: "Northern Mariana Islands",
      mobileCode: "+1-670",
    },
    {
      tw: "挪威",
      en: "Norway",
      mobileCode: "+47",
    },
    {
      tw: "阿曼",
      en: "Oman",
      mobileCode: "+968",
    },
    {
      tw: "巴基斯坦",
      en: "Pakistan",
      mobileCode: "+92",
    },
    {
      tw: "帕勞",
      en: "Palau",
      mobileCode: "+680",
    },
    {
      tw: "巴勒斯坦權力機構",
      en: "Palestinian Authority",
      mobileCode: "+970",
    },
    {
      tw: "巴拿馬",
      en: "Panama",
      mobileCode: "+507",
    },
    {
      tw: "巴布亞新幾內亞",
      en: "Papua New Guinea",
      mobileCode: "+675",
    },
    {
      tw: "巴拉圭",
      en: "Paraguay",
      mobileCode: "+595",
    },
    {
      tw: "秘魯",
      en: "Peru",
      mobileCode: "+51",
    },
    {
      tw: "菲律賓",
      en: "Philippines",
      mobileCode: "+63",
    },
    {
      tw: "皮特凱恩群島",
      en: "Pitcairn Islands",
      mobileCode: "+870",
    },
    {
      tw: "波蘭",
      en: "Poland",
      mobileCode: "+48",
    },
    {
      tw: "葡萄牙",
      en: "Portugal",
      mobileCode: "+351",
    },
    {
      tw: "波多黎各",
      en: "Puerto Rico",
      mobileCode: "+1-787 and 1-939",
    },
    {
      tw: "卡塔爾",
      en: "Qatar",
      mobileCode: "+974",
    },
    {
      tw: "團圓",
      en: "Reunion",
      mobileCode: "+262",
    },
    {
      tw: "羅馬尼亞",
      en: "Romania",
      mobileCode: "+40",
    },
    {
      tw: "俄羅斯",
      en: "Russia",
      mobileCode: "+7",
    },
    {
      tw: "盧旺達",
      en: "Rwanda",
      mobileCode: "+250",
    },
    {
      tw: "聖巴塞洛繆",
      en: "Saint Barthélemy",
      mobileCode: "+590",
    },
    {
      tw: "聖赫勒拿島、阿森松島和特里斯坦達庫尼亞",
      en: "Saint Helena, Ascension and Tristan da Cunha",
      mobileCode: "+290",
    },
    {
      tw: "聖基茨和尼維斯",
      en: "Saint Kitts and Nevis",
      mobileCode: "+1-869",
    },
    {
      tw: "聖盧西亞",
      en: "Saint Lucia",
      mobileCode: "+1-758",
    },
    {
      tw: "聖馬丁島（法語部分）",
      en: "Saint Martin (French part)",
      mobileCode: "+590",
    },
    {
      tw: "聖彼得和密克隆群島",
      en: "Saint Pierre and Miquelon",
      mobileCode: "+508",
    },
    {
      tw: "聖文森特和格林納丁斯",
      en: "Saint Vincent and the Grenadines",
      mobileCode: "+1-784",
    },
    {
      tw: "薩摩亞",
      en: "Samoa",
      mobileCode: "+685",
    },
    {
      tw: "聖馬力諾",
      en: "San Marino",
      mobileCode: "+378",
    },
    {
      tw: "聖多美和普林西比",
      en: "São Tomé and Príncipe",
      mobileCode: "+239",
    },
    {
      tw: "沙特阿拉伯",
      en: "Saudi Arabia",
      mobileCode: "+966",
    },
    {
      tw: "塞內加爾",
      en: "Senegal",
      mobileCode: "+221",
    },
    {
      tw: "塞爾維亞",
      en: "Serbia",
      mobileCode: "+381",
    },
    {
      tw: "塞舌爾",
      en: "Seychelles",
      mobileCode: "+248",
    },
    {
      tw: "塞拉利昂",
      en: "Sierra Leone",
      mobileCode: "+232",
    },
    {
      tw: "新加坡",
      en: "Singapore",
      mobileCode: "+65",
    },
    {
      tw: "聖馬丁島（荷屬部分）",
      en: "Sint Maarten (Dutch part)",
      mobileCode: "+599",
    },
    {
      tw: "斯洛伐克",
      en: "Slovakia",
      mobileCode: "+421",
    },
    {
      tw: "斯洛文尼亞",
      en: "Slovenia",
      mobileCode: "+386",
    },
    {
      tw: "所羅門群島",
      en: "Solomon Islands",
      mobileCode: "+677",
    },
    {
      tw: "索馬里",
      en: "Somalia",
      mobileCode: "+252",
    },
    {
      tw: "南非",
      en: "South Africa",
      mobileCode: "+27",
    },
    {
      tw: "南喬治亞島和南桑威奇群島",
      en: "South Georgia and the South Sandwich Islands",
      mobileCode: "+",
    },
    {
      tw: "南蘇丹",
      en: "South Sudan",
      mobileCode: "+211",
    },
    {
      tw: "西班牙",
      en: "Spain",
      mobileCode: "+34",
    },
    {
      tw: "斯里蘭卡",
      en: "Sri Lanka",
      mobileCode: "+94",
    },
    {
      tw: "蘇丹",
      en: "Sudan",
      mobileCode: "+249",
    },
    {
      tw: "蘇里南",
      en: "Suriname",
      mobileCode: "+597",
    },
    {
      tw: "斯瓦爾巴特群島",
      en: "Svalbard",
      mobileCode: "+47",
    },
    {
      tw: "斯威士蘭",
      en: "Swaziland",
      mobileCode: "+268",
    },
    {
      tw: "瑞典",
      en: "Sweden",
      mobileCode: "+46",
    },
    {
      tw: "瑞士",
      en: "Switzerland",
      mobileCode: "+41",
    },
    {
      tw: "敘利亞",
      en: "Syria",
      mobileCode: "+963",
    },
    {
      tw: "台灣",
      en: "Taiwan",
      mobileCode: "+886",
    },
    {
      tw: "塔吉克斯坦",
      en: "Tajikistan",
      mobileCode: "+992",
    },
    {
      tw: "坦桑尼亞",
      en: "Tanzania",
      mobileCode: "+255",
    },
    {
      tw: "泰國",
      en: "Thailand",
      mobileCode: "+66",
    },
    {
      tw: "多哥",
      en: "Togo",
      mobileCode: "+228",
    },
    {
      tw: "托克勞",
      en: "Tokelau",
      mobileCode: "+690",
    },
    {
      tw: "湯加",
      en: "Tonga",
      mobileCode: "+676",
    },
    {
      tw: "特立尼達和多巴哥",
      en: "Trinidad and Tobago",
      mobileCode: "+1-868",
    },
    {
      tw: "突尼斯",
      en: "Tunisia",
      mobileCode: "+216",
    },
    {
      tw: "火雞",
      en: "Turkey",
      mobileCode: "+90",
    },
    {
      tw: "土庫曼斯坦",
      en: "Turkmenistan",
      mobileCode: "+993",
    },
    {
      tw: "特克斯和凱科斯群島",
      en: "Turks and Caicos Islands",
      mobileCode: "+1-649",
    },
    {
      tw: "圖瓦盧",
      en: "Tuvalu",
      mobileCode: "+688",
    },
    {
      tw: "美國本土外小島嶼",
      en: "U.S. Minor Outlying Islands",
      mobileCode: "+1",
    },
    {
      tw: "烏干達",
      en: "Uganda",
      mobileCode: "+256",
    },
    {
      tw: "烏克蘭",
      en: "Ukraine",
      mobileCode: "+380",
    },
    {
      tw: "阿拉伯聯合酋長國",
      en: "United Arab Emirates",
      mobileCode: "+971",
    },
    {
      tw: "英國",
      en: "United Kingdom",
      mobileCode: "+44",
    },
    {
      tw: "美國",
      en: "United States",
      mobileCode: "+1",
    },
    {
      tw: "烏拉圭",
      en: "Uruguay",
      mobileCode: "+598",
    },
    {
      tw: "烏茲別克斯坦",
      en: "Uzbekistan",
      mobileCode: "+998",
    },
    {
      tw: "瓦努阿圖",
      en: "Vanuatu",
      mobileCode: "+678",
    },
    {
      tw: "梵蒂岡城",
      en: "Vatican City",
      mobileCode: "+379",
    },
    {
      tw: "越南",
      en: "Vietnam",
      mobileCode: "+84",
    },
    {
      tw: "美屬維爾京群島",
      en: "Virgin Islands, U.S.",
      mobileCode: "+1-340",
    },
    {
      tw: "英屬維爾京群島",
      en: "Virgin Islands, British",
      mobileCode: "+1-284",
    },
    {
      tw: "瓦利斯和富圖納群島",
      en: "Wallis and Futuna",
      mobileCode: "+681",
    },
    {
      tw: "也門",
      en: "Yemen",
      mobileCode: "+967",
    },
    {
      tw: "贊比亞",
      en: "Zambia",
      mobileCode: "+260",
    },
    {
      tw: "津巴布韋",
      en: "Zimbabwe",
      mobileCode: "+263",
    },
  ],
}));

export default useCountryStore;
