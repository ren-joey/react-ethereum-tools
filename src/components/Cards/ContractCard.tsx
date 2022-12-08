import { useState } from 'react';
import useContract from '../functions/useContract';
import { Button, TextField } from '@mui/material';
import abi from '../../assets/abi/dark_betamon_abi.json';
import CardTemplate from '../Shared/CardTemplate';
import FetchNftAssetFromOpenSea from './FetchNftAssetFromOpenSea';
import { UsingWeb3Param } from '../Dashboard/Web3Container';

/**
 * prefix: http://13.114.104.243/api/nft/vbc_dark_betamon/
 *
 * Goerli dark betamon test smart contract
 * addr: 0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0
 * addr: 0x1bB6C7452AFD29376F6f3436ae7B3F78E7F2bA8e
 * addr: 0x517834bbf06E929c1b22c7603cfb18ee0Bbb45A6
 *
 * Goerli secret betamon test smart contract
 * addr: 0xE5770f9076b0b86b387d8e68e5d5Ee672C4c1Bc0
 */

interface ContractCallParam {
    method: string;
    param?: any[];
    gas?: number;
    callback: (res: any) => void;
}

const ContractCard = ({
    web3,
    chainId,
    account
}: UsingWeb3Param) => {
    const [ quantity, setQuantity ] = useState(1);
    const [ contractAddress, setContractAddress ] = useState(
        '0xE5770f9076b0b86b387d8e68e5d5Ee672C4c1Bc0'
    );
    const [ tokenId, setTokenId ] = useState(1);

    const {
        contract,
        resetContract
    } = useContract();

    const contractCall = ({
        method,
        param = [],
        callback
    }: ContractCallParam) => {
        if (contract) {
            console.log(param);
            if (typeof contract.methods[method] === 'function') {
                contract.methods[method]
                    .apply(this, param)
                    .call()
                    .then(callback)
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        }
    };

    const contractSend = ({
        method,
        param = [],
        gas,
        callback
    }: ContractCallParam) => {
        if (contract) {
            console.log(param);
            if (typeof contract.methods[method] === 'function') {
                contract.methods[method]
                    .apply(this, param)
                    .send({
                        from: account,
                        gas
                    })
                    .then(callback)
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        }
    };

    const balanceOf = () => {
        contractCall({
            method: 'balanceOf',
            param: [account],
            callback: (res) => {
                alert(res);
            }
        });
    };

    const preserveMint = () => {
        contractSend({
            method: 'preserveMint',
            param: [1],
            callback: (res) => {
                alert(res);
            }
        });
    };

    const mint = () => {
        contractSend({
            method: 'mint',
            param: [quantity],
            callback: (res) => {
                alert(res);
            }
        });
    };

    const owner = () => {
        contractCall({
            method: 'owner',
            callback: (res) => {
                alert(res);
            }
        });
    };

    const tokenURI = () => {
        contractCall({
            method: 'tokenURI',
            param: [tokenId],
            callback: (res) => {
                alert(res);
            }
        });
    };

    const isBlindBoxOpened = () => {
        contractCall({
            method: 'isBlindBoxOpened',
            callback: (res) => {
                alert(res);
            }
        });
    };

    const contractInitialization = () => {
        if (web3 !== null) {
            resetContract({
                abi,
                address: contractAddress,
                web3
            });
        }
    };

    return (
        <CardTemplate
            headLabel="Ethereum"
            title="Contract Interaction"
            subtitle="test passage"
            Content={
                <>
                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                        <TextField
                            label="合約地址"
                            variant="outlined"
                            size="small"
                            value={contractAddress}
                            onChange={(e) => {
                                setContractAddress(e.target.value);
                            }}
                            sx={{
                                width: 'auto',
                                flex: '1'
                            }}
                        />

                        <Button
                            style={{ marginLeft: '1rem' }}
                            variant="contained"
                            onClick={() => contractInitialization()}
                        >
                            INIT
                        </Button>
                    </div>

                    { contract && (
                        <>
                            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                <TextField
                                    label="數量"
                                    variant="outlined"
                                    size="small"
                                    value={quantity}
                                    type="number"
                                    onChange={(e) => {
                                        let val = Number(e.target.value);
                                        if (val > 880) val = 880;
                                        else if (val < 1) val = 1;
                                        setQuantity(val);
                                    }}
                                    sx={{
                                        width: 'auto',
                                        flex: '1'
                                    }}
                                />

                                <Button
                                    style={{ marginLeft: '1rem' }}
                                    variant="contained"
                                    disabled={!web3}
                                    onClick={() => mint()}
                                >
                                    Mint
                                </Button>
                            </div>

                            <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                <TextField
                                    label="TOKEN ID"
                                    variant="outlined"
                                    size="small"
                                    value={tokenId}
                                    onChange={(e) => {
                                        let val = Number(e.target.value);
                                        if (val > 880) val = 880;
                                        else if (val < 1) val = 1;
                                        setTokenId(val);
                                    }}
                                    sx={{
                                        width: 'auto',
                                        flex: '1'
                                    }}
                                />

                                <Button
                                    style={{ marginLeft: '1rem' }}
                                    variant="contained"
                                    onClick={() => tokenURI()}
                                >
                                    token URI
                                </Button>
                            </div>

                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="contained"
                                disabled={!web3}
                                onClick={() => balanceOf()}
                            >
                                Balance Of
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="contained"
                                disabled={!web3}
                                onClick={() => preserveMint()}
                            >
                                Preserve Mint
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="contained"
                                disabled={!web3}
                                onClick={() => owner()}
                            >
                                Owner
                            </Button>
                            <Button
                                style={{ marginLeft: '1rem' }}
                                variant="contained"
                                disabled={!web3}
                                onClick={() => isBlindBoxOpened()}
                            >
                                Blind Box
                            </Button>

                            <Button
                                style={{ marginTop: '1rem' }}
                                variant="contained"
                                disabled={!web3}
                                fullWidth={true}
                                onClick={() => window.open('https://testnets.opensea.io')}
                            >
                                查看 Opensea
                            </Button>

                            { contractAddress && chainId && (
                                <FetchNftAssetFromOpenSea
                                    address={contractAddress}
                                    chainId={chainId}
                                />
                            )}
                        </>
                    )}
                </>
            }
        />
    );
};

export default ContractCard;