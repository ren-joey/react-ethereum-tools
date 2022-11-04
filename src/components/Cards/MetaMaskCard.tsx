import styled from '@emotion/styled';
import { Button, Chip, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import useMetaMask from '../functions/useMetaMask';
import CardTemplate from '../Shared/CardTemplate';
import ContractActions from './ContractActions';
import MobileDetect from 'mobile-detect';

const MetaMaskCard = () => {
    const {
        isMetaMaskInstalled,
        web3,
        accounts,
        chainId,
        enable,
        disable
    } = useMetaMask();

    const openInMetaMask = () => {
        window.open('https://metamask.app.link/dapp/rd.bbinpromo.com/product_event/ethereum-tools/');
    };

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

                    {
                        (!isMetaMaskInstalled && window.innerWidth < 992) && (
                            <Button
                                variant="contained"
                                onClick={() => openInMetaMask()}
                            >
                                Connect
                            </Button>
                        )
                    }

                    {
                        isMetaMaskInstalled && (
                            <>
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
                                    chainId === 5 && web3 ? (
                                        web3 && (
                                            <>
                                                <Divider style={{ margin: '0.6rem 0' }} />
                                                <ContractActions
                                                    web3={web3}
                                                    accounts={accounts}
                                                />
                                            </>
                                        )
                                    ) : chainId !== null
                                        ? <Typography variant="caption">請使用 Goerli 測試網路</Typography>
                                        : null
                                }
                            </>
                        )
                    }
                </>
            }
        />
    );
};

export default MetaMaskCard;