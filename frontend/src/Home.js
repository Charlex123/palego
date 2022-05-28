import * as React from "react";
import { useEffect, useState } from "react";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import TradingViewWidget, { BarStyles, Themes, IntervalTypes } from "react-tradingview-widget";
import Icon from 'react-fa';
import Carousel, { slidesToShowPlugin, slidesToScrollPlugin, arrowsPlugin  } from '@brainhubeu/react-carousel';
import './styles/index.css';
import "./styles/styles.css";
import "./styles/carousel.css";
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
import finance from './images/finance.svg';
import protect from './images/protect.svg';
import partner1 from './images/logo.png';
import partner2 from './images/binancelogo.png';
import partner3 from './images/logo.png';
import partner4 from './images/logo.png';
import partner5 from './images/binancelogo.png';
import teamearn from './images/teamearn.png';
import secure from './images/secure.svg';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";

library.add(faInstagram, faTwitter, faDiscord, faCheck, faCheckSquare);
export default function Home() {
//   const [accounts, setAccounts] = useState([]);

//   const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if(window.ethereum)  {
            // window.web3 = new Web3(web3.currentProvider);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            // setAccounts(accounts);
        } else {
            //  Create WalletConnect Provider
            const provider = new WalletConnectProvider({
                chainId: 57,
                rpc:'https://bsc-dataseed.binance.org/'
            });
            
            //  Enable session (triggers QR Code modal)
            await provider.enable();

            const web3Provider = new providers.Web3Provider(provider);
        }
    }

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
                        <div className="youtubelink mx-auto text-center">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/uI6slvVUU2o" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </section>
                    <section className="about-section px-3" id="about-us">
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
                                <div><h1>Security</h1></div>
                                <img src={secure} />
                                All Details And Transactions Are Secured In blockChain 
                            </div>
                            <div className="col-md-4">
                                <div><h1>Protection</h1></div>
                                <img src={protect} />
                                Funds Are Protected
                            </div>
                            <div className="col-md-4">
                                <div><h1>Profit Guaranteed</h1></div>
                                <img src={finance} />
                                Profits Are Guaranteed 
                            </div>
                        </div>
                    </section>

                <section className="faqs-section" id="faq">
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
            <section className="earnmore px-3" id="">
                    <div className='bg-image-overlay'></div>
                    <div className="container">
                        <div className="col-md-12">
                            <div className="about__content">
                                <div className="section__header">
                                    <h1 className="text-center mt-4 pt-4">
                                        EARN MORE BY BUILDING YOUR TEAM
                                    </h1>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="section__title">
                                            Earn more by building your team Earn more by building your team Earn more by building your team Earn more by building your team
                                            Earn more by building your team Earn more by building your team Earn more by building your team Earn more by building your team 
                                            Earn more by building your team Earn more by building your team
                                        </p>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <img src={teamearn} className="img-fluid" />
                                    </div>
                                </div>
                                <div className="howrefworks">
                                    <h1 className="text-center mt-4 pt-4">
                                        How Our Referral System Works
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h1>Security</h1>
                                            <img src={teamearn} />
                                            All Details And Transactions Are Secured In blockChain 
                                        </div>
                                        <div className="col-md-4">
                                            <div><h1>Protection</h1></div>
                                            <img src={teamearn} />
                                            Funds Are Protected
                                        </div>
                                        <div className="col-md-4">
                                            <div><h1>Profit Guaranteed</h1></div>
                                            <img src={teamearn} />
                                            Profits Are Guaranteed 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <section className="testimony">
                <h1>What Our Users Say</h1>
                <div className="container">
                    <div  id="demo" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="carousel-caption">
                            <p>If Shai Reznik's TDD videos don't convince you to add automated testing your code,
                                I don't know what will.This was the very best explanation of frameworks for brginners 
                                that I've ever seen.
                            </p>
                            <img src="https://i.imgur.com/lE89Aey.jpg"/>
                            <div id="image-caption">Nick Doe</div>
                            </div>   
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-caption">
                            <p>If Shai Reznik's TDD videos don't convince you to add automated testing your code,
                                I don't know what will.This was the very best explanation of frameworks for brginners 
                                that I've ever seen.</p>
                                <img src="https://i.imgur.com/QptVdsp.jpg" className="img-fluid"/>
                                <div id="image-caption">Cromption Greves</div>
                            </div>   
                        </div>
                        <div className="carousel-item">
                            <div className="carousel-caption">
                            <p>If Shai Reznik's TDD videos don't convince you to add automated testing your code,
                                I don't know what will.This was the very best explanation of frameworks for brginners 
                                that I've ever seen.</p>
                                <img src="https://i.imgur.com/jQWThIn.jpg" className="img-fluid"/>
                                <div id="image-caption">Harry Mon</div>
                            </div>   
                        </div>
                        </div>
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <button style={{fontSize: 30, fontWeight: 'bolder',background: 'rgba(7, 6, 44, 0.336)', color: '#ffffff', width: 'max-content', padding: '0 .4rem', borderRadius: 8}}><Icon name="angle-double-left" /></button>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <button style={{fontSize: 30, fontWeight: 'bolder',background: 'rgba(7, 6, 44, 0.336)', color: '#ffffff', width: 'max-content', padding: '0 .4rem', borderRadius: 8}}><Icon name="angle-double-right" /></button>
                        </a>
                    </div >
                    
                </div>
            </section>
            <section className="partners">
                <h1>OUR PARTNERS</h1>
                <div className="partner-cont">
                    <div className="partner-inner"><img src={partner1} /></div>
                    <div className="partner-inner"><img src={partner2} /></div>
                    <div className="partner-inner"><img src={partner3} /></div>
                    <div className="partner-inner"><img src={partner4} /></div>
                    <div className="partner-inner"><img src={partner5} /></div>
                </div>
            </section>
            <section className="footer-section">
                <footer className="text-center text-lg-start ">
                    <div className="container p-4 pb-0">
                        <section className="">
                            <div className="row">
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                    <img src={logo} width="120px" height="20px" className="" alt="logo"/>
                                </h6>
                                <p>
                                Here you can use rows and columns to organize your footer
                                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit.
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                                <p>
                                <a className="">MDBootstrap</a>
                                </p>
                                <p>
                                <a className="">MDWordPress</a>
                                </p>
                                <p>
                                <a className="">BrandFlow</a>
                                </p>
                                <p>
                                <a className="">Bootstrap Angular</a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">
                                Navigate
                                </h6>
                                <p>
                                <a className="">Your Account</a>
                                </p>
                                <p>
                                <a className="">Become an Affiliate</a>
                                </p>
                                <p>
                                <a className="">Shipping Rates</a>
                                </p>
                                <p>
                                <a className="">Help</a>
                                </p>
                            </div>

                            <hr className="w-100 clearfix d-md-none" />

                            </div>
                        </section>

                        <hr className="my-3"/>

                        <section className="p-3 pt-0">
                            <div className="row d-flex align-items-center">
                            <div className="col-md-7 col-lg-8 text-center text-md-start">
                                <div className="p-3">  
                                    © 2022 Copyright: <a className="" href="#">PalegoR</a>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                                <a className="btn  btn-floating m-1 " role="button">
                                    <FontAwesomeIcon icon={faTwitter} className="fa_timer text-white"/>
                                </a>

                                <a className="btn  btn-floating m-1 " role="button">
                                    <FontAwesomeIcon icon={faFacebook} className="fa_timer text-white"/>
                                </a>

                                <a className="btn  btn-floating m-1 " role="button">
                                    <FontAwesomeIcon icon={faInstagram} className="fa_timer text-white"/>
                                </a>

                                <a className="btn  btn-floating m-1 " role="button">
                                    <FontAwesomeIcon icon={faTelegram} className="fa_timer text-white"/>
                                </a>
                            </div>
                            </div>
                        </section>
                    </div>
                </footer>
            </section>
    </>
  );
}
