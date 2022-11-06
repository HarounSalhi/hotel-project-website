import { Link } from 'react-router-dom'
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [address, setAddress] = useState('')
  const [genre, setGenre] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, username, tel, address, genre)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Username:</label>
      <input 
        type="string" 
        onChange={(e) => setUsername(e.target.value)} 
        value={username} 
      />
      <label>phone:</label>
      <input 
        type="number" 
        onChange={(e) => setTel(e.target.value)} 
        value={tel} 
      />
      <label>address:</label>
      <input 
        type="string" 
        onChange={(e) => setAddress(e.target.value)} 
        value={address} 
      />

      <label>genre:</label>
      <select 
        onChange={(e) => setGenre(e.target.value)}
        value={genre}
      >
          <option value="">--choisir une option--</option>
          <option value="femme">Femme</option>
          <option value="homme">Homme</option>
      </select>

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <p>Vous avez un compte, <Link to="/login">log-in</Link></p>
    </form>
  )
}

export default Signup