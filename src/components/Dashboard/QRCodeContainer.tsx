import { Grid } from '@mui/material';
import QRCodeGeneratorCard from '../Cards/QRCodeGeneratorCard';
import QRCodeScannerCard from '../Cards/QRCodeScannerCard';

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

const QRCodeContainer = () => {
    return (
        <Grid
            container
            spacing={2}
        >
            <PackedGrid
                Content={
                    <QRCodeGeneratorCard />
                }
            />

            <PackedGrid
                Content={
                    <QRCodeScannerCard />
                }
            />

            {/* <PackedGrid
                Content={
                    <QRCodeRetrieverCard />
                }
            /> */}
        </Grid>
    );
};

export default QRCodeContainer;