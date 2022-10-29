import { useAuthContext } from './useAuthContext'
import { useReservationsContext } from './useReservationsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchReservations } = useReservationsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchReservations({ type: 'SET_RESERVATIONS', payload: null })
  }

  return { logout }
}