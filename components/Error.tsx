export interface IError {
  show: Boolean;
  msg?: String;
}

export default function Error({ show, msg }: IError) {
  return (
    <>
      {show && (
        <div className="border-l-2 border-pink-800 shadow p-5 mb-5">
          <p className="text-pink-800">{msg}</p>
        </div>
      )}
    </>
  );
}
