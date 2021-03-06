import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import Layout from '../components/Layout'
import { defaultImgs } from "../components/defaultImages"
import { Icon, TextArea} from 'web3uikit'
import TweetInFeed from '../components/TweetInFeed'
import { useMoralis , useWeb3ExecuteFunction } from "react-moralis"

const Index = () => {
  const {isInitialized, Moralis, isAuthenticated, account, user} = useMoralis();
  const [ProfilePicture, setProfilePicture] = useState(defaultImgs[0])
  const [UserName, setUserName] = useState(account)
  const [tweet, setTweet] = useState("Share to world...")
  const [tweetImg, setTweetImg] = useState()
  const [UserWallet, setUserWallet] = useState(account)
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    if(isInitialized && isAuthenticated){
      const user = Moralis.User.current();
      setProfilePicture(user.attributes.pfp? user.attributes.pfp: user.attributes.userProfilePic ? user.attributes.userProfilePic: defaultImgs[0]);
      setUserName(user.attributes.userName ? user.attributes.userName: account);
      setUserWallet(user.attributes.ethAddress);
    }
  }, [isInitialized, isAuthenticated, account,user])


  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const onImgClick = () => {
    inputFile.current.click();
  }



  const maticTweet = async () =>{
    let img;
     if (tweet){
      if(tweetImg){
        const data = tweetImg;
        const file = new Moralis.File(data.name , data);
        await file.saveIPFS();
        img= file.ipfs();
      }else{
        img= "no img";
      }
  
      let options = {
        contractAddress:"0x3f9340d279CfB5d3e49e049AFE15B9C57FDd906a",
        functionName:"addTweet",
        abi:[{
          "inputs": [
            {
              "internalType": "string",
              "name": "tweetText",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tweetImg",
              "type": "string"
            }
          ],
          "name": "addTweet",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }],
        params:{
          tweetText:tweet,
          tweetImg: img,
        },
        msgValue: Moralis.Units.ETH(1),
      }
  
      await contractProcessor.fetch({
        params: options,
        onSuccess: (results) =>{
          saveTweet(results.hash);
        },
        onError: (error) =>{
          console.log("Error",error)
        }
      })
     }
     
  }
  const saveTweet = async (txHash) => {
    if(tweet){
      const Tweets = Moralis.Object.extend("tweets")
      const newTweet = new Tweets()
      newTweet.set("tweetTxt", tweet)
      newTweet.set("tweeterPfp", ProfilePicture)
      newTweet.set("tweeterAccount", UserWallet)
      newTweet.set("tweeterUsername", UserName)
      if(txHash){
        newTweet.set("tweetTxHash", "https://mumbai.polygonscan.com/tx/"+txHash)
      }

      if(tweetImg){
        const data = tweetImg;
        const file = new Moralis.File(data.name , data);
        await file.saveIPFS();
        newTweet.set("tweetImg", file.ipfs())
      }

      await newTweet.save();
      setTweet('');
      window.location.reload();


    }else{
      alert("Fill the tweet box first")
    }
  }

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTweetImg(img)
    setSelectedFile(URL.createObjectURL(img))
  }
  return (
    <>
      <Layout>
        <div className="pageIdentify">Home</div>
        <section className="mainContent">
          <div className="profileTweet">
            <Link href="/profile">
            <img src={ProfilePicture} alt={UserName +" Profile picture"} className="profilePic" />
            </Link>
            <div className="tweetBox mx-2">
              <TextArea
                label=""
                name="tweetTextArea"
                value={tweet}
                placeholder="Share to world..."
                width="95%"
                onChange={(e)=>{setTweet(e.target.value)}}
              >

              </TextArea>

              {selectedFile && (<>
                <img src={selectedFile} className="tweetImg mt-4" alt="selectedFile" />
              </>)}

              <div className="imgOrTweet  mt-4">
                <div className="imgDiv" onClick={onImgClick}>
                  <input type="file" name="file" ref={inputFile}
                    onChange={changeHandler}
                    className="hidden">
                  </input>
                  <Icon fill="#ffffff" size={20} svg="image" />
                </div>
                <div className="tweetOptions" >
                  <div className="tweet" onClick={saveTweet}>Tweet</div>
                  <div className="tweet !bg-purple-800" onClick={maticTweet}>
                    <Icon fill="#ffffff" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <TweetInFeed profile={false} />
      </Layout>

    </>
  )
};


export default Index
