import { useState } from "react"

const AudioUpload = () => {
  const [audioFile, setAudioFile] = useState(null)
  const [audioSrc, setAudioSrc] = useState(null)

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
        <span>Select Audio</span>
        <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
      </label>
      {audioSrc && (
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => new Audio(audioSrc).play()}
        >
          Play
        </button>
      )}
    </div>
  )
}

export default AudioUpload
