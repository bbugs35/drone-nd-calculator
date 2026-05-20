// App.jsx
import { useMemo, useState } from "react"
import { Camera, Info } from "lucide-react"

import CurrentShutter from "./components/CurrentShutter"
import TargetShutter from "./components/TargetShutter"
import NDResult from "./components/NDResult"

import {
  calculateStops,
  getClosestND,
} from "./utils/ndMath"

function App() {
  const [currentShutter, setCurrentShutter] =
    useState("1/500")

  const [targetShutter, setTargetShutter] =
    useState("1/60")

  const result = useMemo(() => {
    const stops = calculateStops(
      currentShutter,
      targetShutter
    )

    const nd = getClosestND(stops)

    return {
      nd,
      exactND: Math.pow(2, stops).toFixed(1),
    }
  }, [currentShutter, targetShutter])

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-2">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-orange-500/10 p-2 rounded-xl">
            <Camera className="text-orange-500" />
          </div>

          <h1 className="text-2xl font-bold">
            ND Filter Calculator
          </h1>
        </div>

        <CurrentShutter
          currentShutter={currentShutter}
          setCurrentShutter={setCurrentShutter}
        />

        <TargetShutter
          targetShutter={targetShutter}
          setTargetShutter={setTargetShutter}
        />

        <NDResult result={result} />

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mt-8">
          <div className="flex gap-4 items-start">
            <Info
              className="text-zinc-400 mt-1 shrink-0"
              size={22}
            />

            <p className="text-zinc-300 leading-relaxed">
              <span className="font-semibold text-white">
                180° Shutter Rule:
              </span>{" "}
              For natural motion blur in video, set your target shutter speed to
              approximately 1/(2 × FPS). Example: if shooting at 30 FPS, aim
              for 1/60s.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App