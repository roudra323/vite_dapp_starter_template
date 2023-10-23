import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { getContract, getWalletClient } from "@wagmi/core";
import { abiSUM, abiDIV } from "../contracts";
import { ethers, BrowserProvider } from "ethers";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();

  const [sumState, setsumState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [divState, setdivState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  let signer;
  let provider;

  try {
    const { ethereum } = window;

    if (ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = provider.getSigner();
    } else {
      alert("Please install metamask");
    }
  } catch (error) {
    console.log(error);
  }

  const sumContractIns = async () => {
    const sumAddress = import.meta.env.VITE_CONTRACT_ADDRESS_SUM;
    const sumContract = getContract(sumAddress, abiSUM, signer);
    return sumContract;
  };

  const divContractIns = async () => {
    const divAddress = import.meta.env.VITE_CONTRACT_ADDRESS_DIV;
    const divContract = getContract(divAddress, abiDIV, signer);
    return divContract;
  };

  const getContract = async (address, abi, signer) => {
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  };

  useEffect(() => {
    const contractSum = sumContractIns();
    const contractDiv = divContractIns();

    if (address && contractSum && contractDiv) {
      setsumState({ provider, signer, contractSum });
      setdivState({ provider, signer, contractDiv });
    }
  }, []);

  console.log(isConnected, isDisconnected, address);

  console.log("sumContract", sumState);
  console.log("divContract", divState);

  return (
    <GlobalContext.Provider
      value={{
        address,
        isConnected,
        isDisconnected,
        sumState,
        divState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
