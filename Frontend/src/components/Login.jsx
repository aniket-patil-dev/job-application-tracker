import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const body = new URLSearchParams({
        username: formData.email,
        password: formData.password,
      })

      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: body.toString()
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')

      localStorage.setItem('access_token', data.access_token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container'>
        <div className='form-container'>

        <h1>Login</h1>
        
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input type="text" id='email' className='email' onChange={handleChange} value={formData.email}/>

                <label htmlFor="">Password</label>
                <input type="password" id="password" className='password' onChange={handleChange} value={formData.password}/>

                {error && <p style={{ color: '#ef4444', alignSelf: 'center' }}>{error}</p>}

                <button type='submit' disabled={isLoading}>
                  { isLoading ? "Loggin in...." : 'Login'}
                </button>

                <p>Still not Registered? <a href="/register">Register</a></p>

            </form>
        </div>
    </div>
  )
}

export default Login