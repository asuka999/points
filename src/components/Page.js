import React, {Component} from 'react'
import cx from 'classnames'
import './Page.css'

// const SCRIPT_RE = /<script>([\s\S]*)<\/script>/g
class Page extends Component {

  render() {
    const {active, children} = this.props

    return (
      <div className={cx('Page', {'is-active': active})}>
        {children}
      </div>
    )
  }
}

export default Page
