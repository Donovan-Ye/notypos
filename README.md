# notypos

<div align="center">
  <img src="https://github.com/Donovan-Ye/notypos/assets/72693206/528aeba6-595a-4976-a37f-127fff9e4302" alt="Alt text" width="400" height="400">
</div>

This is a simple tool to find typos in a text file. It uses OpenAI to check for typos and suggests corrections.

## Warning

- This tool is not perfect and may not catch all typos. Develop it for fun and learning purposes.
- It uses OpenAI API, please be aware of the cost of using it.

## Usage

1. suggest to install it globally
```bash
npm install -g notypos
```

2. add your OpenAI API key to your environment variables
```bash
export NOTYPOS_MODEL="model-name" // default is "gpt-3.5-turbo"
export NOTYPOS_API_KEY="api-key"
export NOTYPOS_BASE_URL="base-url" // default is "https://api.openai.com/v1"
```

Personally, I suggest to add it permanently. Like adding it to the end of `~/.zshrc` file at macOS, and use `source ~/.zshrc` to apply the changes.

or create a `.env.notypos` file in the root of the project with above variables. Don't forget to add the `.env.notypos` file to your `.gitignore` file.

3. then run it with the path to the file you want to check
```bash
notypos README.md
```
