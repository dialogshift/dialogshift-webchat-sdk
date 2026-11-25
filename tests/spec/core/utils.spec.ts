import { isHttpUrl, parseUrlParam } from '../../../src/scripts/core/utils'
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

  describe('isHttpUrl()', () => {
    const base = 'https://www.dialog.com/rooms'

    it('should accept http, https and relative URLs', () => {
      expect(isHttpUrl('https://booking.dialog.com/?a=1', base)).equal(true)
      expect(isHttpUrl('http://www.dialog.com', base)).equal(true)
      expect(isHttpUrl('/offers', base)).equal(true)
    })

    it('should reject script and data URLs', () => {
      expect(isHttpUrl('javascript:alert(1)', base)).equal(false)
      expect(isHttpUrl(' JavaScript:alert(1)', base)).equal(false)
      expect(isHttpUrl('data:text/html,<script>alert(1)</script>', base)).equal(
        false,
      )
    })
  })
})
