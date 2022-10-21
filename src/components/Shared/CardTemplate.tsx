import { Card, CardActions, CardContent, Typography } from '@mui/material';

interface CardTemplateParams {
    headLabel?: string;
    title?: string;
    subtitle?: string;
    Content: JSX.Element;
    Action?: JSX.Element;
    minWidth?: number;
}

const CardTemplate = ({
    headLabel,
    title,
    subtitle,
    Content,
    Action,
    minWidth = 200
}: CardTemplateParams) => {
    return (
        <Card sx={{ minWidth }}>
            <CardContent>
                { headLabel && (
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        { headLabel }
                    </Typography>
                )}

                { title && (
                    <Typography
                        variant="h5"
                        component="div"
                    >
                        { title }
                    </Typography>
                )}

                { subtitle && (
                    <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                    >
                        { subtitle }
                    </Typography>
                )}

                {
                    Content
                }
            </CardContent>

            {
                Action && (
                    <CardActions>
                        { Action }
                    </CardActions>
                )
            }
        </Card>
    );
};

export default CardTemplate;