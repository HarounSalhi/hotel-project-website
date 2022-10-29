import { useEffect }from 'react'
import { useReservationsContext } from "../hooks/useReservationsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ReservationDetails from '../components/ReservationDetails'
import ReservationForm from '../components/ReservationForm'

const Home = () => {
  const {reservations, dispatch} = useReservationsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch('/api/reservations', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_RESERVATIONS', payload: json})
      }
    }

    if (user) {
      fetchReservations()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="reservations">
        {reservations && reservations.map((reservation) => (
          <ReservationDetails key={reservation._id} reservation={reservation} />
        ))}
      </div>
      <ReservationForm />
    </div>
  )
}

export default Home