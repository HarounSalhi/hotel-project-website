import { useReservationsContext } from '../hooks/useReservationsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { format } from 'date-fns'


const ReservationDetails = ({ reservation }) => {
  const { dispatch } = useReservationsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/reservations/' + reservation._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_RESERVATION', payload: json})
    }
  }

  const arrive=reservation.dateArrive;
  const depart=reservation.dateDepart;
  return (
    <div className="reservation-details">
      <h4>{reservation.title}</h4>
      <p>
        <strong>date d'arrivé: </strong>{arrive}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
        <strong>date de départ: </strong>{depart}
      </p>
      <p>
        <strong>nombre des adulte: </strong>{reservation.nadlute}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>nombre des enfant: </strong>{reservation.nenfant}
      </p>
      <p>
        <strong>type du chambre: </strong>{reservation.typeChambre}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong>pension: </strong>{reservation.pension}
      </p>

      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ReservationDetails