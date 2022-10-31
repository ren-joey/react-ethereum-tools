import styled from '@emotion/styled';
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import sendSignatureRequest from '../functions/sendSignatureRequest';
import useMetaMask from '../functions/useMetaMask';
import CardTemplate from '../Shared/CardTemplate';
import abi from '../../assets/abi/dark_betamon_abi.json';
import useContract from '../functions/useContract';

interface ContractCallParam {
    method: string;
    param?: any[];
    callback: (res: any) => void;
}

const MetaMaskCard = () => {
    const {
        isMetaMaskInstalled,
        web3,
        accounts,
        enable,
        disable
    } = useMetaMask();

    const {
        contract,
        resetContract
    } = useContract();

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

    return (
        <CardTemplate
            headLabel="Ethereum"
            title="MetaMask"
            subtitle="test passage"
            Content={
                <>
                    <Typography variant="body2">
                        Crypto wallet connection test by MetaMask
                    </Typography>

                    {
                        Array.isArray(accounts) && accounts.length !== 0 && (
                            <Typography variant="body2">
                                {
                                    accounts.map((account) => account)
                                }
                            </Typography>
                        )
                    }

                    <br />

                    <div>
                        Is MetaMask Installed: {
                            isMetaMaskInstalled ? (
                                <Chip
                                    label="YES"
                                    color="primary"
                                    size="small"
                                />
                            ) : (
                                <Chip
                                    label="NO"
                                    color="default"
                                    size="small"
                                />
                            )
                        }
                    </div>

                    <br />

                    <div>
                        Connection Status: {
                            !web3 ? (
                                <Chip
                                    label="DISABLED"
                                    color="default"
                                    size="small"
                                />
                            ) : (
                                <Chip
                                    label="ENABLE"
                                    color="primary"
                                    size="small"
                                />
                            )
                        }
                    </div>

                    <br />

                    <div>
                        <Button
                            variant="contained"
                            onClick={() => enable()}
                            disabled={Boolean(web3)}
                        >
                            Connect
                        </Button>
                        <Button
                            style={{ marginLeft: '1rem' }}
                            variant="outlined"
                            color="warning"
                            disabled={!web3}
                            onClick={() => disable()}
                        >
                            Disconnect
                        </Button>
                    </div>

                    {
                        web3 && (
                            <>
                                <Divider style={{ margin: '0.6rem 0' }} />
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
                            </>
                        )
                    }
                </>
            }
        />
    );
};

export default MetaMaskCard;