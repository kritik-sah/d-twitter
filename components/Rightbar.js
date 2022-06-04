import React from 'react';
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
            link: "https://nextjs.org/"
        },
        {
            name:"React.js",
            img: reactImg,
            link: "https://reactjs.org/"
        },
        {
            name:"Tailwind CSS",
            img: tailwindImg,
            link: "https://tailwindcss.com/"
        },
        {
            name:"Solidity",
            img: solidityImg,
            link: "https://docs.soliditylang.org/en/v0.8.14/"
        },
        {
            name:"Moralis",
            img: moralisImg,
            link: "https://moralis.io/"
        },
        {
            name:"Web3uiKit",
            img: web3uikitImg,
            link: "https://github.com/web3ui/web3uikit"
        },
        {
            name:"Remix IDE",
            img: remixImg,
            link: "https://remix.ethereum.org/"
        },
    ];
  return (
    <>
    <aside className="rightbarContent mt-10">
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

        <div className="trends">
            Tools Used!
            {tools.map((e,i)=>{
                return(
                    
                    <div key={i} className="trend" onClick={() => {window.open(e.link)}}>
                        <img src={e.img.src} className="trendImg" alt={e.name}/>
                        <div className="trendText hidden md:block">
                            {e.name}
                        </div>
                    </div>
                    
                )
            })}
        </div>
    </aside>
    </>
  )
}

export default Rightbar