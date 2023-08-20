import { useDeploy } from "../../providers/DeployContext"

const CoverArtUploadButton = () => {
  const { setCover, cubierta, animationFile, setAnimationFile } = useDeploy()
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file.type.includes("image")) {
      setCover(file)
      return
    }
    setAnimationFile(file)
  }

  return (
    <div>
      <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        <span>{cubierta && cubierta.name}</span>
        {!cubierta && <span>{animationFile ? "Elige tu Foto" : "Elige tu Contenido"}</span>}
        <input
          type="file"
          accept="image/*, .gif, .mov, application/pdf, audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  )
}

export default CoverArtUploadButton
