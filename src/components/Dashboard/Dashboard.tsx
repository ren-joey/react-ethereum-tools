import * as React from 'react';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './DrawerComponent';
import { StyledComponent } from '@emotion/styled';
import { MUIStyledCommonProps } from '@mui/system';
import dashboardConfig from './dashboard-config';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import QRCodeContainer from './QRCodeContainer';
import Web3Container from './Web3Container';
import packageJson from '../../../package.json';

export type MUIStyledComponent = StyledComponent<
    MUIStyledCommonProps<Theme>,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>;

const { drawerWidth } = dashboardConfig;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Layout = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' })
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>

            <DrawerComponent
                handleDrawerClose={handleDrawerClose}
                DrawerHeader={DrawerHeader}
                open={open}
            />

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route
                path="/"
                element={<QRCodeContainer />}
            />
            <Route
                path="/qrcode"
                element={<QRCodeContainer />}
            />
            <Route
                path="/web3"
                element={<Web3Container />}
            />
        </Route>
    ),
    {
        basename: packageJson.homepage
    }
);

const Dashboard = () => (
    <RouterProvider router={router} />
);

export default Dashboard;