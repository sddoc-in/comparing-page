
import { OpenAI } from 'openai';


const openai = new OpenAI({apiKey:'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'}); // key to be added



export async function gpt(req, res) {
  const { data } = req.body;
  try {
    const data1 = await main(data);

    res.status(201).json({ data: data1, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}



async function main(data) {
  const completion = await openai.chat.completions.create({
    messages: [{ "role": "system", "content": "You have to compare and summarize all the features of the following platforms" },
    { "role": "user", "content": data }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content)

  return completion.choices[0].message.content
}