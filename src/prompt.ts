const fixTyposPrompt = `
Please identify any typos and grammatical errors in the given content as much as possible, don't worry about making mistakes.
Reply with the context, incorrect content, and correct content in the format of "{"context": "context", "err": "incorrect content", "correct": "correct content"}".
Please keep the context including orignal line.
Add [END] after each error and continue.

<Example>
Assume the content is as follows:
Nice to met you

Reply:
{"context": "Nice to met you", "err": "met", "correct": "meet"} [END]\n
</Example>

The user's content is as follows:
{{content}}
`

export function getPrompt(content: string) {
  return fixTyposPrompt.replace(/{{content}}/g, content)
}
