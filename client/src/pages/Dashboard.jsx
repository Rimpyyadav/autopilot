import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import { BarChart3, Target, Clock, FileText } from 'lucide-react'

export default function Dashboard({ posts = [], fetchPosts }) {
  const [user, setUser] = useState(null)
  const [generating, setGenerating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tokenFromGoogle = params.get('token')
    if (tokenFromGoogle) {
      localStorage.setItem('token', tokenFromGoogle)
      window.history.replaceState({}, '', '/dashboard')
    }
    axios.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => navigate('/login'))
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const generateNow = async () => {
    setGenerating(true)
    try {
      await axios.get(`/scraper/generate/${user.niche || 'technology'}`)
      fetchPosts()
    } catch (err) {
      console.log(err)
    }
    setGenerating(false)
  }

  if (!user) return <p className="text-white p-6">Loading...</p>

  const postedCount = posts.filter(p => p.status === 'posted').length
  const nextScheduled = posts
    .filter(p => p.status === 'pending')
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))[0]
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            Welcome back, {user.name}
          </h1>
          <p className="text-slate-400 mt-1">{user.email} • {user.plan}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={generateNow}
            disabled={generating}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
          >
            {generating ? 'Generating...' : '⚡ Generate Now'}
          </button>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
            </div>
            <FileText className="text-violet-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400 text-sm">Niche</p>
              <p className="text-2xl font-bold text-white">{user.niche || 'technology'}</p>
            </div>
            <Target className="text-violet-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400 text-sm">Published</p>
              <p className="text-2xl font-bold text-violet-400">{postedCount}</p>
            </div>
            <BarChart3 className="text-violet-400" />
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-slate-400 text-sm">Next Scheduled</p>
              <p className="text-lg font-bold text-white">
                {nextScheduled ? new Date(nextScheduled.scheduledAt).toLocaleDateString() : 'None'}
              </p>
            </div>
            <Clock className="text-violet-400" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Recent Posts</h2>
        <div className="space-y-3">
          {recentPosts.length === 0 && (
            <p className="text-slate-400">No posts yet — click Generate Now!</p>
          )}
          {recentPosts.map((post) => (
            <div key={post._id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mt-1">{post.content}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-400">
                  {new Date(post.scheduledAt).toLocaleDateString()}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  post.status === 'posted' ? 'bg-green-500/20 text-green-400' : 'bg-violet-500/20 text-violet-300'
                }`}>
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}