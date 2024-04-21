import { glob } from 'glob'
import runCommand from './run-command'

async function runCommandWithPattern(pattern: string) {
  const matchedFiles = await glob(pattern, { ignore: 'node_modules/**' })
  return await runCommand([...matchedFiles])
}

export default runCommandWithPattern
