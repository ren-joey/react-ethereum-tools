import { Grid } from '@mui/material';
import QRCodeGeneratorCard from '../Cards/QRCodeGeneratorCard';
import QRCodeScannerCard from '../Cards/QRCodeScannerCard';
import RwdGrid from '../Shared/PaddingGrid';

const QRCodeContainer = () => {
    return (
        <Grid
            container
            spacing={2}
        >
            <RwdGrid
                Content={
                    <QRCodeGeneratorCard />
                }
            />

            <RwdGrid
                Content={
                    <QRCodeScannerCard />
                }
            />

            {/* <RwdGrid
                Content={
                    <QRCodeRetrieverCard />
                }
            /> */}
        </Grid>
    );
};

export default QRCodeContainer;