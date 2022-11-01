import { Button, Chip, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import sendSignatureRequest from '../functions/sendSignatureRequest';
import useWalletconnect from '../functions/useWalletConnection';
import CardTemplate from '../Shared/CardTemplate';
import ContractActions from './ContractActions';

const WalletConnectCard = () => {
    const {
        web3,
        enable,
        disable,
        accounts
    } = useWalletconnect();

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

    return (
        <CardTemplate
            headLabel="Ethereum"
            title="WalletConnect"
            subtitle="test passage"
            Content={
                <>
                    <Typography variant="body2">
                        Crypto wallet connection test by WalletConnect
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

export default WalletConnectCard;