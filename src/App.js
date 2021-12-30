import React, {  Fragment, useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { handleInitialData } from './actions/shared'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Login} from './pages'
import  PrivateRoutes from './auth/PrivateRoutes'

const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  })
  // componentDidMount() {
  //   this.props.dispatch(handleInitialData())
  // }

  const state = useSelector(({authedUser}) => {
    return {
      authedUser
    }
  })
    // const { authedUser } = props
    return (
        <Fragment>
          {!state.authedUser ? <Login /> : <PrivateRoutes/>}
        </Fragment>
    )
  }

export default App;