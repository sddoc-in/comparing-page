
import { OpenAI } from 'openai';


const openai = new OpenAI({ apiKey: '' }); // key to be added



export async function gpt(req, res) {
  const { data } = req.body;
  try {

    // processing data
    let corePlatform = data.corePlatform;
    let targetPlatform = data.targetPlatform;

    let coreFeatures = corePlatform.features.map((feature) => feature).join(", ");

    let promptString = `
    I want you to act as a seasoned and experienced database administrator and trainer for ${targetPlatform} database administration. 
    You will generate a comprehensive training manual suitable for an ${corePlatform.platformName} database administrator.
     I want you to use my knowledge as an ${corePlatform.platformName} database administrator to enumerate and explain differences in how both platforms achieve
      ${coreFeatures}, the write up must be at least 2000 words and use bullet points
    `

    const data1 = await main(promptString);


    res.status(201).json({ data: data1, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



async function main(data) {
  const completion = await openai.chat.completions.create({
    messages: [      { "role": "user", "content": data }],
    model: "gpt-3.5-turbo",
  });


  return completion.choices[0].message.content
}