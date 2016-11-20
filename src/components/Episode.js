import React, {Component} from 'react'
import cx from 'classnames'
import Page from './Page'
import './Episode.css'

// const SCRIPT_RE = /<script>([\s\S]*)<\/script>/g

class Episode extends Component {
  render() {
    const {active, page, item: {heading, points, contents}} = this.props
    return (
      <div className={cx('Episode', {'is-active': active})}>
        <Page active={active && page === 0}>
          <div dangerouslySetInnerHTML={{__html: heading}} />
          <ul>
            {points.map((point, index) =>
              <li key={index} dangerouslySetInnerHTML={{__html: point.heading}} />
            )}
          </ul>
        </Page>
        {contents.map((content, index) =>
          <Page key={index} active={active && page === index + 1}>
            <div
              className="Page-content markdown-body"
              dangerouslySetInnerHTML={{__html: content}}
            />
          </Page>
        )}
      </div>
    )
  }
}

export default Episode
