import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Posts from './pages/Posts'
import { useState, useEffect } from 'react'
import axios from './utils/axios'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('/posts')
        .then(res => setPosts(res.data))
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    fetchPosts()
    const interval = setInterval(fetchPosts, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard posts={posts} fetchPosts={fetchPosts} />
          </ProtectedRoute>
        } />
        <Route path="/posts" element={
          <ProtectedRoute>
            <Posts posts={posts} />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App