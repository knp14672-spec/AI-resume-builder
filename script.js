const apiUrl = "https://api-inference.huggingface.co/models/gpt2"; // Model URL
const hfToken = "hf_your_actual_token_here"; // 🔑 અહીં તમારી Hugging Face key નાખો

document.getElementById("generateBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  const location = document.getElementById("location").value;
  const experience = document.getElementById("experience").value;
  const education = document.getElementById("education").value;
  const skills = document.getElementById("skills").value;

  const prompt = `Create a professional resume for ${name}, who is a ${job} based in ${location}. 
  Work experience: ${experience}. 
  Education: ${education}. 
  Skills: ${skills}.`;

  document.getElementById("output").innerText = "⏳ Generating Resume... Please wait...";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": Bearer ${hfToken},
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await response.json();

    if (data && data[0] && data[0].generated_text) {
      document.getElementById("output").innerText = data[0].generated_text;
    } else {
      document.getElementById("output").innerText = "⚠ Error generating resume.";
    }
  } catch (error) {
    document.getElementById("output").innerText = "❌ Failed to fetch AI response.";
  }
});
