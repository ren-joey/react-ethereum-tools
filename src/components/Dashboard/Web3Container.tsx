import { Grid } from '@mui/material';
import MetaMaskCard from '../Cards/MetaMaskCard';
import WalletConnectCard from '../Cards/WalletConnectCard';

const PackedGrid = (
    { Content }: { Content: JSX.Element }
) => (
    <Grid
        xs={12}
        sm={6}
        md={4}
        style={{ padding: '0.5rem' }}
    >
        { Content }
    </Grid>
);

const Web3Container = () => {
    return (
        <Grid
            container
            spacing={2}
        >
            <PackedGrid
                Content={
                    <WalletConnectCard />
                }
            />

            <PackedGrid
                Content={
                    <MetaMaskCard />
                }
            />
        </Grid>
    );
};

export default Web3Container;