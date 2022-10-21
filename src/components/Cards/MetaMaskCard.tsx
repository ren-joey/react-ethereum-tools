import styled from '@emotion/styled';
import { Button, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import sendSignatureRequest from '../functions/sendSignatureRequest';
import useMetaMask from '../functions/useMetaMask';
import CardTemplate from '../Shared/CardTemplate';
import abi from '../../assets/abi/vbc_betamon_abi.json';
import useContract from '../functions/useContract';

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

    const call = () => {
        if (contract) {
            contract.methods.balanceOf(accounts[0]).call().then((res: any) => {
                console.log(res);
            });
        }
    };

    useEffect(() => {
        if (web3 && !contract) {
            resetContract({
                abi,
                address: '0x61d65e992563c588B435D678AE56d759A8FB9372',
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
                                            <Button
                                                style={{ marginLeft: '1rem' }}
                                                variant="contained"
                                                disabled={!web3}
                                                onClick={() => call()}
                                            >
                                                Contract Call
                                            </Button>
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