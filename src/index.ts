/* eslint-disable no-console */
import { existsSync, readFileSync } from 'node:fs'
import process from 'node:process'
import { program } from 'commander'
import chalk from 'chalk'
import LLMProvider from 'llm-provider'
import dotenv from 'dotenv'
import { getPrompt } from './prompt'

dotenv.config({
  path: '.env.notypos',
})

async function notypes() {
  program.parse()

  const files = program.args.filter(arg => existsSync(arg))
  if (files.length === 0) {
    console.log(chalk.red('No files found. Exiting.'))
    return
  }

  if (!process.env.NOTYPOS_API_KEY) {
    console.log(
      chalk.red(
        'NOTYPOS_API_KEY not found. Please use `export NOTYPOS_API_KEY=your-api-key` to set it or add it to .env.notypos file. Exiting.',
      ),
    )
    return
  }

  if (!process.env.NOTYPOS_PROVIDER_TYPE) {
    // console.log(
    //   chalk.yellow('NOTYPOS_PROVIDER_TYPE not found. Using default value \'openai\'.'),
    // )

    if (!process.env.NOTYPOS_MODEL) {
      console.log(
        chalk.yellow('NOTYPOS_MODEL not found. Using default value \'gpt-3.5-turbo\'.'),
      )
    }
  }

  const settings = {
    // not allow to change provider for now
    // NOTYPOS_PROVIDER_TYPE: process.env.NOTYPOS_PROVIDER_TYPE || 'openai',
    NOTYPOS_PROVIDER_TYPE: 'openai',
    NOTYPOS_MODEL: process.env.NOTYPOS_MODEL || 'gpt-3.5-turbo',
    NOTYPOS_API_KEY: process.env.NOTYPOS_API_KEY,
    NOTYPOS_BASE_URL: process.env.NOTYPOS_BASE_URL,
  }

  console.log(
    chalk.green(
      `Starting with settings: ${JSON.stringify(settings, undefined, 2)}`,
    ),
    '\n',
  )

  let total = 0
  const provider = new LLMProvider({
    providerType: settings.NOTYPOS_PROVIDER_TYPE,
    model: settings.NOTYPOS_MODEL,
    apiKey: settings.NOTYPOS_API_KEY,
    baseUrl: settings.NOTYPOS_BASE_URL,
  })

  for (const file of files) {
    console.log(chalk.underline(chalk.blue(`${file}`)))

    try {
      let count = 0
      const content = readFileSync(file)?.toString()
      const prompt = getPrompt(content.toString())
      const res = await provider.chat({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
      })

      let singleTypo = ''
      for await (const message of res.content) {
        singleTypo += message
        if (singleTypo.includes('[END]')) {
          const converted = singleTypo.replace(/\[END\]\n/g, '').replace(/\[END\]/g, '')
          const typo = JSON.parse(converted)
          const row = content.split('\n')?.findIndex(row => row.includes(typo.context))
          const col = content.split('\n')[row]?.indexOf(typo.err)
          console.log(`${row + 1}:${col + 1} ${typo.err} -> ${typo.correct}`)

          count++
          singleTypo = ''
        }
      }

      if (count === 0)
        console.log(chalk.green('No typos found.'))

      total += count
      process.stdout.write('\n')
    }
    catch (e) {
      console.log(chalk.red(`Error processing ${file}`))
      console.log(e)
    }
  }

  console.log(chalk.green(`All done. Found ${total} possible typos.`))
}

notypes()
