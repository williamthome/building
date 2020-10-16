const micromatch = require('micromatch')

module.exports = {
  '*.ts': files => {
    const match = micromatch(files, '*.test.ts')
      || micromatch(files, '*.spec.ts')
      || micromatch(files, '*.mock.ts')
      || micromatch(files, '*.spy.ts')
    return `eslint ${match.join(' ')}`
  }
}