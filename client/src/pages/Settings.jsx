import { useState } from 'react'
import { User, Target, Save, Check } from 'lucide-react'

export default function Settings({ niche, profileName, setNiche, setProfileName, setSidebarOpen }) {
  const [formData, setFormData] = useState({
    profileName: profileName,
    niche: niche,
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setProfileName(formData.profileName)
    setNiche(formData.niche)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100">Settings</h1>
        <p className="text-sm md:text-base text-slate-400 mt-1 md:mt-2">Manage your profile and content preferences</p>
      </div>

      {/* Settings Form */}
      <div className="space-y-4 md:space-y-6">
        {/* Profile Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-violet-400" />
            </div>
            <h2 className="text-base md:text-lg font-semibold text-slate-100">Profile Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {/* Profile Name Input */}
            <div>
              <label htmlFor="profileName" className="block text-xs md:text-sm font-medium text-slate-200 mb-2">
                Profile Name
              </label>
              <input
                type="text"
                id="profileName"
                name="profileName"
                value={formData.profileName}
                onChange={handleChange}
                placeholder="Enter your profile name"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 md:px-4 py-2 md:py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
              <p className="text-xs text-slate-400 mt-1">This is how you&apos;ll be identified in the system</p>
            </div>

            {/* Niche Input */}
            <div>
              <label htmlFor="niche" className="block text-xs md:text-sm font-medium text-slate-200 mb-2">
                Content Niche
              </label>
              <div className="flex items-center gap-2">
                <Target className="w-4 md:w-5 h-4 md:h-5 text-violet-400 flex-shrink-0" />
                <input
                  type="text"
                  id="niche"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  placeholder="e.g., Technology, Marketing, Fitness"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 md:px-4 py-2 md:py-3 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">Define your primary content focus area</p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm md:text-base rounded-lg transition-colors font-semibold"
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Settings */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-100 mb-4">Automation Preferences</h2>
          
          <div className="space-y-3 md:space-y-4">
            {/* Toggle Settings */}
            <div className="flex items-center justify-between gap-3 pb-3 md:pb-4 border-b border-slate-700">
              <div className="min-w-0">
                <p className="font-medium text-slate-100 text-sm md:text-base">Auto-publish enabled</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Automatically publish posts at scheduled times</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3 pb-3 md:pb-4 border-b border-slate-700">
              <div className="min-w-0">
                <p className="font-medium text-slate-100 text-sm md:text-base">Email notifications</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Get notified when posts are published</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-slate-100 text-sm md:text-base">Advanced analytics</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">Track detailed engagement metrics</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-700 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
