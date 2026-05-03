import { useState } from 'react'
import { ChevronDown, Eye, Trash2, Edit2 } from 'lucide-react'

export default function Posts({ posts, updatePost, setSidebarOpen }) {
  const [expandedId, setExpandedId] = useState(null)
  const [sortBy, setSortBy] = useState('recent')

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'scheduled') return new Date(a.scheduledTime) - new Date(b.scheduledTime)
    return 0
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'posted':
        return 'bg-green-500/20 text-green-400'
      case 'pending':
        return 'bg-violet-600/20 text-violet-300'
      case 'failed':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-slate-700/20 text-slate-400'
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      updatePost(id, { status: 'deleted' })
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100">Scheduled Posts</h1>
        <p className="text-sm md:text-base text-slate-400 mt-1 md:mt-2">Manage and monitor all your scheduled content</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xs md:text-sm text-slate-400">
          Showing <span className="font-semibold text-slate-100">{posts.filter(p => p.status !== 'deleted').length}</span> posts
        </div>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <label className="text-xs md:text-sm text-slate-400 whitespace-nowrap">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-2 md:px-3 py-2 text-slate-100 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="recent">Most Recent</option>
            <option value="scheduled">Next Scheduled</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="space-y-2 md:space-y-3">
        {sortedPosts.filter(p => p.status !== 'deleted').map((post) => (
          <div key={post.id} className="border border-slate-700 rounded-lg overflow-hidden">
            {/* Post Row */}
            <button
              onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
              className="w-full bg-slate-800/50 hover:bg-slate-800 transition-colors p-3 md:p-4 flex items-center justify-between text-left gap-2"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-xs md:text-base text-slate-100 truncate">{post.niche} post</h3>
                <p className="text-xs md:text-sm text-slate-400 mt-1 truncate">
                  Scheduled for {post.scheduledTime}
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 ml-2 flex-shrink-0">
                <span className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(post.status)}`}>
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </span>
                <ChevronDown className={`w-4 md:w-5 h-4 md:h-5 text-slate-400 transition-transform flex-shrink-0 ${expandedId === post.id ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === post.id && (
              <div className="bg-slate-900 border-t border-slate-700 p-3 md:p-4 space-y-3 md:space-y-4">
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-slate-400 mb-2">Content Preview</h4>
                  <p className="text-slate-200 text-xs md:text-sm leading-relaxed">{post.content}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-slate-400 font-medium">Created</p>
                    <p className="text-slate-100 mt-1">{post.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Scheduled Time</p>
                    <p className="text-slate-100 mt-1">{post.scheduledTime}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-700">
                  <button className="flex-1 flex items-center justify-center gap-2 px-2 md:px-3 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded-lg transition-colors text-xs md:text-sm font-medium">
                    <Eye className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Preview</span>
                    <span className="sm:hidden">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-2 md:px-3 py-2 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 rounded-lg transition-colors text-xs md:text-sm font-medium">
                    <Edit2 className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
