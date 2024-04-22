# notypos

This is a simple tool to find typos in a text file. It uses OpenAI to check for typos and suggests corrections.

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
or create a `.env` file in the root of the project with the following content. Don't forget to add the `.env` file to your `.gitignore` file.

3. then run it with the path to the file you want to check
```bash
notypos README.md
```
