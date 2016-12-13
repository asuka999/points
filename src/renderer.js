import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import App from './components/App'
import marked from 'marked'
import highlight from 'highlight.js'

const Html = ({title, children, scripts, links}) =>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {links.map((item, index) =>
        <link key={index} href={item} rel="stylesheet" type="text/css" />
      )}
      <title>{title}</title>
    </head>
    <body>
      {children}
      {scripts.map((item, index) => 
        typeof item === 'string' ?
          <script key={index} src={item} /> :
          <script key={index} type={item.type} dangerouslySetInnerHTML={{__html: item.script}} />
      )}
    </body>
  </html>

export default function renderer({main, scripts, links, title = ''}) {
  const items = []
  const renderer = new marked.Renderer();
  renderer.heading = (title, level) => {
    const heading = `
      <h${level}>
        <a name="${title}" class="anchor" href="#${title}">
          <span class="header-link"></span>
        </a>
        ${title}
      </h${level}>`
    const target = items[items.length - 1]
    if (level < 3 || !target || target.level >= level) {
      items.push({
        level,
        title,
        points: [],
        heading,
      })
      return '==Main=='
    }
    target.points.push({
      heading,
      title
    })
    return `-----${heading}`
  }

  const contents = marked(main, {
    renderer,
    highlight: code => highlight.highlightAuto(code).value
  }).split('==Main==')
  items.forEach((item, index) => { item.contents = contents[index + 1].split('-----').slice(1) })

  const initialState = {items}

  const props = {
    scripts: [
      {
        type: 'text/x-mathjax-config',
        script: `
          MathJax.Hub.Config({
            config: ["TeX-AMS-MML_HTMLorMML.js"],
            tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
          })`
      },
      {
        script: `__initialState__=${JSON.stringify(initialState)}`,
      },
      ...scripts,
    ],
    title,
    links,
  }
  return renderToStaticMarkup(
    <Html {...props} >
      <App {...initialState} /> 
    </Html>
  )
}
