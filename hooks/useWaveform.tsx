/* eslint-disable global-require */
import { useCallback, useEffect, useRef, useState } from "react"
import useRegionPlugin from "./useRegionPlugin"

const useWaveform = (audioUrl) => {
  const waveformRef = useRef()
  const [wavesurfer, setWavesurfer] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const { znippetStart, znippetEnd, regionId } = useRegionPlugin(wavesurfer)

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
