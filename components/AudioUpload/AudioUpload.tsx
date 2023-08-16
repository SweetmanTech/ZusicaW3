import { useDeploy } from "../../providers/DeployContext"
import Waveform from "../Waveform"

const AudioUpload = () => {
  const { setAudioFile, audioSrc, setAudioSrc } = useDeploy()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAudioFile(file)
      const objectURL = URL.createObjectURL(file)
      setAudioSrc(objectURL)
    }
  }

  return (
    <div>
      <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        <span>Seleccionar sonido</span>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
      </label>
      {audioSrc && <Waveform />}
    </div>
  )
}

export default AudioUpload
