import './App.css';
import { Switch, Route, Redirect } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Navbar from "./components/shared/Navbar/Navbar"
import Authenticate from "./Pages/Authenticate/Authenticate"
import Activate from './Pages/Activate/Activate';
import Dashboard from './Pages/Dashboard/Dashboard';
import {useSelector} from "react-redux"


function App() {
  return (
    <Switch>
      <>
        <Navbar />
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate" exact>
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoutes path="/activate" exact>
          <Activate />
        </SemiProtectedRoutes>
        <ProtectedRoutes path="/dashboard" exact>
          <Dashboard />
        </ProtectedRoutes>
      </>
    </Switch>
  );
}


function GuestRoute({ children, ...rest }) {
  const {isAuth} = useSelector((state) => state.auth)
  return (
    <Route {...rest} render={({ location }) => {
      console.log("Inside guest route")
      return isAuth ?
        (
          <Redirect to={{
            pathname: "/dashboard",
            state: {from: location}
          }} />
        )
        :
        (
          children
        )
    }} />
  )
}
function SemiProtectedRoutes({ children, ...rest }) {
  const {user,isAuth} = useSelector((state) => state.auth)

  return (
    <Route {...rest} render={({ location }) => {
      console.log("Inside semi protected routes")

      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: {from: location}
          }} />
        )
        :
        (
          isAuth && !user.activated ? (
            children
          )
          :
          <Redirect to={{
            pathname: "/dashboard",
            state: {from: location}
          }} />
        )
    }} />
  )
}
function ProtectedRoutes({ children, ...rest }) {
  const {user,isAuth} = useSelector((state) => state.auth)

  return (
    <Route {...rest} render={({ location }) => {
      console.log("Inside protected rotues")
      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: {from: location}
          }} />
        )
        :
        (
          isAuth && !user.activated ? (
            <Redirect to={{
              pathname: "/activate",
              state: {from: location}
            }} />
          )
          :
          (
            children
          )
        )
    }} />
  )
}

export default App;
