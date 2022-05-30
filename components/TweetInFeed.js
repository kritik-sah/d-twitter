import React from 'react'
import Styles from "./tweetinfeed.module.css"
import {defaultImgs} from "../components/defaultImages"
import { Icon } from 'web3uikit'
import tweet1 from "../images/tweet1.gif"

const TweetInFeed = (props) => {
  return (
    <div className={Styles.feedTweet}>
        <img src={defaultImgs[0]} alt="Profile pic" className={Styles.profilePic} />
        <div className={Styles.completeTweet}>
            <div className={Styles.who}>
                Kritik
                <div className={Styles.accWhen}>
                    0x0DB...12B | 1h
                </div>
            </div>
            <div className={Styles.tweetContent}>
                Thank you moralis for this build, I will become a web3 developer, no going back!
                <img src={tweet1.src} alt="tweet img" className={Styles.tweetImg + " mt-4 w-full"}/>
            </div>

            <div className={Styles.interactions + " mt-4"}>
                <div className={Styles.interactionNums}>
                    <Icon fill="#ffffff" size={20} svg="messageCircle"/>
                </div>
                <div className={Styles.interactionNums}>
                    <Icon fill="#ffffff" size={20} svg="star"/>
                    12
                </div>
                <div className={Styles.interactionNums}>
                    <Icon fill="#ffffff" size={20} svg="matic"/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TweetInFeed