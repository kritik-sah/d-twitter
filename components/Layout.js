import React from 'react'
import Rightbar from './Rightbar'
import Sidebar from './Sidebar'
import Styles from "../styles/home.module.css"
import { useMoralis } from 'react-moralis'
import { Icon, ConnectButton } from 'web3uikit';

const Layout = (props) => {
  const {isAuthenticated , Moralis} = useMoralis();
  return (
    <>
    {isAuthenticated? (
        <div className="page ">
        <div className="sideBar  hidden lg:block">
          <Sidebar />
          <div className="logout" onClick={() => { 
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}>
            Logout
          </div>
        </div>
        <div className="mainWindow w-screen">
          {props.children}
        </div>
        <div className="rightBar hidden xl:block">
          <Rightbar />
        </div>
      </div>
      ) : (
      <div className="loginPage">
        <Icon fill="#ffffff" size={20} svg="twitter"/>
        <ConnectButton></ConnectButton>
      </div>
    )}
    
    </>
  )
}

export default Layout