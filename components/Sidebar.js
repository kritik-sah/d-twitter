import React,{ useState, useEffect } from 'react'
import Styles from "./sidebar.module.css"
import { Icon} from "web3uikit"
import Link from 'next/link'
import { defaultImgs } from "../components/defaultImages"
import {useMoralis} from "react-moralis"

const Sidebar = () => {
    const {isInitialized, Moralis, isAuthenticated, account, user} = useMoralis();
  const [ProfilePicture, setProfilePicture] = useState(defaultImgs[0])
  const [UserName, setUserName] = useState(account)
  const [UserWallet, setUserWallet] = useState(account)

  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      
      setProfilePicture(user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
      
      setUserWallet(user.attributes.ethAddress.slice(0,4) +"..."+ user.attributes.ethAddress.slice(38));
    }
  }, [isInitialized, isAuthenticated, account,user])
  return (
    <>
    <aside className={Styles.siderContent}>
        <nav className={Styles.menu}>
            <Link href='/' className={Styles.link}>
            <div className={Styles.details}>
                <Icon fill="#ffffff" size={33} svg="twitter"/>
                Twitter 3.0
            </div>
            </Link>
            <Link href='/' className={Styles.link}>
            <div className={Styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="list"/>
                Home
            </div>
            </Link>
            <Link href='/profile' className={Styles.link}>
            <div className={Styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="user"/>
                Profile
            </div>
            </Link>
            <Link href='/setting' className={Styles.link}>
            <div className={Styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="cog"/>
                Settings
            </div>
            </Link>
        </nav>
        <Link href='/profile' className={Styles.link}>
        <div className={Styles.details}>
          <img src={ProfilePicture} className="profilePic"></img>
          <div className={Styles.profile}>
            <div className={Styles.who}>
              {UserName}
            </div>
            <div className={Styles.accWhen}>
              {UserWallet}
            </div>
          </div>
        </div>
        </Link>

    </aside>
    </>
  )
}

export default Sidebar