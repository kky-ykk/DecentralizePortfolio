import React, { useEffect, useState } from "react";
import { getContract } from "../Utils/contract";
import styled from "styled-components";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const contract = await getContract();
        if (!contract) {
          setLoading(false);
          return;
        }

        const data = await contract.allEductationDetails();
        setEducation(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching education:", error);
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  return (
    <EducationContainer>
      {education.length === 0 ? (
        <NoDataMessage>No education details available.</NoDataMessage>
      ) : (
        <EducationGrid>
          {education.map((edu, index) => (
            index!=2 &&
            <EducationCard key={index}>
              <SchoolIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
              </SchoolIcon>
              <DegreeName>{edu.degree}</DegreeName>
              <InstitutionName>{edu.instutionName}</InstitutionName>
              <KnowledgeText>{edu.knowledgeAcquired}</KnowledgeText>
            </EducationCard>
          ))}
        </EducationGrid>
      )}
    </EducationContainer>
  );
};

const EducationContainer = styled.div`
  padding: 1rem 0;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #6c757d;
`;

const NoDataMessage = styled.p`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EducationCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const SchoolIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 30px;
    height: 30px;
    color: #3a86ff;
  }
`;

const DegreeName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
`;

const InstitutionName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a4a4a;
  margin-bottom: 1rem;
`;

const KnowledgeText = styled.p`
  font-size: 0.95rem;
  color: #6c757d;
  line-height: 1.6;
`;

export default Education;