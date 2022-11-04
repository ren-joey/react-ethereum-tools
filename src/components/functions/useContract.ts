import { useState } from 'react';
import Web3 from 'web3';

interface UseContractParams {
    web3: Web3;
    abi: any[];
    address: string
}

const getContract = ({
    abi,
    address,
    web3
}: UseContractParams) => {
    const Contract = new web3.eth.Contract(
        abi,
        address
    );
    Contract.handleRevert = true;
    return Contract;
};

const useContract = ({
    abi,
    address,
    web3
}: Partial<UseContractParams> = {}) => {
    const Contract = ( abi && address && web3 ) ? getContract({ abi, address, web3 }) : undefined;

    const resetContract = ({
        abi,
        address,
        web3
    }: UseContractParams) => {
        setContract(
            getContract({ abi, address, web3 })
        );
    };

    const [contract, setContract] = useState(Contract);

    return {
        contract,
        resetContract
    };
};

export default useContract;