const dataset = [
  {
    country: {
      en: "Taiwan",
      tw: "台灣",
    },
    cities: [
      {
        en: "Kaohsiung",
        tw: "高雄市",
      },
      {
        en: "Taichung",
        tw: "台中市",
      },
      {
        en: "Tainan",
        tw: "台南市",
      },
      {
        en: "Taipei",
        tw: "台北市",
      },
      {
        en: "Taoyuan",
        tw: "桃園市",
      },
      {
        en: "Chiayi",
        tw: "嘉義市",
      },
      {
        en: "Hsinchu",
        tw: "新竹市",
      },
      {
        en: "Keelung",
        tw: "基隆市",
      },
      {
        en: "Changhua",
        tw: "彰化市",
      },
      {
        en: "Douliu",
        tw: "斗六市",
      },
      {
        en: "Hualien",
        tw: "花蓮市",
      },
      {
        en: "Magong",
        tw: "馬公市",
      },
      {
        en: "Miaoli",
        tw: "苗栗市",
      },
      {
        en: "Nantou",
        tw: "南投市",
      },
      {
        en: "Pingtung",
        tw: "屏東市",
      },
      {
        en: "Puzi",
        tw: "朴子市",
      },
      {
        en: "Taibao",
        tw: "太保市",
      },
      {
        en: "Taitung",
        tw: "台東市",
      },
      {
        en: "Toufen",
        tw: "頭份市",
      },
      {
        en: "Yilan",
        tw: "宜蘭市",
      },
      {
        en: "Yuanlin",
        tw: "員林市",
      },
      {
        en: "Zhubei",
        tw: "竹北市",
      },
    ],
  },
  // ... more countries and cities
];

type cityLookUpType = {
  cityName: string;
  country: string;
}[];

export const cityLookUp = (cityName: string): cityLookUpType | null => {
  const lowerCityName = cityName.toLowerCase();
  const results = [];

  // Search for English city matches
  for (const location of dataset) {
    for (const city of location.cities) {
      if (city.en.toLowerCase().includes(lowerCityName)) {
        results.push({
          cityName: city.en,
          country: location.country.en,
        });
      }
    }
  }

  // Search for Chinese city matches
  for (const location of dataset) {
    for (const city of location.cities) {
      if (city.tw.includes(lowerCityName)) {
        results.push({
          cityName: city.tw,
          country: location.country.tw,
        });
      }
    }
  }

  return results.length > 0 ? results.slice(0, 3) : null;
};
