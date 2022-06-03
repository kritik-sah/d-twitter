import React,{ useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import TweetInFeed from '../components/TweetInFeed'
import Styles from "../styles/Profile.module.css"
import { Icon} from 'web3uikit'
import { defaultImgs } from "../components/defaultImages"
import {useMoralis} from "react-moralis"


const Profile = () => {
  const {isInitialized, Moralis, isAuthenticated, account, user} = useMoralis();
  const [ProfileBanner, setProfileBanner] = useState(defaultImgs[1])
  const [ProfilePicture, setProfilePicture] = useState(defaultImgs[0])
  const [UserName, setUserName] = useState(account)
  const [UserBio, setUserBio] = useState()
  const [UserWallet, setUserWallet] = useState(account)

  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      setProfileBanner(user.attributes.userBanner ? user.attributes.userBanner: defaultImgs[1]);
      setProfilePicture(user.attributes.pfp? user.attributes.pfp: user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
      setUserBio(user.attributes.userBio ? user.attributes.userBio: "");
      setUserWallet(user.attributes.ethAddress.slice(0,4) +"..."+ user.attributes.ethAddress.slice(38));
    }
  }, [isInitialized, isAuthenticated, account,user])
  
  
  return (
    <>
       <Layout>
        <div className="pageIdentify">Profile</div>
        <section>
          <img className={Styles.profileBanner} src={ProfileBanner} alt="profile banner Img"/>
          <div className={Styles.pfpContainer}>
            <img className={Styles.profilePFP} src={ProfilePicture} alt="Profile picture"/>
            <div className={Styles.profileName}>{UserName}</div>
            <div className={Styles.profileWallet}>{UserWallet}</div>
            <Link href="/setting">
            <div className={Styles.profileEdit}>Edit &nbsp; <Icon fill="#ffffff" size={20} svg="edit"/></div>
            </Link>
            <div className={Styles.profileBio}>
              {UserBio}
            </div>
            <div className={Styles.profileTabs}>
              <div className={Styles.profileTab}>
                  Tweets
              </div>
            </div>
          </div>
        </section>
        <TweetInFeed profile={true} />
      </Layout>
      </>
  )
}

export default Profile