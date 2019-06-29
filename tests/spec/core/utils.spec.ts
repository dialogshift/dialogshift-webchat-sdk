import { parseUrlParam } from '../../../src/scripts/core/utils'
import { expect } from 'chai'

// import * as jsdom from 'mocha-jsdom'
// jsdom({ url: 'https://www.dialog.com/' })
describe('Utils', () => {
  describe('parseUrlParam()', () => {
    it('should return default param when URL has no requested GET parameter', () => {
      const url = 'https://www.dialog.com/'
      const defaultParam = 'default'
      const param = parseUrlParam(url, 'dschat', defaultParam)

      expect(param).equal(defaultParam)
    })

    it('should return expected GET param from URL', () => {
      const value = '1'
      const url = 'https://www.dialog.com?dschat=1'
      const param = parseUrlParam(url, 'dschat')

      expect(param).equal(value)
    })
  })
})
