import { useState } from 'react';
import Web3 from 'web3';

interface UseContractParams {
    web3: Web3;
    abi: any[];
    address: string
}

const useContract = ({
    abi,
    address,
    web3
}: Partial<UseContractParams> = {}) => {
    const Contract = ( abi && address && web3 ) ? new web3.eth.Contract(
        abi,
        address
    ) : undefined;

    const [contract, setContract] = useState(Contract);

    const resetContract = ({
        abi,
        address,
        web3
    }: UseContractParams) => {
        setContract(
            new web3.eth.Contract(
                abi,
                address
            )
        );
    };

    return {
        contract,
        resetContract
    };
};

export default useContract;