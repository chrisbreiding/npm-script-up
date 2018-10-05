const chai = require('chai')
const fs = require('fs-extra')
const path = require('path')
const sinon = require('sinon')

const expect = chai.expect
chai.use(require('sinon-chai'))

const scriptUp = require('..')

describe('script-up', () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('returns directory where npm script is found', () => {
    sinon.stub(fs, 'readJsonSync').returns({ scripts: { script: 'echo "foo"' } })
    expect(scriptUp('script', '/foo/bar')).to.equal('/foo')
  })

  it('throws if no script name provided', () => {
    expect(() => {
      scriptUp()
    }).to.throw('You must pass a script name as the first argument, e.g: script-up test')
  })

  it('throws if it reaches the git root', () => {
    sinon.stub(fs, 'existsSync').returns(true)
    expect(() => {
      scriptUp('script', '/foo')
    }).to.throw('Reached git root directory /, but could not find npm script \'script\'')
  })

  it('throws if reaching top level directory without finding script', () => {
    sinon.stub(path, 'resolve').withArgs('/foo').returns('/foo')
    expect(() => {
      scriptUp('script', '/foo')
    }).to.throw('Reached top level directory /foo, but could not find npm script \'script\'')
  })
})
