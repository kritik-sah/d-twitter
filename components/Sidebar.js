import React,{ useState, useEffect } from 'react'
import styles from "./Sidebar.module.css"
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
      
      setProfilePicture(user.attributes.pfp? user.attributes.pfp: user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: user.attributes.ethAddress.slice(0,9));
      
      setUserWallet(user.attributes.ethAddress.slice(0,4) +"..."+ user.attributes.ethAddress.slice(38));
    }
  }, [isInitialized, isAuthenticated, account,user])
  return (
    <>
    <aside className={styles.siderContent}>
        <nav className={styles.menu}>
            <Link href='/' className={styles.link}>
            <div className={styles.details}>
                <Icon fill="#ffffff" size={33} svg="twitter"/>
                <span className="hidden md:block">

                Twitter 3.0
                </span>
            </div>
            </Link>
            <Link href='/' className={styles.link}>
            <div className={styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="list"/>
                <span className="hidden md:block">
                  
                Home
                </span>
            </div>
            </Link>
            <Link href='/profile' className={styles.link}>
            <div className={styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="user"/>
                <span className="hidden md:block">
                  
                Profile
                </span>
            </div>
            </Link>
            <Link href='/setting' className={styles.link}>
            <div className={styles.menuItems}>
                <Icon fill="#ffffff" size={33} svg="cog"/>
                <span className="hidden md:block">
                  
                Settings
                </span>
            </div>
            </Link>
            <hr className='my-4'/>
            <a href='https://github.com/kritik-sah/d-twitter' className={styles.link}>
              <div className={styles.menuItems}>
                  <Icon fill="#ffffff" size={33} svg="github"/>
                  <span className="hidden md:block">
                  
                  GitHub
                </span>
              </div>
            </a>
            <a href='https://kritik.cryptolancer.in' className={styles.link}>
              <div className={styles.menuItems}>
                  <Icon fill="#ffffff" size={33} svg="user"/>
                  <span className="hidden md:block">
                  
                  Dev: Kritik
                </span>
              </div>
            </a>

        </nav>
        <Link href='/profile' className={styles.link}>
        <div className={styles.details}>
          <img src={ProfilePicture} className="profilePic !h-10 !w-10"></img>
          <div className={styles.profile + " hidden md:block"}>
            <div className={styles.who + " hidden md:block"}>
              {UserName}
            </div>
            <div className={styles.accWhen + " hidden md:block"}>
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