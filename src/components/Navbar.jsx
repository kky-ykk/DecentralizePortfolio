import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connectWallet } from "../Utils/contract";

const Navbar = () => {
  const [wallet, setWallet] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConnect = async () => {
    const account = await connectWallet();
    setWallet(account);
  };

  useEffect(() => {
    handleConnect();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavContainer scrolled={isScrolled}>
      <div className="container">
        <NavContent>
          <Logo>Portfolio</Logo>
          
          <NavLinks className={mobileMenuOpen ? "active" : ""}>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#education">Education</NavLink>
            <ConnectButton onClick={handleConnect}>
              {wallet ? (
                <>
                  <ConnectedDot />
                  {`${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`}
                </>
              ) : (
                "Connect Wallet"
              )}
            </ConnectButton>
          </NavLinks>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButton>
        </NavContent>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${props => props.scrolled ? "0.8rem 0" : "1.5rem 0"};
  background: ${props => props.scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent"};
  color: ${props => props.scrolled ? "#1a1a2e" : "white"};
  box-shadow: ${props => props.scrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.3s ease;
  backdrop-filter: ${props => props.scrolled ? "blur(10px)" : "none"};
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background: white;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    
    &.active {
      right: 0;
    }
  }
`;

const NavLink = styled.a`
  font-weight: 600;
  position: relative;
  text-decoration: none;
  color: inherit;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: #3a86ff;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3a86ff;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2a75e9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(58, 134, 255, 0.3);
  }
`;

const ConnectedDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #38b000;
  border-radius: 50%;
`;

const MobileMenuButton = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
  
  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: currentColor;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Navbar;
