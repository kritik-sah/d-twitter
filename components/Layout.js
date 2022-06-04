import React from 'react'
import Rightbar from './Rightbar'
import Sidebar from './Sidebar'
import { useMoralis } from 'react-moralis'
import { Icon, ConnectButton } from 'web3uikit';

const Layout = (props) => {
  const {isAuthenticated , Moralis} = useMoralis();
  return (
    <>
    {isAuthenticated? (
        <div className="page ">
        <div className="sideBar lg:block">
          <Sidebar />
          <div className="m-0 mr-28 logout" onClick={() => { 
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}>
            <Icon fill="#ffffff" size={20} svg="logOut"/> 
            <span className="hidden md:block">
             &nbsp;Logout
            </span>
            
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
        <span className="!bg-cyan-500 !text-gray-300 rounded-3xl">
        <ConnectButton  signingMessage="Welcome to d-tweeter"></ConnectButton>
        </span>
      </div>
    )}
    
    </>
  )
}

export default Layout