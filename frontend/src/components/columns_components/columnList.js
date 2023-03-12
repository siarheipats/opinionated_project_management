import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';


const ColumnList = ({ columns }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={1} wrap="nowrap">
                        {columns.map((column, index) => (
                            <Grid key={index} item>
                                <Paper
                                    sx={{
                                        height: 140,
                                        width: 200,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    <Card sx={{ width: 200 }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="div">

                                                    <Grid container>
                                                        <Grid item>
                                                            <h7>{column.columnName}</h7>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Grid container direction="row-reverse">
                                                                <Grid item>
                                                                    <CloseIcon/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">

                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default ColumnList;