import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x257b9FA1959B6A713f3aac2ea90f22D6E2e62191"; 
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "allEductationDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "degree",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "knowledgeAcquired",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "instutionName",
						"type": "string"
					}
				],
				"internalType": "struct Portfolio.Education[3]",
				"name": "",
				"type": "tuple[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allExperienceDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "post",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "knowledgeAcquired",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "compamyName",
						"type": "string"
					}
				],
				"internalType": "struct Portfolio.Experience[3]",
				"name": "",
				"type": "tuple[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "githubLink",
						"type": "string"
					}
				],
				"internalType": "struct Portfolio.Project[3]",
				"name": "",
				"type": "tuple[3]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "changeDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_degree",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_instutionName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_educationDetailCount",
				"type": "uint256"
			}
		],
		"name": "changeEducation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_post",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_experienceDetailCount",
				"type": "uint256"
			}
		],
		"name": "changeExperience",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageLink",
				"type": "string"
			}
		],
		"name": "changeImageLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_githubLink",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_projectCount",
				"type": "uint256"
			}
		],
		"name": "changeProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_resumeLink",
				"type": "string"
			}
		],
		"name": "changeResumeLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "educationDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "degree",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "instutionName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "experienceDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "post",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "compamyName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "imageLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_degree",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_instutionName",
				"type": "string"
			}
		],
		"name": "insertEducation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_post",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_knowledgeAcquired",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_companyName",
				"type": "string"
			}
		],
		"name": "insertExperience",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_githubLink",
				"type": "string"
			}
		],
		"name": "insertProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "projects",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "githubLink",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resumeLink",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function ContractInstance() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);
  const [newValue, setNewValue] = useState("");

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        const web3Signer = web3Provider.getSigner();
        const smartContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          web3Signer
        );

        setProvider(web3Provider);
        setSigner(web3Signer);
        setContract(smartContract);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  // Fetch value from contract
  const fetchValue = async () => {
    if (contract) {
      try {
        const contractValue = await contract.getValue();
        setValue(contractValue.toString());
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    }
  };

  // Update value in contract
  const updateValue = async () => {
    if (contract) {
      try {
        const tx = await contract.setValue(newValue);
        await tx.wait(); // Wait for transaction to be mined
        alert("Transaction Successful!");
        fetchValue(); // Refresh value
      } catch (error) {
        console.error("Transaction Error:", error);
      }
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>React + Ethers.js + MetaMask</h2>
      {provider ? (
        <>
          <button onClick={fetchValue}>Fetch Value</button>
          <h3>Stored Value: {value !== null ? value : "N/A"}</h3>

          <input
            type="number"
            placeholder="Enter new value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button onClick={updateValue}>Update Value</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ContractInstance;
