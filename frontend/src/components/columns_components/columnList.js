import React from 'react';

import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ColumnList = ({ columns }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Demo>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={0.5}
                >
                    {columns.map((column, index) => {
                        return (
                            <Card sx={{ width: 345 }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {column.columnName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        )
                    })

                    }

                </Stack>
            </Demo>
        </ThemeProvider>
    )
}

export default ColumnList;