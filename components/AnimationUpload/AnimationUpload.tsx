import { useDeploy } from "../../providers/DeployContext"

const AnimationUpload = () => {
  const { setAnimationFile, setCover, animationFile, setAnimationSrc } = useDeploy()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log("SWEETS FILE", file.type)
    if (file) {
      if (file.type.includes("audio")) {
        setCover(file)
        return
      }
      setAnimationFile(file)
      const objectURL = URL.createObjectURL(file)
      setAnimationSrc(objectURL)
    }
  }

  return (
    <div>
      <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        <span>{animationFile ? animationFile.name : "Seleccionar contenido"}</span>
        <input
          type="file"
          accept="audio/* application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {/* {audioSrc && <Waveform />} */}
    </div>
  )
}

export default AnimationUpload
