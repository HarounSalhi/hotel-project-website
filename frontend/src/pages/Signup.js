import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [tel, setTel] = useState('')
  const [address, setAddress] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password, username, tel, address)
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

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup