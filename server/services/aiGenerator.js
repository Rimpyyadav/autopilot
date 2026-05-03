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
          content: `You are a social media expert. Generate engaging posts for ${niche} niche. 
Keep posts under 280 characters. Be conversational and use relevant hashtags.
Return ONLY a JSON array with 3 posts like this:
[{"post": "post content here"}, {"post": "post content here"}, {"post": "post content here"}]
No extra text, just the JSON array.`
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