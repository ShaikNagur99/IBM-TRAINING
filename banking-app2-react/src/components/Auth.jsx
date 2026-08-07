import React, { useState } from 'react'

function Auth({ onLogin, onSignup }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('rememberedName') || ''
    } catch (e) {
      return ''
    }
  })
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberName, setRememberName] = useState(() => {
    try {
      return localStorage.getItem('rememberedName') ? true : false
    } catch (e) {
      return false
    }
  })
  const [rememberLogin, setRememberLogin] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 4) {
      setError('Password must be at least 4 characters long.')
      return
    }

    const strength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak'
    if (strength === 'weak') {
      setError('Password strength is weak. Use 6+ characters for better strength.')
      return
    }

    if (rememberName) {
      try {
        localStorage.setItem('rememberedName', name)
      } catch (e) {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem('rememberedName')
      } catch (e) {
        // ignore
      }
    }

    const user = { name: name || 'Anonymous' }
    if (mode === 'login') {
      if (typeof onLogin === 'function') onLogin(user, rememberLogin)
    } else {
      if (typeof onSignup === 'function') onSignup(user, rememberLogin)
    }
  }

  return (
    <div className="auth-root">
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-brand">
          <span>🏦</span>
          <h1>Simple Bank</h1>
        </div>
        <h2 className="auth-title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        {error && <p className="auth-error">{error}</p>}

        <div className="input-group">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
        </div>

        <div className="input-group password-group">
          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
          />
          <button
            type="button"
            className="btn secondary password-toggle"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="auth-remember">
          <label>
            <input
              type="checkbox"
              checked={rememberName}
              onChange={e => setRememberName(e.target.checked)}
            />
            <span>Remember my name</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={rememberLogin}
              onChange={e => setRememberLogin(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
        </div>

        <div className="auth-actions">
          <button className="btn primary" type="submit">
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Create account' : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Auth
