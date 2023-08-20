import { useDeploy } from "../../providers/DeployContext"

const FundsRecipient = () => {
  const { setFundsRecipient, direccionDePago } = useDeploy()

  const handleAddressChange = (e) => {
    const newAddress = e.target.value
    setFundsRecipient(newAddress)
  }

  return (
    <div>
      <label className="text-white font-bold py-2 px-4 rounded cursor-pointer">
        <span>Dirección de Pago</span>
        <input
          type="text"
          placeholder={direccionDePago || "0x..."}
          value={direccionDePago}
          onChange={handleAddressChange}
          className="ml-4 p-2 border rounded text-black"
        />
      </label>
    </div>
  )
}

export default FundsRecipient
