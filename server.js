const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/generate-resume', async (req, res) => {
  try {
    const { fullname, title, location, contact, work, education, skills } = req.body;
    const prompt = `
Write a professional resume in HTML format using this info:
Name: ${fullname}
Title: ${title}
Location: ${location}
Contact: ${contact}
Work Experience: ${work}
Education: ${education}
Skills: ${skills}
Generate clean HTML with sections: Summary, Experience, Education, Skills. Use bullet points for work.`;
    
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages:[{role:'user', content: prompt}],
      max_tokens: 800,
      temperature: 0.7
    });
    
    const resumeText = response.data.choices[0].message.content;
    res.json({ resume: resumeText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
