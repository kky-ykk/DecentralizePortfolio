import React, { useEffect, useState } from "react";
import { getContract } from "../Utils/contract";
import styled from "styled-components";

const PortfolioDetails = () => {
  const [description, setDescription] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getContract();
        if (!contract) {
          setError("Contract not found. Please check MetaMask.");
          return;
        }

        const desc = await contract.description();
        const resume = await contract.resumeLink();
        const image = await contract.imageLink();

        setDescription(desc);
        setResumeLink(resume);
        setImageLink(image);
      } catch (err) {
        console.error("Error fetching portfolio details:", err);
        setError("Error fetching data. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <ProfileContainer>
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <ProfileContent>
            <div className="text-content">
              <h1>Welcome to My Portfolio</h1>
              <p className="description">{description}</p>
              <div className="cta-buttons">
                <ResumeButton href={`https://drive.google.com/file/d/1Bud4H9AXlrQIYdZsUcMLUN3HGYPK5NyC/view?usp=sharing`} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                  </svg>
                  View Resume
                </ResumeButton>
                <a href="#projects" className="btn btn-primary">See My Work</a>
              </div>
            </div>
            <div className="image-container">
              <ProfileImage src={imageLink ? `https://ipfs.io/ipfs/${imageLink}` : "https://via.placeholder.com/300"} alt="Profile" />
            </div>
          </ProfileContent>
        </>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  background: #f8d7da;
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem 0;
  font-weight: 500;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
  
  .text-content {
    flex: 2;
    
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #1a1a2e;
      line-height: 1.2;
    }
    
    .description {
      font-size: 1.1rem;
      color: #4a4a4a;
      margin-bottom: 2rem;
      line-height: 1.8;
    }
    
    .cta-buttons {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 480px) {
        flex-direction: column;
      }
    }
  }
  
  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 5px solid white;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8f9fa;
  color: #343a40;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid #e9ecef;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: #e9ecef;
    border-color: #dee2e6;
    
    svg {
      transform: translateY(-2px);
    }
  }
`;

export default PortfolioDetails;