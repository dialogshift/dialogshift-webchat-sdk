import * as chai from 'chai'
import * as sinon from 'sinon'

import { createFacade } from '../../../src/scripts/core/facade'
import { App } from '../../../src/scripts/core/app'

describe('Facade', () => {
  const sandbox = sinon.sandbox.create()

  before(() => {
    sandbox.stub(App.prototype, <any>'init')
  })

  after(() => {
    sandbox.restore()
  })

  describe('getInitialElement()', () => {
    it('should return default initialElement when initialElement is not setted', () => {
      const facade = createFacade(new App({ id: '3E8' }))

      chai.expect(facade.getInitialElement()).equal(null)
    })

    it('should return initialElement from config', () => {
      const initialElement1 = 'welcome-1'
      const facade = createFacade(
        new App({ id: '3E8', initialElement: initialElement1 }),
      )

      chai.expect(facade.getInitialElement()).equal(initialElement1)
    })
  })

  describe('setInitialElement()', () => {
    it('should return throw exception if initialElement is not a string', () => {
      const facade = createFacade(new App({ id: '3E8' }))

      chai
        .expect(() => {
          facade.setInitialElement(null)
        })
        .to.throw()
    })

    it('should return the last setted initialElement', () => {
      const initialElement1 = 'welcome-1'
      const initialElement2 = 'welcome-2'
      const initialElement3 = 'welcome-3'
      const facade = createFacade(
        new App({ id: '3E8', initialElement: initialElement1 }),
      )

      facade.setInitialElement(initialElement2)

      chai.expect(facade.getInitialElement()).equal(initialElement2)

      facade.setInitialElement(initialElement3)

      chai.expect(facade.getInitialElement()).equal(initialElement3)
    })
  })

  describe('removeInitialElement()', () => {
    it('should remove initialElement setted from config', () => {
      const initialElement1 = 'welcome-1'
      const facade = createFacade(
        new App({ id: '3E8', initialElement: initialElement1 }),
      )

      facade.removeInitialElement()

      chai.expect(facade.getInitialElement()).equal(null)
    })

    it('should remove initialElement setted by setInitialElement()', () => {
      const initialElement1 = 'welcome-1'
      const facade = createFacade(new App({ id: '3E8' }))

      facade.setInitialElement(initialElement1)

      facade.removeInitialElement()

      chai.expect(facade.getInitialElement()).equal(null)
    })
  })
})
