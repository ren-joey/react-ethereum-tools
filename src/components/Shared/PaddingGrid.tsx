import { Grid, styled } from '@mui/material';

const PaddingGrid = styled(Grid)(() => ({
    padding: '0.5rem'
}));

const RwdGrid = (
    { Content }: { Content: JSX.Element }
) => (
    <PaddingGrid
        xs={12}
        sm={6}
        md={4}
        item={true}
    >
        { Content }
    </PaddingGrid>
);

export default RwdGrid;