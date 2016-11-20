import React, {Component} from 'react'
import Episode from './Episode'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.episodePrevSumPages = props.items.map(({contents}) => (contents ? contents.length : 0) + 1)
      .reduce((prev, cur) => [...prev, (prev[prev.length - 1] || 0) + cur], [])
  }

  state = {
    current: 0
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = (e) => {
    const {keyCode} = e
    if (keyCode === 37 || keyCode === 38) {
      this.handlePrev()
    }

    if (keyCode === 39 || keyCode === 40) {
      this.handleNext()
    }
  }

  handleNext = () => {
    this.setState(({current}) => ({current:
      current >= this.episodePrevSumPages[this.episodePrevSumPages.length - 1] - 1? current : current + 1}))
  }

  handlePrev = () => {
    this.setState(({current}) => ({current:
      current <= 0 ? 0 : current - 1}))
  }

  render() {
    const {items} = this.props
    const {current} = this.state
    const episode = this.episodePrevSumPages.findIndex((sum, index) => sum > current)
    const page = current - (this.episodePrevSumPages[episode - 1] || 0)

    return (
      <div id="app" className="App">
        {items.map((item, index) =>
          <Episode
            key={index}
            item={item}
            active={episode === index}
            page={page}
          /> 
        )}
      </div>
    )
  }
}

export default App