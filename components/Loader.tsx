"use client";

type Props = {
  show: Boolean;
};

export default function Header({ show }: Props) {
  return (
    <>
      {show && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800/[.8] flex justify-center items-center">
          <div className="flex items-center gap-5 animate-spin">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500"></span>
            </span>
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-teal-500"></span>
            </span>
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500"></span>
            </span>
          </div>
          <p className="text-xl text-teal-500">... Loading</p>
        </div>
      )}
    </>
  );
}
