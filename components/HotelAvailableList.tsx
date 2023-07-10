export interface IHotelAvailable {
  data: any | null;
}

export default function HotelAvailableList({ data }: IHotelAvailable) {
  return (
    <>
      {data !== null &&
        data.GetHotelAvailRS &&
        data.GetHotelAvailRS.HotelAvailInfos && (
          <div className="mt-8 flex flex-col gap-5 p-2 lg:p-0">
            {data.GetHotelAvailRS.HotelAvailInfos.HotelAvailInfo.map(
              (dt: any, i: number) => (
                <div
                  className="w-full border border-teal-500 rounded p-5"
                  key={i}
                >
                  <div><p className="text-xl font-bold">{dt.HotelInfo.HotelName}</p></div>
                  <div className="flex justify-end">
                    <p>
                      {dt.HotelRateInfo.RateInfos.ConvertedRateInfo.length >0 && dt.HotelRateInfo.RateInfos.ConvertedRateInfo[0].CurrencyCode === "TWD" ? "NT$ ":"$ "}
                      <span>
                        {dt.HotelRateInfo.RateInfos.ConvertedRateInfo.length > 0
                          ? dt.HotelRateInfo.RateInfos.ConvertedRateInfo[0].AmountAfterTax.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : dt.HotelRateInfo.RateInfos.RateInfo &&
                            dt.HotelRateInfo.RateInfos.RateInfo[0].AmountAfterTax.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                      </span>
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
    </>
  );
}
