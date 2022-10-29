import { useState } from "react"
import { useReservationsContext } from "../hooks/useReservationsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ReservationForm = () => {
  const { dispatch } = useReservationsContext()
  const { user } = useAuthContext()

  const [dateArrive, setDateArrive] = useState('')
  const [dateDepart, setDateDepart] = useState('')
  const [nadlute, setNadlute] = useState('')
  const [nenfant, setNenfant] = useState('')
  const [pension, setPension] = useState('')
  const [typeChambre, setTypeChambre] = useState('')
  const [coordonneAdule, setCoordonneAdule] = useState('')
  const [coordonneEnfant, setCoordonneEnfant] = useState('')
  const [prix, setPrix] = useState('')
  const [error, setError] = useState(null)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
    }

    const reservation = {dateArrive, dateDepart, nadlute, nenfant, pension, typeChambre,coordonneAdule,coordonneEnfant,prix }

    const response = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setDateArrive('')
      setDateDepart('')
      setNadlute('')
      setNenfant('')
      setPension('')
      setTypeChambre('')
      setCoordonneAdule(["haroun","salhi"])
      setCoordonneEnfant(["nom","prenom"])
      setPrix('')
      setError(null)
      dispatch({type: 'CREATE_RESERVATION', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Reservation</h3>

      <label>date d'arrivé:</label>
      <input 
        type="date"
        onChange={(e) => setDateArrive(e.target.value)}
        value={dateArrive}
      />

      <label>date de départ:</label>
      <input 
        type="date"
        onChange={(e) => setDateDepart(e.target.value)}
        value={dateDepart}
      />

      <label>nombre des adlute:</label>
      <input 
        type="number"
        onChange={(e) => setNadlute(e.target.value)}
        value={nadlute}
      />

      <label>nombre des enfant:</label>
      <input 
        type="number"
        onChange={(e) => setNenfant(e.target.value)}
        value={nenfant}
      />

      <label>pension:</label>
      <select 
        onChange={(e) => setPension(e.target.value)}
        value={pension}
      >
          <option value="">--choisir une option--</option>
          <option value="demiPension">Demi pension</option>
          <option value="pensionTotale">Pension totale</option>
      </select>

      <label>type du chambre:</label>
      <select 
        onChange={(e) => setTypeChambre(e.target.value)}
        value={typeChambre}
      >
          <option value="">--choisir une option--</option>
          <option value="suite">suite</option>
          <option value="chambre">chambre</option>
          <option value="chambreVueMer">chambre vue sur mer</option>
      </select>


      <button>Add Reservation</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ReservationForm