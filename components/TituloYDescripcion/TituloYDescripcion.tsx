import { useDeploy } from "../../providers/DeployContext"

const TituloYDescripcion = () => {
  const { titulo, setTitle, descripcion, setDescription } = useDeploy()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block mb-2">
          Titulo:
        </label>
        <input
          type="text"
          id="title"
          value={titulo}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-white text-black"
          placeholder="Titulo..."
        />
      </div>
      <div>
        <label htmlFor="descripcion" className="block mb-2">
          Descripcion:
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-white text-black"
          rows={4}
          placeholder="Descripcion..."
        />
      </div>
    </div>
  )
}

export default TituloYDescripcion
