export interface IHotelAvailable {
  data: any | null;
}

export default function HotelAvailableList({ data }: IHotelAvailable) {
  return (
    <>
      {data !== null && data.GetHotelAvailRS(
        <div className="p-5 mb-5">
          <p className="text-pink-800">{JSON.stringify(data)}</p>
        </div>
      )}
    </>
  );
}
