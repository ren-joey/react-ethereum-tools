import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import dashboardConfig from './dashboard-config';
import AppsIcon from '@mui/icons-material/Apps';
import { MUIStyledComponent } from './Dashboard';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const { drawerWidth } = dashboardConfig;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`
    }
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme)
        })
    })
);

const DrawerComponent = ({
    handleDrawerClose,
    DrawerHeader,
    open
}: {
    handleDrawerClose: () => void,
    DrawerHeader: MUIStyledComponent,
    open: boolean
}) => {
    const theme = useTheme();

    return (
        <Drawer
            variant="permanent"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                >
                    <Link to={'/qrcode'}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center'
                                }}
                            >
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="QRCode 操作"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem
                    disablePadding
                    sx={{ display: 'block' }}
                >
                    <Link to={'/web3'}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center'
                                }}
                            >
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="合約操作"
                                sx={{ opacity: open ? 1 : 0 }}
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <Divider />
            </List>
        </Drawer>
    );
};

export default DrawerComponent;