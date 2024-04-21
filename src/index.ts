/* eslint-disable no-console */
import { existsSync } from 'node:fs'
import process from 'node:process'
import { program } from 'commander'
import chalk from 'chalk'
import LLMProvider from 'llm-provider'

async function notypes() {
  program.option('--first').option('-s, --separator <char>')
  program.parse()

  // const options = program.opts();

  const files = program.args.filter(arg => existsSync(arg))
  if (files.length === 0) {
    console.log(chalk.red('No files found. Exiting.'))
    return
  }

  if (!process.env.API_KEY) {
    console.log(
      chalk.red(
        'API_KEY not found. Please use `export API_KEY=your-api-key` to set it. Exiting.',
      ),
    )
    return
  }

  if (!process.env.PROVIDER_TYPE) {
    console.log(
      chalk.yellow('PROVIDER_TYPE not found. Using default value \'openai\'.'),
    )

    if (!process.env.MODEL) {
      console.log(
        chalk.yellow('MODEL not found. Using default value \'gpt-3.5-turbo\'.'),
      )
    }
  }

  const settings = {
    PROVIDER_TYPE: process.env.PROVIDER_TYPE || 'openai',
    MODEL: process.env.MODEL || 'gpt-3.5-turbo',
    API_KEY: process.env.API_KEY,
    BASE_URL: process.env.BASE_URL,
  }

  console.log(
    chalk.green(
      `Starting with settings: ${JSON.stringify(settings, undefined, 2)}`,
    ),
  )

  const provider = new LLMProvider({
    providerType: settings.PROVIDER_TYPE,
    model: settings.MODEL,
    apiKey: settings.API_KEY,
    baseUrl: settings.BASE_URL,
  })

  for (const file of files) {
    console.log(chalk.blue(`Processing ${file}`))

    const _stream = await provider.chat({
      messages: [
        {
          role: 'user',
          content: `请你找出`,
        },
      ],
      stream: true,
    })
  }

  console.log(chalk.green('All done.'))
}

notypes()
