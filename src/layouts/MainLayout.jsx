import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import PropTypes from "prop-types"

const MainLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
        
        <Footer />
    </>
  )
}

MainLayout.propTypes = {
  isLogged: PropTypes.bool
}

export default MainLayout