import React from 'react';
import Styles from "./rightbar.module.css";
import { Input } from 'web3uikit';
import nextImg from "../images/next.png";
import reactImg from "../images/react.png";
import tailwindImg from "../images/tailwind.png";
import solidityImg from "../images/solidity.jpeg";
import moralisImg from "../images/moralis.png";
import web3uikitImg from "../images/web3uikit.jpeg";
import remixImg from "../images/remix.png";

const Rightbar = () => {
    let tools = [
        {
            name:"Next.js",
            img: nextImg,
            link: "#"
        },
        {
            name:"React.js",
            img: reactImg,
            link: "#"
        },
        {
            name:"Tailwind CSS",
            img: tailwindImg,
            link: "#"
        },
        {
            name:"Solidity",
            img: solidityImg,
            link: "#"
        },
        {
            name:"Moralis",
            img: moralisImg,
            link: "#"
        },
        {
            name:"Web3uiKit",
            img: web3uikitImg,
            link: "#"
        },
        {
            name:"Remix IDE",
            img: remixImg,
            link: "#"
        },
    ];
  return (
    <>
    <aside className={Styles.rightbarContent +" mt-10"}>
    <Input
        autoComplete
        autoFocus
        iconPosition="end"
        label="Search"
        labelBgColor="#000a19"
        name="search"
        onBlur={function noRefCheck(){}}
        onChange={function noRefCheck(){}}
        prefixIcon="search"
        size="regular"
        type="text"
        />

        <div className={Styles.trends}>
            Tools Used!
            {tools.map((e)=>{
                return(
                    <>
                    <div className={Styles.trend} onClick={() => {window.open(e.link)}}>
                        <img src={e.img.src} className={Styles.trendImg} alt={e.name}/>
                        <div className={Styles.trendText}>
                            {e.name}
                        </div>
                    </div>
                    </>
                )
            })}
        </div>
    </aside>
    </>
  )
}

export default Rightbar