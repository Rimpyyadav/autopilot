import axios from 'axios'
import * as cheerio from 'cheerio'

const getTrendingTopics = async (niche) => {
  try {
    const url = `https://www.reddit.com/r/${niche}/hot.json?limit=5`
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    const posts = response.data.data.children
    const topics = posts.map(post => ({
      title: post.data.title,
      upvotes: post.data.ups,
      url: `https://reddit.com${post.data.permalink}`
    }))

    return topics

  } catch (error) {
    console.log('Scraper error:', error.message)
    return []
  }
}

export default getTrendingTopics 