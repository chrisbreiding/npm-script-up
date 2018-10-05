const chalk = require('chalk')
const debug = require('debug')('script-up')
const fs = require('fs-extra')
const path = require('path')

const isGitRootFolder = (folder) => fs.existsSync(path.join(folder, '.git'))

const getParentDir = (dir) => path.resolve(dir, '..')

const getPackageJson = (dir) => {
  return fs.readJsonSync(path.join(dir, 'package.json'), { throws: false })
}

const scriptUp = (scriptName, startDir = process.cwd()) => {
  if (!scriptName) {
    throw new Error('You must pass a script name as the first argument, e.g: script-up test')
  }

  const find = (dir) => {
    debug('Looking for npm script', chalk.blue(scriptName), 'in', chalk.magenta(dir))
    const packageJson = getPackageJson(dir)

    if (packageJson && packageJson.scripts && packageJson.scripts[scriptName]) {
      debug('Found npm script', chalk.blue(scriptName), 'in', chalk.magenta(dir))
      return dir
    }

    if (isGitRootFolder(dir)) {
      throw new Error(`Reached git root directory ${dir}, but could not find npm script '${scriptName}'`)
    }

    const parent = getParentDir(dir)

    if (parent === dir) {
      throw new Error(`Reached top level directory ${dir}, but could not find npm script '${scriptName}'`)
    }

    return find(parent)
  }

  return find(getParentDir(startDir))
}

module.exports = scriptUp
