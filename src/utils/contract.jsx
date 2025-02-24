import { ethers } from "ethers";
import abi from "./PortfolioABI.json"; // Ensure ABI is correct

const contractAddress = "0x257b9FA1959B6A713f3aac2ea90f22D6E2e62191";

// Function to get Ethereum object
const getEthereumObject = () => {
    if (typeof window !== "undefined" && window.ethereum) {
        return window.ethereum;
    }
    return null;
};

// Function to get contract instance
export const getContract = async () => {
    try {
        const ethereum = getEthereumObject();
        if (!ethereum) {
            console.error("MetaMask not detected. Please install it.");
            return null;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        // console.log(contractAddress, abi, signer);
        return new ethers.Contract(contractAddress, abi, signer);
    } catch (error) {
        console.error("Error fetching contract:", error);
        return null;
    }
};

// Function to connect wallet
export const connectWallet = async () => {
    try {
        const ethereum = getEthereumObject();
        if (!ethereum) {
            alert("MetaMask not detected! Please install it.");
            return null;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        return accounts[0];
    } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
    }
};
