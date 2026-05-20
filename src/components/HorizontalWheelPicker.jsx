import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"

function HorizontalWheelPicker({
  options,
  value,
  onChange,
}) {
  const containerRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)

  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Auto center selected value initially
useLayoutEffect(() => {
  const container = containerRef.current

  if (!container) return

  const timer = setTimeout(() => {
    const selected = container.querySelector(
      `[data-value="${value}"]`
    )

    if (!selected) return

    const scrollPosition =
      selected.offsetLeft -
      container.offsetWidth / 2 +
      selected.offsetWidth / 2

    container.scrollTo({
      left: scrollPosition,
      behavior: "instant",
    })
  }, 100)

  return () => clearTimeout(timer)
}, [])

  // Detect center item while scrolling
  const detectCenterItem = () => {
    const container = containerRef.current

    if (!container) return

    const containerCenter =
      container.scrollLeft +
      container.offsetWidth / 2

    const items =
      container.querySelectorAll("[data-value]")

    let closestItem = null
    let closestDistance = Infinity

    items.forEach((item) => {
      const itemCenter =
        item.offsetLeft + item.offsetWidth / 2

      const distance = Math.abs(
        containerCenter - itemCenter
      )

      if (distance < closestDistance) {
        closestDistance = distance
        closestItem = item
      }
    })

    if (
      closestItem &&
      closestItem.dataset.value !== value
    ) {
      onChange(closestItem.dataset.value)
    }
  }

  // Mouse Down
  const handleMouseDown = (e) => {
    setIsDragging(true)

    startX.current =
      e.pageX - containerRef.current.offsetLeft

    scrollLeft.current =
      containerRef.current.scrollLeft
  }

  // Mouse Leave
  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Mouse Up
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Mouse Move
  const handleMouseMove = (e) => {
    if (!isDragging) return

    e.preventDefault()

    const x =
      e.pageX - containerRef.current.offsetLeft

    const walk = (x - startX.current) * 2

    containerRef.current.scrollLeft =
      scrollLeft.current - walk
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black py-3">
      {/* Center Highlight */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-18 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.4)]" />

      {/* Left Fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-black to-transparent" />

      {/* Right Fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      {/* Wheel */}
      <div
        ref={containerRef}
        onScroll={detectCenterItem}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`
          flex
          overflow-x-auto
          gap-10
          px-[45%]
          py-4
          snap-x
          snap-mandatory
          scrollbar-hide
          scroll-smooth
          select-none
          ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
          }
        `}
      >
        {options.map((item) => (
          <div
            key={item}
            data-value={item}
            className={`
              shrink-0
              snap-center
              text-3xl
              font-semibold
              transition-all
              duration-300
              ${
                value === item
                  ? "text-white scale-110"
                  : "text-zinc-600 scale-90 opacity-60"
              }
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HorizontalWheelPicker