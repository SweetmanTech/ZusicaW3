/* eslint-disable global-require */
import { useCallback, useEffect, useRef, useState } from "react"
// import WaveSurfer from "wavesurfer.js"
// import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"

const useWaveform = (audioUrl) => {
  const waveformRef = useRef()
  const [wavesurfer, setWavesurfer] = useState(null)
  const [znippetStart, setZnippetStart] = useState(0)
  const [znippetEnd, setZnippetEnd] = useState(0)
  const [regionId, setRegionId] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const onPlayClick = useCallback(() => {
    if (wavesurfer.isPlaying()) {
      return wavesurfer.pause()
    }
    if (regionId) {
      return wavesurfer.regions.list[regionId].playLoop()
    }
    return wavesurfer.play()
  }, [wavesurfer, regionId])

  useEffect(() => {
    const init = async () => {
      const RegionsPlugin = require("wavesurfer.js/dist/plugin/wavesurfer.regions.min.js")
      const WaveSurfer = (await import("wavesurfer.js")).default

      const ws = WaveSurfer.create({
        height: 100,
        url: audioUrl,
        waveColor: "#3d78ac",
        container: waveformRef.current,
        barGap: 2,
        barWidth: 4,
        barRadius: 4,
        cursorWidth: 3,
        plugins: [
          RegionsPlugin.create({
            maxLength: 20,
            maxRegions: 1,
            minLength: 5,
          }),
        ],
      }) as any

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

      ws?.load?.(audioUrl)

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
    }

    if (!waveformRef.current) return
    init()
  }, [audioUrl, waveformRef])

  return { isPlaying, currentTime, wavesurfer, waveformRef, znippetStart, znippetEnd, onPlayClick }
}

export default useWaveform
