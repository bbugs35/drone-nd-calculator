export const ndFilters = [
  { label: "ND2", stops: 1 },
  { label: "ND4", stops: 2 },
  { label: "ND8", stops: 3 },
  { label: "ND16", stops: 4 },
  { label: "ND32", stops: 5 },
  { label: "ND64", stops: 6 },
  { label: "ND128", stops: 7 },
  { label: "ND256", stops: 8 },
  { label: "ND512", stops: 9 },
  { label: "ND1000", stops: 10 },
]

export function shutterToDecimal(value) {
  if (value.includes("/")) {
    const [a, b] = value.split("/")
    return Number(a) / Number(b)
  }

  return Number(value)
}

export function calculateStops(current, target) {
  const currentVal = shutterToDecimal(current)
  const targetVal = shutterToDecimal(target)

  return Math.log2(targetVal / currentVal)
}

export function getClosestND(stops) {
  return ndFilters.reduce((prev, curr) =>
    Math.abs(curr.stops - stops) <
    Math.abs(prev.stops - stops)
      ? curr
      : prev
  )
}