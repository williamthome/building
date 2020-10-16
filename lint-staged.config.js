const micromatch = require('micromatch')

module.exports = {
  '*.ts': files => {
    const match = micromatch.not(files, '*.test.ts')
      || micromatch.not(files, '*.spec.ts')
      || micromatch.not(files, '*.mock.ts')
      || micromatch.not(files, '*.spy.ts')
    return `eslint ${match.join(' ')}`
  }
}