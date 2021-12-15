import React from 'react'
import { Route } from 'react-router-dom'

class FancyRoute extends React.Component {
  // componentWillMount () {
  //   NProgress.start()
  //   NProgress.set(0.4)
  // }

  // componentDidMount () {
  //   NProgress.done()
  //   NProgress.set(1.0);
  // }

  render () {
    return (
      <Route {...this.props} />
    )
  }
}

export default FancyRoute