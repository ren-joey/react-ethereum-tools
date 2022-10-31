import { useEffect } from 'react';
import Web3 from 'web3';
import CardTemplate from '../Shared/CardTemplate';
import darkBetamonAbi from '../../assets/abi/dark_betamon_abi.json';
import useContract from '../functions/useContract';

/**
 * Goerli dark betamon test smart contract
 * addr: 0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0
 */

const ContractCard = ({ web3 }: { web3: Web3 }) => {

    const {
        contract
    } = useContract({
        abi: darkBetamonAbi,
        address: '0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0',
        web3
    });

    // useEffect

    return (
        <CardTemplate
            headLabel="Contract Call"
            title="Dark Betamon"
            subtitle="call by web3.0"
            Content={
                <div>
                    123
                </div>
            }
        />
    );
};

export default ContractCard;