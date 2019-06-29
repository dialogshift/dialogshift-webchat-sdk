import * as chai from 'chai'
import * as sinon from 'sinon'

import { App } from '../../src/scripts/core/app'
import { instance } from '../../src/scripts/index'

describe('instance()', () => {
  let initStub
  const sandbox = sinon.sandbox.create()

  before(() => {
    initStub = sandbox.stub(App.prototype, <any>'init')
  })

  after(() => {
    sandbox.restore()
  })

  it('should throw chat configuration exception', () => {
    chai
      .expect(() => {
        instance()
      })
      .to.throw(/Please provide Dialogshift chat configuration/)
  })

  it('should return singleton chat instance', () => {
    const client = instance({
      id: 'id',
    })

    chai.expect(client).equal(instance())
    chai.expect(instance()).equal(instance())
    chai.expect(initStub.called).equal(true)
  })
})
