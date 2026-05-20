// import { SunMedium, SlidersHorizontal } from "lucide-react"
import { SunMedium } from "lucide-react"
import HorizontalWheelPicker from "./HorizontalWheelPicker"

const shutterOptions = [
  "1/8000",
  "1/4000",
  "1/2000",
  "1/1000",
  "1/500",
  "1/250",
  "1/125",
  "1/60",
  "1/50",
  "1/30",
  "1/25",
  "1/15",
  "1/8",
  "1/4",
  "1/2",
  "1",
]

function CurrentShutter({
  currentShutter,
  setCurrentShutter,
}) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 mb-2">
      <div className="flex items-center gap-3 mb-2">
        <SunMedium className="text-zinc-400" />

        <h2 className="uppercase tracking-[0.1em] text-md font-semibold">
          Current Shutter Speed
        </h2>
      </div>

      <p className="text-zinc-400 mb-2 text-sm">
        Without any ND filter, what shutter speed gives proper exposure?
      </p>

      <div className="relative">

        <HorizontalWheelPicker
            options={shutterOptions}
            value={currentShutter}
            onChange={setCurrentShutter}
        />
      </div>
    </div>
  )
}

export default CurrentShutter