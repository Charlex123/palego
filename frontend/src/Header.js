import React, { useState } from "react";
// import Accordion from 'react-bootstrap/Accordion';
// import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./styles/styles.css";
import logo from './images/logo.png'

import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
// import {utils} from 'ethers'

const Header = () => {
    

    return(
    <div>
      <header className="topfixedheader">
            <Navbar collapseOnSelect expand="lg" className="navbar">
                {/* <Container className="justify-item-center"> */}
                    <Navbar.Brand href="../"><img src={logo} width="120px" height="20px" className="" alt="logo"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navtoggler bg-primary"/>
                    <Navbar.Collapse id="responsive-navbar-nav" placement="end" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="../" className="nav-link">Home</Nav.Link>
                            <Nav.Link href="../#about-us" className="nav-link">About</Nav.Link>
                            <Nav.Link href="../#faq" className="nav-link">Faq</Nav.Link>
                            <Nav.Link href="../login/users" className="nav-link"><Button className="login">Login</Button></Nav.Link>
                            <Nav.Link eventKey={2} href="../register" className="nav-link">
                                <Button className="signup">SIGN UP</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
        </header>
    </div>
    )
};

export default Header;