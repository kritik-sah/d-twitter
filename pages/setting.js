import React, {useState , useRef, useEffect} from 'react'
import Layout from '../components/Layout'
import styles from "../styles/Setting.module.css"
import { Button, Icon, Input, Tooltip,} from 'web3uikit'
import { defaultImgs } from "../components/defaultImages"

import {useMoralis, useMoralisWeb3Api} from "react-moralis"
import TooltipText from '../components/TooltipText'


const Setting = () => {
  const inputFile = useRef(null);
  const inputProfileFile = useRef(null);
  const [pfps, setPfps] = useState([]);
  const [selectedPFP, setSelectedPFP] = useState();
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [theFile, setTheFile] = useState();
  const [userName, setUserName] = useState();
  const [userBio, setUserBio] = useState();
  const [userProfile, setUserProfile] = useState(defaultImgs[0]);
  const [profilePic, setProfilePic] = useState();
  const {isInitialized, Moralis, isAuthenticated, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  const reSyncMetadata = async (token_address,token_id) => {
    const options = {
      address: token_address,
      token_id: token_id,
      
    };
    const result = await Web3Api.token.reSyncMetadata(options);
    console.log("result",result);
    timeout.setTimeout(6000);
  }

  const syncmetadata = async () => {
    try {
      const options = {
        chain: "mumbai",
        address: account,
        limit: 5,
      }
      const metadataNFTs = await Web3Api.account.getNFTs(options);
      metadataNFTs.result.map(async (e) => {
        await reSyncMetadata(JSON.parse(e.token_address,e.token_id));
      });
      
      window.location.reload();
    }catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      setSelectedFile(user.attributes.userBanner ? user.attributes.userBanner: defaultImgs[1]);
      setUserProfile(user.attributes.pfp? user.attributes.pfp: user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
      setUserBio(user.attributes.userBio ? user.attributes.userBio: "");
      const fetchNFTs = async () => {
        const options = {
          chain: "mumbai",
          address: account,
          limit: 10,
        }
  
        const mumbaiNFTs = await Web3Api.account.getNFTs(options);
        console.log("m-nft",mumbaiNFTs)
        const images = mumbaiNFTs.result.map((e) => 
          resolveLink(JSON.parse(e.metadata)?.image)
        );
        setPfps(images);
        
      }
      
      fetchNFTs();
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

      if (selectedPFP){
        myDetails.set("pfp", selectedPFP);
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
        <section className={styles.settingsPage}>
        
        <div className={styles.pfp}>
          Select your picture or Nft for profile!
          <div className="flex my-4 space-x-4">
          <Button
            icon="reload"
            iconLayout="icon-only"
            id="syncMetadata"
            onClick={syncmetadata}
            size="regular"
            text="Primary icon only"
            theme="secondary"
            type="button"
          >
        
          </Button>
          <Tooltip
                content={<TooltipText text="Refetch nft Metadata!"/>}
                position="right"
              >
                <Icon
                  fill="#68738D"
                  size={30}
                  svg="helpCircle"
                />
            </Tooltip>
          </div>
          <div className={styles.pfpOptions + " mt-4"}>
          <Tooltip
                content={<TooltipText text="Upload you image"/>}
                position="left"
              >
                <img src={userProfile} alt="Nft profile picture" 
            className={styles.pfpOptionSelected}
            onClick={onProfileClick}/>
                
            </Tooltip>
            
            {pfps.map((e,i) => {
             return(
              <>
              <Tooltip
                content={<TooltipText text="Click to selelect this nft as profile picture"/>}
                position="top"
              >
                <img
              src={e}
              alt="Nft profile picture"
              className={
                selectedPFP === e ? styles.pfpOptionSelected : styles.pfpOption
              }
              onClick={() => {setSelectedPFP(pfps[i]);}}
              ></img>
                
            </Tooltip>
              
              </>
             )
            })}
            <input type="file" name="file" ref={inputProfileFile}
            onChange={changeProfileHandler}
            className="hidden">
          </input>
          </div>
        </div>

        <div className={styles.pfp}>
          Profile banner
          <img src={selectedFile} 
          onClick={onBannerClick}
          className={styles.banner + " w-full rounded-2xl mt-2"}/>
          
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

        <div className={styles.save +" !w-20 mb-10"}
          onClick={()=> {saveEdits()}}
        >
          Save
        </div>


        </section>
        
      </Layout>
    </>
  )
}

export default Setting