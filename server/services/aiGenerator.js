import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const generatePosts = async (niche, topics) => {
  try {
    const topicTitles = topics.map(t => t.title).join('\n')

    const completion = await groq.chat.completions.create({
     model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a social media expert. Generate a ${platform} post about ${niche}.
${platform === 'linkedin' ? 'Professional tone, 150-200 words, insight-driven.' : ''}
${platform === 'twitter' ? 'Casual, under 280 chars, use hashtags and emojis.' : ''}
${platform === 'instagram' ? 'Visual storytelling, emojis, 5-10 hashtags.' : ''}`
        },
        {
          role: 'user',
          content: `Generate 3 social media posts based on these trending topics:\n${topicTitles}`
        }
      ]
    })
    console.log('Groq response:', completion.choices[0].message.content)
    const content = completion.choices[0].message.content

    const posts = JSON.parse(content) // ⚠️ can fail if model returns bad JSON
    return posts

  } catch (error) {
    console.log('Groq error:', error.message)
    return []
  }
}