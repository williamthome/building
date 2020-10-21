const micromatch = require('micromatch')

module.exports = {
  '*.ts': files => {
    const match = micromatch.not(files, [
      '*.test.ts', '*.spec.ts', '*.mock.ts', '*.spy.ts'
    ])
    return `eslint ${match.join(' ')}`
  }
}