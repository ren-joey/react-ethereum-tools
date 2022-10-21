// import { experimentalStyled as styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MetaMaskCard from '../Cards/MetaMaskCard';
import WalletConnectCard from '../Cards/WalletConnectCard';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
// }));

const Container = () => {
    const PackedGrid = (
        { Content }: { Content: JSX.Element }
    ) => (
        <Grid
            xs={12}
            sm={6}
            md={4}
            lg={3}
        >
            { Content }
        </Grid>
    );

    return (
        <div>
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
        </div>
    );
};

export default Container;