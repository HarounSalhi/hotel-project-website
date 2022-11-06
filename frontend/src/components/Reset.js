import { useState } from "react";
const Reset = () => {
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    await Reset(password)
  }

  return (
    <form>
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <div className="login_btn">
        <button>reset</button>
      </div>
    </form>
  );
};

export default Reset;