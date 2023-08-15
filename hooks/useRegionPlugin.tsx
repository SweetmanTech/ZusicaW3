import { useEffect, useState } from "react"

const useRegionPlugin = (ws) => {
  const [znippetStart, setZnippetStart] = useState(0)
  const [znippetEnd, setZnippetEnd] = useState(0)
  const [regionId, setRegionId] = useState(0)

  useEffect(() => {
    const init = async () => {
      // MOVE THIS TO USEWAVEFORMREGION HOOK
      const MAX_LENGTH = 30
      ws.enableDragSelection({
        maxLength: MAX_LENGTH,
        color: "rgb(255,255,255,0.7)",
      })

      ws.on("region-update-end", (region: any) => {
        setZnippetStart(region.start)
        const tooLong = region.end - region.start > MAX_LENGTH
        setZnippetEnd(tooLong ? region.start + 30 : region.end)
        setRegionId(region.id)
      })

      ws.on("region-out", (region) => {
        region.play()
      })
      //   END REGION HOOK
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
