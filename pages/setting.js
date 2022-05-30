import React, {useState , useRef, useEffect} from 'react'
import Layout from '../components/Layout'
import Styles from "../styles/setting.module.css"
import { Input} from 'web3uikit'
import { defaultImgs } from "../components/defaultImages"

import {useMoralis} from "react-moralis"


const setting = () => {
  const inputFile = useRef(null);
  const inputProfileFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [userName, setUserName] = useState();
  const [userBio, setUserBio] = useState();
  const [userProfile, setUserProfile] = useState(defaultImgs[0]);
  const [profilePic, setProfilePic] = useState();
  const {isInitialized, Moralis, isAuthenticated, account } = useMoralis();
  

  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      setSelectedFile(user.attributes.userBanner ? user.attributes.userBanner: defaultImgs[1]);
      setUserProfile(user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
      setUserBio(user.attributes.userBio ? user.attributes.userBio: "");
    }
  }, [isInitialized, isAuthenticated, account])

  const onBannerClick = () => {
    inputFile.current.click();
  }
  const onProfileClick = () => {
    inputProfileFile.current.click();
  }

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  }
  const changeProfileHandler = (event) => {
    const img = event.target.files[0];
    setProfilePic(img);
    setUserProfile(URL.createObjectURL(img));
  }

  const saveEdits = async () => {
      const User = Moralis.Object.extend("_User");
      const query = new Moralis.Query(User);
      const myDetails = await query.first();

      if(userBio){
        myDetails.set('userBio', userBio);
      }

      if(userName){
        myDetails.set('userName', userName);
      }

      if(profilePic){
        const picture = profilePic;
        const file = new Moralis.File(picture.name , picture);
        await file.saveIPFS();
        myDetails.set('userProfilePic', file.ipfs());
      }
      if(theFile){
        const data = theFile;
        const file = new Moralis.File(data.name , data);
        await file.saveIPFS();
        myDetails.set('userBanner', file.ipfs());
      }

      await myDetails.save();
      window.location.reload();
  }
  return (
    <>
       <Layout>
       <div className="pageIdentify">Settings</div>
        <section className={Styles.settingsPage}>
        
        <div className={Styles.pfp}>
          Select your picture for profile!
          <div className={Styles.pfpOptions + " mt-4"}>
            <img src={userProfile} alt="Nft profile picture" 
            className={Styles.pfpOptionSelected}
            onClick={onProfileClick}/>
            <input type="file" name="file" ref={inputProfileFile}
            onChange={changeProfileHandler}
            className="hidden">
          </input>
          </div>
        </div>

        <div className={Styles.pfp}>
          Profile banner
          <img src={selectedFile}
          onClick={onBannerClick}
          className={Styles.banner + " w-full rounded-2xl mt-2"}/>
          <input type="file" name="file" ref={inputFile}
            onChange={changeHandler}
            className="hidden">
          </input>
        </div>

        <Input
          label="Name"
          name="nameChange"
          prefixIcon="user"
          state="initial"
          type="text"
          width="100%"
          value={userName}
          labelBgColor='#000a19'
          onChange={(e)=>{
            setUserName(e.target.value);
          }}
        />
        <Input
          label="Bio"
          name="BioChange"
          prefixIcon="edit"
          state="initial"
          type="text"
          value={userBio}
          width="100%"
          labelBgColor='#000a19'
          onChange={(e)=>{
            setUserBio(e.target.value);
          }}
        />

        <div className={Styles.save +" !w-20 mb-10"}
          onClick={()=> {saveEdits()}}
        >
          Save
        </div>


        </section>
        
      </Layout>
    </>
  )
}

export default setting