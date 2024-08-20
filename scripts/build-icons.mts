import * as path from 'node:path'

import fsExtra from 'fs-extra'
import { glob } from 'glob'
import { parse } from 'node-html-parser'

const cwd = process.cwd()
const inputDirectory = path.join(cwd, 'scripts', 'svg-icons')
const inputDirRelative = path.relative(cwd, inputDirectory)
const ignoreFiles = ['devto.svg']

const outputDir = path.join(cwd, 'public', 'icons')
await fsExtra.ensureDir(outputDir)

const files = glob
  .sync('**/*.svg', {
    cwd: inputDirectory,
  })
  .sort((a, b) => a.localeCompare(b))

const shouldVerboseLog = process.argv.includes('--log=verbose')

const logVerbose = shouldVerboseLog ? console.log : () => {}

if (files.length === 0) {
  console.log(`No files found in ${inputDirRelative}`)
} else {
  await generateIconFiles()
}

async function generateIconFiles() {
  const spriteFilepath = path.join(outputDir, 'sprite.svg')
  const typeOutputFilepath = path.join(outputDir, 'name.d.ts')

  const currentSprite = await fsExtra
    .readFile(spriteFilepath, 'utf-8')
    .catch(() => '')
  const currentType = await fsExtra
    .readFile(typeOutputFilepath, 'utf-8')
    .catch(() => '')

  const iconNames = files.map((file) => iconName(file))

  const spriteUpToDate = iconNames.every((name) =>
    currentSprite.includes(`id=${name}`)
  )
  const typesUpToDate = iconNames.every((name) =>
    currentType.includes(`${name}`)
  )

  if (spriteUpToDate && typesUpToDate) {
    logVerbose(`Icons are up to date`)
    return
  }

  logVerbose(`Generating sprite for ${inputDirRelative}`)

  const spriteChanged = await generateSvgSprite({
    files,
    inputDirectory,
    outputDir: spriteFilepath,
  })

  for (const file of files) {
    logVerbose(`✅ `, file)
  }

  logVerbose(`Saved to ${path.relative(cwd, spriteFilepath)}`)

  const stringifiedIconNames = iconNames.map((name) => JSON.stringify(name))

  const typeOutputContent = `// This file is generated by yarn build:icons

  export type IconName =
  \t| ${stringifiedIconNames.join('\n\t| ')}`

  const typesChanged = await writeIfChanged(
    typeOutputFilepath,
    typeOutputContent
  )

  logVerbose(`Manifest saved to ${path.relative(cwd, typeOutputFilepath)}`)

  const readmeChanged = await writeIfChanged(
    path.join(outputDir, 'README.md'),
    `# Icons
    This directory contains SVG icons that are used by the app.
    Everything in this directory is generated by 'yarn build:icons'.`
  )

  if (spriteChanged || typesChanged || readmeChanged) {
    console.log(`Generated ${files.length} icons`)
  }
}

function iconName(file: string) {
  // Check if the filename starts with "__ignore_"
  if (file.startsWith('__ignore_')) {
    // Extract the part of the filename after "__ignore_" and before ".svg"
    return file.replace(/^__ignore_(.+)\.svg$/, '$1')
  } else {
    // For regular files, just remove the ".svg" extension
    return file.replace(/\.svg$/, '')
  }
}

async function generateSvgSprite({
  files,
  inputDirectory,
  outputDir,
}: {
  files: string[]
  inputDirectory: string
  outputDir: string
}) {
  const symbol = await Promise.all(
    files.map(async (file) => {
      // Check if the file name starts with "__ignore_"
      const isFileIgnored = file.startsWith('__ignore_')

      const input = await fsExtra.readFile(
        path.join(inputDirectory, file),
        'utf-8'
      )
      const root = parse(input)
      const svg = root.querySelector('svg')
      if (!svg) throw new Error('No SVG element found')

      svg.tagName = 'symbol'
      svg.setAttribute('id', iconName(file))

      svg.removeAttribute('xmlns')
      svg.removeAttribute('xmlns:xlink')
      svg.removeAttribute('version')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      svg.removeAttribute('fill')

      if (!isFileIgnored) {
        const paths = svg.querySelectorAll('path')
        for (const path of paths) {
          path.removeAttribute('fill')
        }
      }

      return svg.toString().trim()
    })
  )

  const output = [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<!-- This file is generated by yarn build:icons -->`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`,
    ...symbol,
    `</defs>`,
    `</svg>`,
    '', // trailing newline
  ].join('\n')

  return writeIfChanged(outputDir, output)
}

async function writeIfChanged(filepath: string, newContent: string) {
  const currentContent = fsExtra.readFile(filepath, 'utf-8').catch(() => '')
  if (await currentContent === newContent) {
    return false
  }
  await fsExtra.writeFile(filepath, newContent, 'utf-8')
  return true
}
