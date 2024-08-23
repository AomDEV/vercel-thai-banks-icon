"use client";
import { IconViewer } from "@/components/Icon";
import { IconSchema } from "@/types";
import BanksJson from "css-finances/banks.json";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useMemo, useState } from "react";

const ICON_LIST = BanksJson.th as IconSchema;
export default function Home() {
  const { push } = useRouter();
  const [iconInfo, setIconInfo] = useState<IconSchema[string] | null>(null);

  const copy = useCallback((text: string) => navigator.clipboard.writeText(text), [])
  const closeModal = useCallback(() => {
    setIconInfo(null);
  }, [])
  const pngUrl = useMemo(() => {
    if (!iconInfo) return;
    return new URL(`/png/${iconInfo.symbol}`, window.location.href).toString()
  }, [iconInfo])

  return (
    <Fragment>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4">
        <div className="p-24">
          <h1 className="text-4xl font-bold">Thai Banks</h1>
          <div className="flex items-center justify-between">
            <span>Icon</span>
            <a target="_blank" className="text-blue-600" href={"https://github.com/AomDEV/css-finances"}>
              Github <b>@AomDEV</b>
            </a>
          </div>
        </div>
        <div className="w-full grid grid-cols-6 lg:grid-cols-12 gap-4">
          {Object.keys(ICON_LIST).map((icon, index) => (
            <div
              className="text-center flex flex-col gap-1 items-center cursor-pointer"
              onClick={() => setIconInfo(Object.assign(ICON_LIST[icon], {
                symbol: icon
              }))}
              key={index}
            >
              <IconViewer icon={icon} size={"huge"} shadow />
              <div className="text-sm">{icon.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <footer className="text-center flex flex-col items-center justify-center p-2 mt-4">
          <div className="flex items-center gap-2">
            <img
              src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"}
              className="w-4 h-4 rounded-full"
            />
            <a href={"https://github.com/AomDEV/vercel-thai-banks-icon"} className="text-sm text-muted">
              Source Code
            </a>
          </div>
          <a href={"https://github.com/AomDEV"}>@AomDEV</a>
        </footer>
      </main>
      {iconInfo && iconInfo.symbol && <div className="min-h-screen absolute top-0 left-0 z-[1] w-full h-full">
        <div className="w-full h-full absolute z-[2] flex items-center justify-center">
          <div className="max-w-md w-full bg-white p-2 rounded-md shadow-md">
            <div className="text-center p-2">
              <IconViewer
                style={{
                  height: "128px",
                  width: "128px"
                }}
                icon={iconInfo.symbol}
                shadow
              />
            </div>
            <div className="mb-2 text-center">
              <h1 className="text-lg font-bold">{iconInfo.nice_name}</h1>
              <span className="text-muted text-sm">{iconInfo.official_name}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <input
                value={pngUrl}
                readOnly
                disabled
                className="w-full p-2 border"
              />
              <button
                className="border bg-white h-full p-2"
                disabled={!pngUrl}
                onClick={() => pngUrl && copy(pngUrl)}
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-1 mb-2">
              <input
                value={`bank bank-${iconInfo.symbol}`}
                readOnly
                disabled
                className="w-full p-2 border"
              />
              <button
                className="border bg-white h-full p-2"
                disabled={!pngUrl}
                onClick={() => copy(`bank bank-${iconInfo.symbol}`)}
              >
                Copy
              </button>
            </div>
            <div className="overflow-x-auto bg-slate-700 p-3 rounded text-orange-400">
              <pre>
                {JSON.stringify(iconInfo, undefined, 4)}
              </pre>
            </div>
            <div className="mt-2 flex items-center gap-2 justify-end">
              <button
                className="border p-2 rounded"
                onClick={() => push(`/image/${iconInfo.symbol}`)}
              >
                PNG
              </button>
              <button
                className="border p-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bg-black/20 w-full h-full"></div>
      </div>}
    </Fragment>
  );
}
