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
      const defaultInitialElement = {
        successor: null,
        suppress: false,
      }

      chai
        .expect(facade.getInitialElement())
        .to.deep.equal(defaultInitialElement)
    })

    it('should return redeclared initial successor', () => {
      const initialElementSuccessor = 'welcome-1'
      const facade = createFacade(
        new App({
          id: '3E8',
          initialElement: {
            successor: initialElementSuccessor,
          },
        }),
      )

      const expectedInitialElement = {
        successor: initialElementSuccessor,
        suppress: false,
      }

      chai
        .expect(facade.getInitialElement())
        .to.deep.equal(expectedInitialElement)
    })

    it('should return redeclared initial element', () => {
      const initialElementSuccessor = 'welcome-1'
      const facade = createFacade(
        new App({
          id: '3E8',
          initialElement: {
            successor: initialElementSuccessor,
            suppress: true,
          },
        }),
      )

      const expectedInitialElement = {
        successor: initialElementSuccessor,
        suppress: true,
      }

      chai
        .expect(facade.getInitialElement())
        .to.deep.equal(expectedInitialElement)
    })
  })

  describe('setInitialElement()', () => {
    it('should return redeclared initial successor', () => {
      const initialElementSuccessor = 'welcome-1'
      const initialElement = {
        successor: initialElementSuccessor,
      }
      const expectedInitialElement = {
        successor: initialElementSuccessor,
        suppress: false,
      }
      const facade = createFacade(new App({ id: '3E8' }))

      facade.setInitialElement(initialElement)
      chai
        .expect(facade.getInitialElement())
        .to.deep.equal(expectedInitialElement)
    })

    it('should return redeclared initial element', () => {
      const initialElement = {
        successor: 'welcome-1',
        suppress: true,
      }
      const initialElement2 = {
        successor: 'welcome-2',
        suppress: false,
      }
      const facade = createFacade(new App({ id: '3E8' }))

      facade.setInitialElement(initialElement)
      chai.expect(facade.getInitialElement()).to.deep.equal(initialElement)

      facade.setInitialElement(initialElement2)
      chai.expect(facade.getInitialElement()).to.deep.equal(initialElement2)
    })
  })
})
