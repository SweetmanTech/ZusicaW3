import { useEffect, useState } from "react"
import WaveSurfer from "wavesurfer.js"
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions"

const useWaveform = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null)
  const [regions, setRegions] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const init = async () => {
      const ws = WaveSurfer.create({
        ...options,
        waveColor: "#3d78ac",
        container: containerRef.current,
        barGap: 2,
        barWidth: 4,
        barRadius: 4,
        cursorWidth: 3,
        plugins: [RegionsPlugin.create()],
      }) as any

      // MOVE THIS TO USEWAVEFORMREGION HOOK
      const wsRegions = ws.registerPlugin(RegionsPlugin.create())

      wsRegions.addRegion({
        start: 0,
        end: 30,
        minLength: 7,
        maxLength: 30,
        content: "znippet",
        color: "rgba(255,255,255, 0.5)",
        drag: true,
        resize: true,
      })
      wsRegions.on("region-out", (region) => {
        region.play()
      })

      //   END REGION HOOK

      ws?.load?.(options.url)

      ws?.on?.("audioprocess", () => {
        const time = ws?.getCurrentTime?.()
        setCurrentTime(time)
      })

      ws?.on?.("finish", () => {
        setIsPlaying(false)
      })

      ws.on("play", () => setIsPlaying(true))
      ws.on("pause", () => setIsPlaying(false))
      ws.on("timeupdate", (newTime) => setCurrentTime(newTime))

      setWavesurfer(ws)
      setRegions(wsRegions)
    }

    if (!containerRef.current) return
    init()
  }, [options, containerRef])

  return { isPlaying, currentTime, wavesurfer, regions }
}

export default useWaveform
