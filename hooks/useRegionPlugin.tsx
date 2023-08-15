import { useEffect, useState } from "react"

const useRegionPlugin = (ws) => {
  const [znippetStart, setZnippetStart] = useState(0)
  const [znippetEnd, setZnippetEnd] = useState(30)
  const [regionId, setRegionId] = useState(0)

  useEffect(() => {
    const init = async () => {
      const MAX_LENGTH = 30

      ws.on("region-update-end", (region: any) => {
        setZnippetStart(region.start)
        const tooLong = region.end - region.start > MAX_LENGTH
        setZnippetEnd(tooLong ? region.start + MAX_LENGTH : region.end)
        setRegionId(region.id)
      })

      ws.on("region-out", (region) => {
        region.play()
      })

      const defaultRegion = ws.addRegion({
        start: 0,
        end: MAX_LENGTH,
        color: "rgb(255,255,255,0.7)",
      })
      setRegionId(defaultRegion.id)
    }

    if (!ws) return
    init()
  }, [ws])

  return {
    znippetStart,
    znippetEnd,
    regionId,
  }
}

export default useRegionPlugin
