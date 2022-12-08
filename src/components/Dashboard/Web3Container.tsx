import { Grid } from '@mui/material';
import { useState } from 'react';
import Web3 from 'web3';
import ContractCard from '../Cards/ContractCard';
import MetaMaskCard from '../Cards/MetaMaskCard';
import WalletConnectCard from '../Cards/WalletConnectCard';
import RwdGrid from '../Shared/PaddingGrid';

export interface UsingWeb3Param {
    web3: null|Web3,
    chainId: null|number,
    account: null|string
}

const Web3Container = () => {
    const [usingWeb3, setUsingWeb3] = useState<UsingWeb3Param>({
        web3: null,
        chainId: null,
        account: null
    });

    return (
        <Grid
            container
            spacing={2}
        >
            <RwdGrid
                Content={
                    <WalletConnectCard setUsingWeb3={setUsingWeb3} />
                }
            />

            <RwdGrid
                Content={
                    <MetaMaskCard setUsingWeb3={setUsingWeb3} />
                }
            />

            {
                usingWeb3.web3 && usingWeb3.account && (
                    <ContractCard
                        web3={usingWeb3.web3}
                        account={usingWeb3.account}
                        chainId={usingWeb3.chainId}
                    />
                )
            }
        </Grid>
    );
};

export default Web3Container;