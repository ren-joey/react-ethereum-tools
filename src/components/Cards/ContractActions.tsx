import { useEffect } from 'react';
import Web3 from 'web3';
import darkBetamonAbi from '../../assets/abi/dark_betamon_abi.json';
import useContract from '../functions/useContract';
import sendSignatureRequest from '../functions/sendSignatureRequest';
import { Button } from '@mui/material';
import abi from '../../assets/abi/dark_betamon_abi.json';

/**
 * Goerli dark betamon test smart contract
 * addr: 0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0
 */

interface ContractCallParam {
    method: string;
    param?: any[];
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

    const {
        contract,
        resetContract
    } = useContract({
        abi: darkBetamonAbi,
        address: '0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0',
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
        callback
    }: ContractCallParam) => {
        if (contract) {
            console.log(param);
            if (typeof contract.methods[method] === 'function') {
                contract.methods[method].apply(this, param).send({
                    from: accounts[0]
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
            <Button
                variant="contained"
                onClick={() => sign()}
            >
                Sign
            </Button>

            {
                contract && (
                    <>
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
                        </Button>
                    </>
                )
            }
        </div>
    );
};

export default ContractActions;