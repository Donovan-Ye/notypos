const fixTyposPrompt = `
Please help to identify any typos in the given content as much as possible.
Reply with the context, incorrect content, and correct content in the format of "{"context": "context", "err": "incorrect content", "correct": "correct content"}".
Please keep the context including the whole line of the incorrect content.
Add [END] after each error and continue.

<Example>
Assume the content is as follows:
晚风吹过只剩星
Nice to met you
<!-- Badgs -->

Reply:
{"context": "晚风吹过只剩星", "err": "剩", "correct": "生"} [END]\n
{"context": "Nice to met you", "err": "met", "correct": "meet"} [END]\n
{"context": "<!-- Badgs -->", "err": "Badgs", "correct": "Badges"} [END]\n
</Example>

The user's content is as follows:
{{content}}
`

export function getPrompt(content: string) {
  return fixTyposPrompt.replace(/{{content}}/g, content)
}
