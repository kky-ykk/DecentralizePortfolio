import React, { useEffect, useState } from "react";
import { getContract } from "../Utils/contract";
import styled from "styled-components";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const contract = await getContract();
                if (!contract) {
                    setLoading(false);
                    return;
                }

                // Assuming the contract has a similar function for projects
                const data = await contract.allProjects(); // Adjust based on your actual contract method
                setProjects(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <LoadingSpinner>Loading...</LoadingSpinner>;
    }

    // If there's no project data, display some dummy projects
    const displayProjects = projects.length > 0 ? projects : [
        {
            title: "DeFi Dashboard",
            description: "A dashboard for monitoring DeFi investments and yields across multiple protocols.",
            technologies: "React, Ethers.js, Web3"
        },
        {
            title: "NFT Marketplace",
            description: "A platform for artists to mint, showcase, and sell their digital artwork as NFTs.",
            technologies: "Next.js, Solidity, IPFS"
        },
        {
            title: "Smart Contract Auditor",
            description: "An automated tool that helps identify common vulnerabilities in Ethereum smart contracts.",
            technologies: "Solidity, Hardhat, TypeScript"
        }
    ];

    return (
        <ProjectsContainer>
            <ProjectsGrid>
                {displayProjects.map((project, index) => (
                    index != 0 &&
                    <ProjectCard key={index}>
                        <ProjectImage $color={getRandomColor()} src={``}
                            style={{
                                backgroundImage: `url(https://coffee-brilliant-frog-992.mypinata.cloud/ipfs/${project.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <ProjectContent>
                            <ProjectTitle>{project.name}</ProjectTitle>
                            <ProjectDescription>{project.description}</ProjectDescription>
                            {project.technologies && (
                                <TechStack>
                                    {project.technologies.split(', ').map((tech, i) => (
                                        <TechTag key={i}>{tech}</TechTag>
                                    ))}
                                </TechStack>
                            )}
                            {/* <ViewProjectButton as='a' src={`https://github.com/kky-ykk/${project.githubLink}`} target="_blank" 
  rel="noopener noreferrer">View Project</ViewProjectButton> */}
                            <ViewProjectButton as="a" href={project.githubLink ? `https://github.com/kky-ykk/${project.githubLink}` : "#"} target="_blank" rel="noopener noreferrer">
                                View Project
                            </ViewProjectButton>
                        </ProjectContent>
                    </ProjectCard>
                ))}
            </ProjectsGrid>
        </ProjectsContainer>
    );
};

// Helper function to generate random pastel colors for project thumbnails
const getRandomColor = () => {
    const colors = [
        "rgba(58, 134, 255, 0.2)",
        "rgba(255, 0, 110, 0.2)",
        "rgba(56, 176, 0, 0.2)",
        "rgba(255, 193, 7, 0.2)",
        "rgba(156, 39, 176, 0.2)"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const ProjectsContainer = styled.div`
  padding: 1rem 0;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #6c757d;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.div`
  height: 180px;
  background-color: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.8rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.2rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background-color: #f0f4f8;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #4a4a4a;
`;

const ViewProjectButton = styled.button`
  background-color: transparent;
  color: #3a86ff;
  border: 1px solid #3a86ff;
  padding: 0.7rem 1.2rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3a86ff;
    color: white;
  }
`;

export default Projects;