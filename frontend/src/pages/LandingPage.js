import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import GroupIcon from '@mui/icons-material/Group';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const theme = createTheme();

    function goToSignIn() {

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <Box sx={{ flexGrow: 1, pt: 15, alignItems: 'center' }} justifyContent="center" >
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid>
                            <Typography gutterBottom variant="h4" component="div">
                                Software Development Project Management Made Easy
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="h6" >
                                Easily collaborate with your team members on any project, from design to development, with OPM's intuitive Kanban boards.
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link to="/signup">
                                <Button
                                    fullWidth
                                    sx={{ margin: 3, padding: 2 }}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AssignmentIndIcon />}
                                    onClick={() => goToSignIn()}
                                >
                                    Join Now
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, p: 10, alignItems: 'center' }} justifyContent="center" >
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs justifyContent="center">
                            <Card sx={{ maxWidth: 345, alignItems: 'center' }}>
                                <CardContent>
                                    <Avatar sx={{ margin: 1, bgcolor: 'secondary.main', alignItems: 'center' }} justifyContent="center">
                                        <GroupIcon />
                                    </Avatar>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Teamwork made easy
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Easily collaborate with your team members on any project, from design to development, with OPM's intuitive Kanban boards.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs justifyContent="center">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Avatar sx={{ margin: 1, bgcolor: 'secondary.main', alignItems: 'center' }} justifyContent="center">
                                        <AssignmentIcon />
                                    </Avatar>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Organize & Track Tasks
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Manage and track tasks with OPM's easy-to-use Kanban boards, ensuring that all tasks are completed on-time.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs justifyContent="center">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Avatar sx={{ margin: 1, bgcolor: 'secondary.main', alignItems: 'center' }} justifyContent="center">
                                        <FolderSharedIcon />
                                    </Avatar>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Online collaboration
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Work together on projects with team members in real-time with OPM's online collaboration tools.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, pt: 5, alignItems: 'center' }} justifyContent="center" >
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography gutterBottom variant="h5" component="div">
                                Streamline Your Project Management
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" >
                                OPM's intuitive user interface and design makes managing projects easy and efficient.
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LandingPage;