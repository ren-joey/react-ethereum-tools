import { useEffect, useState } from 'react';
import Web3 from 'web3';
import darkBetamonAbi from '../../assets/abi/dark_betamon_abi.json';
import useContract from '../functions/useContract';
import sendSignatureRequest from '../functions/sendSignatureRequest';
import { Button, TextField } from '@mui/material';
import abi from '../../assets/abi/dark_betamon_abi.json';

/**
 * Goerli dark betamon test smart contract
 * addr: 0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0
 * addr: 0x1bB6C7452AFD29376F6f3436ae7B3F78E7F2bA8e
 * addr: 0x517834bbf06E929c1b22c7603cfb18ee0Bbb45A6
 */

interface ContractCallParam {
    method: string;
    param?: any[];
    gas?: number;
    callback: (res: any) => void;
}

interface ContractCardParam {
    web3: Web3;
    accounts: string[];
}

const ContractActions = ({
    web3,
    accounts
}: ContractCardParam) => {
    const [ quantity, setQuantity ] = useState(1);

    const {
        contract,
        resetContract
    } = useContract({
        abi: darkBetamonAbi,
        address: '0x1bB6C7452AFD29376F6f3436ae7B3F78E7F2bA8e',
        web3
    });

    const sign = () => {
        if (Array.isArray(accounts)
            && accounts[0]
            && web3) {
            sendSignatureRequest({
                account: accounts[0],
                message: 'Test',
                web3
            }).then((res: any) => {
                console.log(res);
            }).catch((err: any) => {
                console.log(err);
            });
        }
    };

    const contractCall = ({
        method,
        param = [],
        callback
    }: ContractCallParam) => {
        if (contract) {
            console.log(param);
            if (typeof contract.methods[method] === 'function') {
                contract.methods[method].apply(this, param).call().then(callback);
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
                contract.methods[method].apply(this, param).send({
                    from: accounts[0],
                    gas
                }).then(callback);
            }
        }
    };

    const balanceOf = () => {
        contractCall({
            method: 'balanceOf',
            param: [accounts[0]],
            callback: (res) => {
                console.log(res);
            }
        });
    };

    const preserveMint = () => {
        contractSend({
            method: 'preserveMint',
            param: [1],
            callback: (res) => {
                console.log(res);
            }
        });
    };

    const mint = () => {
        contractSend({
            method: 'mint',
            param: [quantity],
            callback: (res) => {
                console.log(res);
            }
        });
    };

    const owner = () => {
        contractCall({
            method: 'owner',
            callback: (res) => {
                console.log(res);
            }
        });
    };

    const tokenURI = () => {
        contractCall({
            method: 'tokenURI',
            param: [0],
            callback: (res) => {
                console.log(res);
            }
        });
    };

    const isBlindBoxOpened = () => {
        contractCall({
            method: 'isBlindBoxOpened',
            callback: (res) => {
                console.log(res);
            }
        });
    };

    useEffect(() => {
        if (web3 && !contract) {
            resetContract({
                abi,
                address: '0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0',
                web3
            });
        }
    }, [web3]);

    // useEffect

    return (
        <div>
            {/* <Button
                variant="contained"
                onClick={() => sign()}
            >
                Sign
            </Button> */}

            {
                contract && (
                    <>
                        {/* <Button
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
                        </Button> */}
                        <div style={{ display: 'flex' }}>
                            <TextField
                                id="outlined-basic"
                                label="數量"
                                variant="outlined"
                                size="small"
                                value={quantity}
                                type="number"
                                onChange={(e) => {
                                    let val = Number(e.target.value);
                                    if (val > 120) val = 120;
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

                        <Button
                            style={{ marginTop: '1rem' }}
                            variant="contained"
                            disabled={!web3}
                            fullWidth={true}
                            onClick={() => window.open('https://testnets.opensea.io')}
                        >
                            查看 Opensea
                        </Button>
                        {/* <Button
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
                            onClick={() => tokenURI()}
                        >
                            token URI
                        </Button>
                        <Button
                            style={{ marginLeft: '1rem' }}
                            variant="contained"
                            disabled={!web3}
                            onClick={() => isBlindBoxOpened()}
                        >
                            Blind Box
                        </Button> */}
                    </>
                )
            }
        </div>
    );
};

export default ContractActions;