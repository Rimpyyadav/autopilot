import { createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendDigestEmail = async (userEmail, userName, post, niche) => {
  try {
    await transporter.sendMail({
      from: `"Social Autopilot" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Your daily ${niche} post is ready!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hey ${userName}! 👋</h2>
          <p>Your AI-generated post for today is ready:</p>
          <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 16px;">${post}</p>
          </div>
          <p>This was automatically generated based on trending <strong>${niche}</strong> topics today.</p>
          <p>Keep growing! 🚀</p>
        </div>
      `
    })
    console.log(`Email sent to ${userEmail}`)
  } catch (error) {
    console.log('Email error:', error.message)
  }
}

export default sendDigestEmail 