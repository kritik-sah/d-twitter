import React,{ useState, useRef, useEffect } from 'react'
import Styles from "../styles/home.module.css"
import Layout from '../components/Layout'
import { defaultImgs } from "../components/defaultImages"
import { Icon, TextArea } from 'web3uikit'
import TweetInFeed from '../components/TweetInFeed'
import {useMoralis} from "react-moralis"

const index = () => {
  const {isInitialized, Moralis, isAuthenticated, account, user} = useMoralis();
  const [ProfilePicture, setProfilePicture] = useState(defaultImgs[0])
  const [UserName, setUserName] = useState(account)

  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      setProfilePicture(user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
    }
  }, [isInitialized, isAuthenticated, account,user])
  let Homestyle = {
    maticBtn: "!bg-purple-800 "
  }

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const onImgClick = () => {
    inputFile.current.click();
  }

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img))
  }
  return (
    <>
      <Layout>
        <div className="pageIdentify">Home</div>
        <section className={Styles.mainContent}>
          <div className={Styles.profileTweet}>
            <img src={ProfilePicture} alt={UserName +" Profile picture"} className={Styles.profilePic} />
            <div className={Styles.tweetBox + " mx-2"}>
              <TextArea
                label=""
                name="tweetTextArea"
                value="Share to world..."
                placeholder="Share to world..."
                width="95%"
              >

              </TextArea>

              {selectedFile && (<>
                <img src={selectedFile} className={Styles.tweetImg + " mt-4"} alt="selectedFile" />
              </>)}

              <div className={Styles.imgOrTweet + " mt-4"}>
                <div className={Styles.imgDiv} onClick={onImgClick}>
                  <input type="file" name="file" ref={inputFile}
                    onChange={changeHandler}
                    className="hidden">
                  </input>
                  <Icon fill="#ffffff" size={20} svg="image" />
                </div>
                <div className={Styles.tweetOptions} >
                  <div className={Styles.tweet}>Tweet</div>
                  <div className={Styles.tweet + " " + Homestyle.maticBtn}>
                    <Icon fill="#ffffff" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TweetInFeed profilr={false} />
      </Layout>

    </>
  )
};


export default index
