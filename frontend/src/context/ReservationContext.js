import { createContext, useReducer } from 'react'

export const ReservationsContext = createContext()

export const reservationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESERVATIONS': 
      return {
        reservations: action.payload
      }
    case 'CREATE_RESERVATION':
      return {
        reservations: [action.payload, ...state.reservations]
      }
    case 'DELETE_RESERVATION':
      return {
        reservations: state.reservations.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ReservationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationsReducer, {
    reservations: null
  })

  return (
    <ReservationsContext.Provider value={{...state, dispatch}}>
      { children }
    </ReservationsContext.Provider>
  )
}