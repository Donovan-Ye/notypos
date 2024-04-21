import { exec } from 'node:child_process'

function runCommand(args: any[] = []): Promise<string> {
  const notypes = './src/index.ts'
  const command = `npx jiti ${notypes} ${args.join(' ')}`

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(error.message))
        return
      }

      if (stderr) {
        reject(new Error(stderr))
        return
      }

      resolve(stdout)
    })
  })
}

export default runCommand
