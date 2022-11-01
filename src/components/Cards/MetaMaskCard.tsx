import styled from '@emotion/styled';
import { Button, Chip, Divider, Typography } from '@mui/material';
import useMetaMask from '../functions/useMetaMask';
import CardTemplate from '../Shared/CardTemplate';
import ContractActions from './ContractActions';

const MetaMaskCard = () => {
    const {
        isMetaMaskInstalled,
        web3,
        accounts,
        enable,
        disable
    } = useMetaMask();

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
                                <ContractActions
                                    web3={web3}
                                    accounts={accounts}
                                />
                            </>
                        )
                    }
                </>
            }
        />
    );
};

export default MetaMaskCard;