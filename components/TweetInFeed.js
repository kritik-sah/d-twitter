import React,{ useState, useEffect } from 'react'
import {defaultImgs} from "../components/defaultImages"
import TooltipText from '../components/TooltipText'
import { Icon ,Tooltip} from 'web3uikit'
import {useMoralis} from "react-moralis"

const TweetInFeed = ({profile}) => {
    const [tweetArr, setTweetArr] = useState();
    const {isInitialized, Moralis, isAuthenticated, account, user} = useMoralis();
    console.log("profile",profile)
    
    useEffect(() => {
        if(isInitialized){
        const getTweets = async () => {
            try{
                const Tweets = Moralis.Object.extend("tweets");
                const query = new Moralis.Query(Tweets)
                if(profile){
                    query.equalTo("tweeterAccount", account);
                };
                const results = await query.find();
                setTweetArr(results);
                
              }catch(e){
                  console.log(e)
              }

        }
          getTweets();
        }
      }, [isInitialized, isAuthenticated, account,user, profile])

  return (
      <>
      {
        tweetArr?.map((e,i)=>{
            
            return(
                 <div key={i} className="feedTweet">
                    <img src={e.attributes.tweeterPfp? e.attributes.tweeterPfp :defaultImgs[0]} alt="Profile pic" className="profilePic pe-2"/>
                    <div className="completeTweet">
                        <div className="who">
                            {e.attributes.tweeterUsername}
                            <div className="accWhen">
                                {`
                                ${e.attributes.tweeterAccount.slice(0,4)}...${e.attributes.tweeterAccount.slice(38)} | 
                                ${e.attributes.createdAt.toLocaleString('en-us', {month:"short"})}
                                ${e.attributes.createdAt.toLocaleString('en-us', {day:"numeric"})}
                                
                                `}
                            </div>
                        </div>
                        <div className="tweetContent">
                            {e.attributes.tweetTxt? e.attributes.tweetTxt : ""}
                            {e.attributes.tweetImg ? (<img src={e.attributes.tweetImg} alt="tweet img" className="tweetImg  mt-4 w-full"/>) : ""
                            }
                            {/* <img src={tweet1.src} alt="tweet img" className="tweetImg mt-4 w-full"/> */}
                        </div>

                        <div className="interactions mt-4">
                            
                            {e.attributes.tweetTxHash? (
                                <a href={e.attributes.tweetTxHash} target="_blank" rel="noopener noreferrer">
                                <div className="interactionNums">
                                <Tooltip
                                    content={<TooltipText text="View this tweet on polygonscan"/>}
                                    position="right"
                                >
                                    
                                    <Icon fill="#ffffff" size={20} svg="matic"/>
                                </Tooltip>
                                    
                                </div>
                                </a>
                            ) : ""}
                            
                        </div>

                    </div>
                </div>
            )
        }).reverse()
    }
      </>
   
  )
}

export default TweetInFeed