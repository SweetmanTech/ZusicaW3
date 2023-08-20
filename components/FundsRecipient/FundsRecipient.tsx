import { useState } from "react"
import { useDeploy } from "../../providers/DeployContext"

const FundsRecipient = () => {
  const { setFundsRecipient, direccionDePago } = useDeploy()
  const [address, setAddress] = useState("")

  const handleAddressChange = (e) => {
    const newAddress = e.target.value

    // You might want to add further validations for the address format here.
    setAddress(newAddress)
    setFundsRecipient(newAddress)
  }

  return (
    <div>
      <label className="text-white font-bold py-2 px-4 rounded cursor-pointer">
        <span>Dirección de Pago</span>
        <input
          type="text"
          placeholder={direccionDePago || "0x..."}
          value={address}
          onChange={handleAddressChange}
          className="ml-4 p-2 border rounded text-black"
        />
      </label>
    </div>
  )
}

export default FundsRecipient
