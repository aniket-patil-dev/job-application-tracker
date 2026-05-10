import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Registration failed')

      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='register-container'>
        <div className='register-form-container'>

        <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="">First Name</label>
                <input type="text" id='firstName' className='f-name' onChange={handleChange} value={formData.firstName}/>

                <label htmlFor="">Last Name</label>
                <input type="text" id='lastName' className='l-name' onChange={handleChange} value={formData.lastName}/>

                <label htmlFor="">Email</label>
                <input type="text" id='email' className='email' onChange={handleChange} value={formData.email}/>

                <label htmlFor="">Password</label>
                <input type="password" id="password" className='password' onChange={handleChange} value={formData.password}/>

                {error && <p style={{ color: '#ef4444', alignSelf: 'center' }}>{error}</p>}
                
                <button type='submit' disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>

                <p>Already Registered? <a href="/login">Login</a></p>

            </form>
        </div>
    </div>
  )
}

export default Register