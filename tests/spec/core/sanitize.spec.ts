import { expect } from 'chai'

import { sanitizeHtml } from '../../../src/scripts/core/utils'
import { BaseWidget } from '../../../src/scripts/core/base-widget'

// Without @types/jsdom, whose dependencies break the declaration build of the SDK
const { JSDOM } = require('jsdom')

const domGlobals = ['window', 'document', 'DOMParser']

const render = (html: string): string => {
  const container = document.createElement('div')
  container.appendChild(sanitizeHtml(html))

  return container.innerHTML
}

describe('sanitizeHtml()', () => {
  before(() => {
    const dom = new JSDOM('<!DOCTYPE html><body></body>', {
      url: 'https://www.hotel.example/rooms',
    })

    domGlobals.forEach((name) => {
      global[name] = dom.window[name]
    })
  })

  after(() => {
    domGlobals.forEach((name) => {
      delete global[name]
    })
  })

  it('should keep formatting tags', () => {
    const html =
      'Hello <strong>guest</strong>,<br>book <b>now</b> and <em>save</em> <i>10</i> <u>%</u>' +
      '<p><small>until</small> <s>May</s> <sub>1</sub><sup>2</sup></p><ul><li>a</li></ul><ol><li>b</li></ol>' +
      '<div><span>line</span></div>'

    expect(render(html)).equal(html)
  })

  it('should keep links with http, https, mailto, tel and relative URLs', () => {
    expect(render('<a href="https://booking.example/?a=1&amp;b=2">Book</a>')).equal(
      '<a href="https://booking.example/?a=1&amp;b=2">Book</a>',
    )
    expect(render('<a href="http://hotel.example">x</a>')).equal(
      '<a href="http://hotel.example">x</a>',
    )
    expect(render('<a href="mailto:info@hotel.example">x</a>')).equal(
      '<a href="mailto:info@hotel.example">x</a>',
    )
    expect(render('<a href="tel:+4930123">x</a>')).equal(
      '<a href="tel:+4930123">x</a>',
    )
    expect(render('<a href="/offers">x</a>')).equal('<a href="/offers">x</a>')
  })

  it('should open links in a new tab without access to the page', () => {
    expect(render('<a href="https://booking.example" target="_blank">x</a>')).equal(
      '<a href="https://booking.example" target="_blank" rel="noopener">x</a>',
    )
    expect(render('<a href="https://booking.example" target="other">x</a>')).equal(
      '<a href="https://booking.example">x</a>',
    )
  })

  it('should remove links to script and data URLs and keep their text', () => {
    const urls = [
      'javascript:alert(1)',
      ' JavaScript:alert(1)',
      'java&#x09;script:alert(1)',
      'javascript&colon;alert(1)',
      '&#106;avascript:alert(1)',
      'vbscript:msgbox(1)',
      'data:text/html,<script>alert(1)</script>',
      'blob:https://www.hotel.example/1',
    ]

    urls.forEach((url) => {
      expect(render(`<a href="${url}">x</a>`)).equal('<a>x</a>')
    })
  })

  it('should remove all other attributes', () => {
    expect(
      render(
        '<b onclick="alert(1)" style="position:fixed" class="x" id="y">x</b>' +
          '<a href="https://hotel.example" onmouseover="alert(1)" style="color:red" ping="https://t.example">y</a>',
      ),
    ).equal('<b>x</b><a href="https://hotel.example">y</a>')
  })

  it('should remove script, style and embedded content with its content', () => {
    expect(
      render(
        'a<script>alert(1)</script><style>body{display:none}</style><iframe src="https://x.example"></iframe>' +
          '<object data="x"></object><embed src="x"><template><b>t</b></template><noscript>n</noscript>' +
          '<textarea>t</textarea><select><option>o</option></select><title>t</title>b',
      ),
    ).equal('ab')
  })

  it('should remove images, SVG, MathML and forms', () => {
    expect(
      render(
        '<img src="x" onerror="alert(1)"><svg onload="alert(1)"><text>s</text></svg>' +
          '<math><mi>m</mi></math><form action="https://x.example"><input value="i"><button>b</button></form>ok',
      ),
    ).equal('bok')
  })

  it('should replace unknown tags by their content', () => {
    expect(render('<h1>Title</h1><font color="red">red</font><blink>x</blink>')).equal(
      'Titleredx',
    )
  })

  it('should keep escaped markup as text', () => {
    expect(render('&lt;script&gt;alert(1)&lt;/script&gt; &amp; 5 &gt; 3')).equal(
      '&lt;script&gt;alert(1)&lt;/script&gt; &amp; 5 &gt; 3',
    )
  })

  it('should return no nodes for HTML without a body', () => {
    expect(render('<frameset onload="alert(1)"><frame src="https://x.example"></frameset>')).equal('')
  })

  it('should not create script for payloads that rely on parsing differences', () => {
    const payloads = [
      '<noscript><p title="</noscript><img src=x onerror=alert(1)>">',
      '<svg><style><img src=x onerror=alert(1)></style></svg>',
      '<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>',
      '<form><math><mtext></form><form><mglyph><svg><mtext><style><path id="</style><img onerror=alert(1) src>">',
      '<a href="https://x.example"><a href="javascript:alert(1)">x</a></a>',
      '<<script>script>alert(1)<</script>/script>',
      '<img src="x` `<script>alert(1)</script>"` `>',
      '<!--<img src=x onerror=alert(1)>-->',
      '<b><![CDATA[<img src=x onerror=alert(1)>]]></b>',
    ]

    payloads.forEach((payload) => {
      const container = document.createElement('div')
      container.appendChild(sanitizeHtml(payload))

      expect(container.querySelectorAll('img, script, style, svg, math').length).equal(0)
      container.querySelectorAll('*').forEach((elem) => {
        expect(elem.getAttributeNames().filter((name) => name.indexOf('on') === 0)).deep.equal([])
        expect(elem.getAttribute('href') || '').not.match(/^\s*javascript:/i)
      })
    })
  })

  it('should sanitize the content of widgets', () => {
    const widget = new BaseWidget({ baseCls: 'ds-test' })

    widget.setContent('<img src="x" onerror="alert(1)"><strong>Hi</strong>')
    expect(widget.getContentElem().innerHTML).equal('<strong>Hi</strong>')

    widget.setContent(3)
    expect(widget.getContentElem().innerHTML).equal('3')
  })
})
