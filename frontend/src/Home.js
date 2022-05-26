import * as React from "react";
import { useEffect, useState } from "react";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion';
import { Button } from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import TradingViewWidget, { BarStyles, Themes, IntervalTypes } from "react-tradingview-widget";
import './styles/index.css';
import "./styles/styles.css";
import TradeViewChart from 'react-crypto-chart';
// import ChartsGrid from "./ChartsGrid";
import Header from "./Header";
import logo from './images/logo.png';
import headimg from './images/headimg.png';
import aboutimg from './images/aboutimg.webp';
import signup from './images/add-user.png';
import invest from './images/invest.png';
import profit from './images/profit.png';
import withdraw from './images/withdraw.png';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

library.add(faInstagram, faTwitter, faDiscord, faCheck, faCheckSquare);
export default function Home() {
//   const [accounts, setAccounts] = useState([]);

//   const isConnected = Boolean(accounts[0]);

//     async function connectAccount() {
//         if(window.ethereum)  {
//             const accounts = await window.ethereum.request({
//                 method: "eth_requestAccounts",
//             });
//             setAccounts(accounts);
//         } else {
//             //  Create WalletConnect Provider
//             const provider = new WalletConnectProvider({
//                 infuraId: "9de8cf7dd24f4ece94441cc3c8307ff9",
//             });
            
//             //  Enable session (triggers QR Code modal)
//             await provider.enable();

//             const web3Provider = new providers.Web3Provider(provider);
//         }
//     }

// const windowHeight = window.innerHeight;
//   const windowWidth = window.innerWidth - 10;
// const tickers = ["VXX", "DXY", "QQQ", "SPY", "VT", "DAX"];

//   const [isDarkMode, setDarkMode] = React.useState(true);
//   const [enabledTA, setHasEnabledTA] = React.useState(false);

//   const [chartsNumber, setChartsNumber] = React.useState(4);
//   const chartsPerLine = enabledTA ? 2 : chartsNumber;

//   const numberOfChartsPerLine = windowWidth > 1024 ? chartsPerLine : 1;
//   const chartWidth = windowWidth / numberOfChartsPerLine;

//   const textColor = isDarkMode ? "white" : "#1F222C";
//   const theme = isDarkMode ? "Dark" : "Light";
//   const backgroundColor = isDarkMode ? "#1F222C" : "white";
  
  return (
    <>
    
    <section className="head-area fontNunito" id="head-area" data-midnight="white">
    <Header/>
                        
                        <div className="head-content fontNunito container-fluid d-flex align-items-center">
                        
                            <div className="container">
                            
                            <div className="head-bg-image"></div>
                                <div className="banner-wrapper">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="banner-content pt-5">
                                                <h1 className="animated" data-animation="fadeInUpShorter" data-animation-delay="1.5s"> PalegoR Trading Bot</h1>
                                                <h2 className="heada pt-2">Best Crypto Arbitrage Trading Bot</h2>
                                                <div className="mt-5">
                                                    <p>Earn 1-2% Daily Guaranteed Profit With PalegoR</p>
                                                </div>
                                                <div className="mt-5">
                                                    <button className="headbtn" >GET STARTED</button>
                                                    <button className="headbtn2"><a href="../#mintnft" className="text-white hover:text-yellow-900 px-2">EARN CRYPTO</a></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <img src={headimg} className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="tradingwidgets">
                        <div>
                            <h1>LIVE CRYPTO MARKET CHARTS</h1>
                        </div>
                        <TradingViewWidget
                            symbol={"AAPL"}
                            theme={Themes.DARK}
                            interval="D"
                            locale="en"
                            timezone="America/New York"
                            hideSideToolbar={true}
                            details
                            news={["headlines"]}
                        />
                    </section>
                    <section className="howitworks">
                        <div><h1>HOW IT WORKS</h1></div>
                        <div className="row">
                            <div className="col-md-4">
                                <div><h1>Sign Up</h1></div>
                                <img src={signup} />
                                Sign Up With PalegoR. 
                            </div>
                            <div className="col-md-4">
                                <div><h1>Profit</h1></div>
                                <img src={profit} />
                                Watch Your Profit Daily At 1-2% With Our Arbitrage Robot.
                            </div>
                            <div className="col-md-4">
                                <div><h1>Withdarw</h1></div>
                                <img src={withdraw} />
                                Withdraw Your Funds 
                            </div>
                        </div>
                    </section>
                    <section className="about-section pt-120 pb-120 px-3" id="about-us">
                    <div className='bg-image-overlay'></div>
                    <div className="container">
                        <div className="col-md-12">
                            <div className="about__content">
                                <div className="section__header">
                                    <h1 className="text-center mt-4 pt-4">
                                        About Us
                                    </h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="section__title">PalegoR Collection features 8888 animated NFT’s created by a group of talented individuals lead by Art H.</p>
                                        <p>
                                            The idea of PalegoR was created by Art H. because of his love and passion towards animals. Since his obsession to adopt a Finger Monkey was huge, he decided to illustrate his dream into a PalegoR art. Then the PalegoR became the first collection for SpecterOfArt.
                                        </p>
                                        <p className="about__para">
                                            Their work is so iconic that it is hard to resist not to be a part of their collection family. The artists team up and put all their effort to create distinctive NFT arts which is new to the NFT world.
                                        </p>
                                        <p className="about__para">
                                            In the Finger Monkey collection some of the animations look cool, some look funny and some of them even look weird.
                                        </p>
                                        <p className="about__para">
                                            It all depends on what the collector is interested in.
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <img src={aboutimg} className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="whychooseus">
                        <div><h1>WHY CHOOSE PALEGOR</h1></div>
                        <div className="row">
                            <div className="col-md-4">
                                <div><h1>Sign Up</h1></div>
                                <img src={signup} />
                                Sign Up With PalegoR. 
                            </div>
                            <div className="col-md-4">
                                <div><h1>Profit</h1></div>
                                <img src={profit} />
                                Watch Your Profit Daily At 1-2% With Our Arbitrage Robot.
                            </div>
                            <div className="col-md-4">
                                <div><h1>Withdarw</h1></div>
                                <img src={withdraw} />
                                Withdraw Your Funds 
                            </div>
                        </div>
                    </section>
                <section className="faqs-section pt-120 pb-120" id="faq">
                <div className="container">
                    <div className="section__header section__header__center">
                        <h1 className="text-center">
                            FAQ'S            
                        </h1>
                        <h1 className="text-center">How can we help?</h1>
                    </div>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">How to buy a PalegoR?</h5></Accordion.Header>
                            <Accordion.Body className="faq__content">
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} className="fa_timer text-dark"/> Sign up for MetaMask wallet and download the extension on your internet browser.
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} className="fa_timer text-dark"/> Make sure you have enough Ethereum in your wallet to cover the total cost including gas fees.
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} className="fa_timer text-dark"/> On mint day, there will be a Connect button at the top of our website to connect to your wallet.
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} className="fa_timer text-dark"/> Click on the mint button and you will be prompted to sign for your transaction. There will be a fee associated with every transaction related to gas prices.
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} className="fa_timer text-dark"/> Once you have made your purchase, your PalegoRs will appear in your wallet and on Opensea.io
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">What is a Finger Monkey?</h5></Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    Finger Monkey is a collection of 8888 animated NFT’s created by a group of talented individuals.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">When is the mint day?</h5></Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">What is the mint price?</h5></Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    0.077 ETH + GAS FEE
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">What are airdrops?</h5></Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    An airdrop is a distribution of cryptocurrency, tokens, or NFTs that are sent to a web3 wallet address for free as a promotion. Or added value for participating in and experience or purchasing a digital asset. We have future plans for airdrops.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5" className='py-4 px-4 mx-2 my-2'>
                            <Accordion.Header><h5 className="title">What is an NFT?</h5></Accordion.Header>
                            <Accordion.Body>
                                <p>
                                    NFT stands for <span style={{fontWeight:'bold'}}>Non-Fungible Token</span>, which is a one-of-a-kind digital asset that belongs to its owners only.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </section>
            <section>
            <footer className="bg--theme--overlay footer-section bg_fixed bg_img">
                <div className="banner-shape-top">
                        </div>
                            <div className="container mx-auto">
                            <div className="footer-top pt-120 pb-3  top--wave-wrapper ">
                                <div className="footer-logo">
                                    <a href="" >
                                        <img src={logo} width="180px" height="30px" alt="logo"/>
                                    </a>
                                    <p className="footer--text">
                                        PalegoR Collection features 8888 animated NFT’s created by a group of talented individuals lead by Art H.
                                    </p>
                                </div>
                                
                                <div className='w-full mx-auto text-enter px-8 py-4'>
                                    <h5 className='text-warning mx-auto text-center mb-4'>FOLLOW</h5>
                                    <ul className="pt-1 flex mx-auto text-center" style={{width:'50%'}}>
                                        <li className="flex mx-auto text-center" style={{cursor: 'pointer'}}>
                                            <a href="https://twitter.com/SpecterOfArtNFT/status/1498512097008783360?s=20&t=FFLpsJW2b4N46qA_KcUVkA">
                                                <FontAwesomeIcon icon={faTwitter} className="fa-2x fa_timer text-warning"/>
                                            </a>
                                        </li>
                                        <li className="flex mx-auto text-center" style={{cursor: 'pointer'}}>
                                            <a href="https://www.instagram.com/specterofartnft">
                                                <FontAwesomeIcon icon={faInstagram} className="fa-2x fa_timer text-warning"/>
                                            </a>
                                        </li>
                                        <li className="flex mx-auto text-center" style={{cursor: 'pointer'}}>
                                            <a href="https://discord.com/invite/yZ8YBkwN">
                                                <FontAwesomeIcon icon={faDiscord} className="fa-2x fa_timer text-warning"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-bottom py-3">
                                <div className="copyright text--white text-center">
                                    Palegor © 2022        
                                </div>
                            </div>
                        </div>
                    </footer>
            </section>
    </>
  );
}
