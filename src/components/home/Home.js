import "./Home.css"
import _ from 'lodash'
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import { LazyLoadImage } from "react-lazy-load-image-component";
/* components */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
/* Icons */
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
/* Constants */
import { Paths } from "constants/general"
/* Assets */
const BackgroundCurve = require("assets/curve_2x.png");
const wowImage = "https://www.cgmagonline.com/wp-content/uploads/2019/07/world-of-warships-legends-review-2.jpg"

const useStyles = makeStyles((theme) => ({
    backgroundCurve: {
        width: "100vw",
        minHeight: "100vh",
        objectFit: "cover",
        opacity: "0.3"
    },
}));

const Ships = [
    {
        name: "The Destroyer",
        desc: "Destroyers are fast and nimble ships armed with small, rapid firing guns and torpedoes. Use torpedoes on large capiital ships like battleships for great damage!",
        image: "https://glossary-wows-global.gcdn.co/icons//vehicle/large/PJSD012_4987da3686b0f43c7522f014d69a9b73fa54ac424750a24104cb27e55f3a9e4a.png",
    },
    {
        name: "The Cruiser",
        desc: "Cruisers generally have decent manuverability and larger caliber guns compared to destoyers that fire slower but do more damage. They are ideal for hunting destroyers and annoying battleships with a constant volume of shellfire.",
        image: "https://global-uploads.webflow.com/5f3b47f17450d701e192bea8/60884e58f2a9a66e806a2b41_wvm5mqk9x2bub6q8kq23uj7x4g2j8tbn.png",
    },
    {
        name: "The Battleship",
        desc: "Slow and as tough as nails, battleships have the armor to withstand shellfire and the punching power to potentially sink cruisers in one salvo. The main bane of battleships are torpedos and arial attack from aircraft carriers. Fight battleships and protect your cruisers.",
        image: "https://wows-wowsp-global.gcdn.co/media/ceph-image/88303178-6c62-11eb-9be1-8cdcd4b147d4.jpg",
    },
    {
        name: "The Aircraft Carrier",
        desc: "Aircraft carriers are the most important class in the game since they can provide intelligence and spotting for the team. With a wide array of armament such as bombs, torpedoes, and rockets, aircraft carriers can strike both cruisers and battleships with ease. Be warned however, they quickly fall under fire when spotted.",
        image: "http://thedailybounce.net/wp-content/uploads/2018/09/453ba394-aa17-11e8-8bd1-ac162d8bc1e4_1200x.jpg",
    },
]

function Home(props) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();

    const goChart = () => {
        navigate(Paths.Chart)
    }

    const Billboard = () => {
        return (
            <Box
                component={"div"}
                position={"fixed"}
                top="0px"
            >
                <LazyLoadImage
                    className={classes.backgroundCurve}
                    alt={"background"}
                    src={wowImage}
                    width={"100vw"}
                    height={"100vh"}
                />
            </Box >
        )
    }

    const HeroBanner = () => {
        return (
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                style={{
                    position: "relative",
                    minHeight: '100vh',
                    color: "white",
                    // backgroundImage: `url(${BackgroundCurve})`,
                    backgroundSize: 'cover',
                    background: "radial-gradient(100% 351.56% at 0% 100%, rgba(23, 21, 28, 0.94) 45%, rgba(23, 21, 28, 0) 90%)",
                    // zIndex: 9999,
                }}
            >
                <Box
                    component={Grid}
                    item
                    xs={12}
                    sm={7}
                    padding='12px'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    minHeight="100vh"
                >
                    <Fade bottom cascade>
                        <Typography variant='h3' style={{ marginBottom: 36 }}>
                            World of Warships
                        </Typography>
                        <Typography variant='h6' textAlign="center" style={{ color: theme.palette.common.white, marginBottom: 60 }}>
                            A strategic online action game with a huge fleet of legendary warships <br />
                            Take charge of differrent classes of ships as you battle it out for supremecy of the seas!
                        </Typography>
                        <Button
                            variant='contained'
                            endIcon={<ArrowRightIcon />}
                            onClick={goChart}
                            sx={{
                                borderRadius: 0,
                                boxShadow: 'none',
                                background: '#7F4FFF',
                                color: "#FFFFFF"
                            }}
                        >
                            Go To Chart
                        </Button>
                    </Fade>
                </Box>
                <Box
                    className="downIcon"
                    position="absolute"
                    top="90vh"
                >
                    <KeyboardDoubleArrowDownIcon />
                </Box>
                {_.map(Ships, (el) => {
                    const { name = "", desc = "", image } = el
                    return (
                        <Grid
                            key={name}
                            item
                            xs={12}
                            sx={{ minHeight: "70vh" }}
                            container
                            alignItems="center"
                        >
                            <Grid xs={4} sx={{ padding: "0px 32px" }}>
                                <Typography variant="h3" textAlign="center" sx={{ marginBottom: "36px" }}>
                                    {name}
                                </Typography>
                                <Typography variant="body2" textAlign="center">
                                   {desc}
                                </Typography>
                            </Grid>
                            <Grid xs={8} sx={{ padding: "0px 32px" }}>
                                <Stack>
                                    <img
                                        src={image}
                                        style={{
                                            width: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center"
                                        }}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    )
                })}

            </Grid>
        )
    }

    const RenderStar = () => {
        return (
            <Box
                position='relative'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                minHeight='100vh'
                maxWidth='100vw'
                overflow='hidden'
            >
                {/* 產星星 */}
                {_.map(Array.from({ length: 20 }, (_, index) => (
                    <>
                        <Box
                            position='absolute'
                            top={`${Math.floor(Math.random() * 30 * 3 + 5)}vh`}
                            left={`${Math.floor(Math.random() * 30 * 3)}vw`}
                            width='3px'
                            height='2px'
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(229, 229, 229, 0.7) 100%)',
                                boxShadow: '0px 0px 4px',
                                opacity: 0.9,
                                borderRadius: 12,
                                transform: 'matrix(-0.98, 0.13, -0.18, -0.99, 0, 0)'
                            }}
                        />
                        <Box
                            position='absolute'
                            top={`${Math.floor(Math.random() * 30 * 3)}vh`}
                            left={`${Math.floor(Math.random() * 30 * 3)}vw`}
                            width='10px'
                            height='10px'
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(229, 229, 229, 0.7) 100%)',
                                boxShadow: '0px 0px 4px',
                                opacity: 0.9,
                                borderRadius: 12,
                                transform: 'matrix(-0.98, 0.13, -0.18, -0.99, 0, 0)'
                            }}
                        />
                        <Box
                            position='absolute'
                            top={`${Math.floor(Math.random() * 30 * 3)}vh`}
                            left={`${Math.floor(Math.random() * 30 * 3)}vw`}
                            width='5px'
                            height='5px'
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, rgba(229, 229, 229, 0.7) 100%)',
                                boxShadow: '0px 0px 4px',
                                opacity: 0.9,
                                borderRadius: 12,
                                transform: 'matrix(-0.98, 0.13, -0.18, -0.99, 0, 0)'
                            }}
                        />
                    </>

                )))}

                {/* 產圓圈 */}
                {_.map(Array.from({ length: 8 }, (_, index) => (
                    <Box
                        position='absolute'
                        top='50%'
                        left='50%'
                        border='1px dashed #8D8D8D'
                        width={`${100 - 15 * index}vh`}
                        height={`${100 - 15 * index}vh`}
                        borderRadius='50%'
                        style={{
                            opacity: 0.3,
                            boxSizing: 'border-box',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                )))}

                {/* 左一紫色 */}
                <Box
                    position='absolute'
                    top='40vh'
                    left='50px'
                    width='20vw'
                    height='20vw'
                    style={{
                        background: 'linear-gradient(180deg, #2603FB 0%, #D661FF 100%)',
                        filter: 'blur(180px)',
                        transform: 'matrix(-0.91, 0.33, -0.44, -0.94, 0, 0)'
                    }}
                />
                {/* 左二綠色 */}
                <Box
                    position='absolute'
                    top='20vh'
                    left='20vw'
                    width='20vw'
                    height='50vh'
                    style={{
                        background: 'linear-gradient(180deg, #03FB75 0%, #06FFF0 100%)',
                        filter: 'blur(300px)',
                        transform: 'matrix(0.84, 0.48, -0.56, 0.86, 0, 0)',
                    }}
                />
                {/* 左三紫色 */}
                <Box
                    position='absolute'
                    top='20vh'
                    left='60vw'
                    width='25vw'
                    height='50vh'
                    style={{
                        background: 'linear-gradient(180deg, #7B61FF 0%, #AA9CFF 100%)',
                        opacity: 0.65,
                        filter: 'blur(200px)',
                        transform: 'matrix(-0.81, -0.54, 0.63, -0.82, 0, 0)',
                    }}
                />
                {/* 左四紫色 */}
                <Box
                    position='absolute'
                    top='20vh'
                    right='-10vw'
                    width='30vw'
                    height='30vh'
                    style={{
                        background: 'linear-gradient(180deg, #7140F3 0%, #1F62EA 100%)',
                        opacity: 0.6,
                        filter: 'blur(353.465px)',
                        transform: 'matrix(-0.91, 0.33, -0.44, -0.94, 0, 0)',
                    }}
                />

                <Fade cascade>
                    <Box
                        component={'div'}
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        zIndex={9999}
                    >
                        {/* Content */}
                        <Typography variant='h3' align='center' style={{ color: theme.palette.common.white, marginBottom: 40 }}>
                            Discover the statistics of WOW.
                            {/* <br />Together we fight. */}
                        </Typography>

                        <Button
                            variant='contained'
                            endIcon={<ArrowRightIcon />}
                            onClick={goChart}
                            sx={{
                                borderRadius: 0,
                                boxShadow: 'none',
                                background: '#7F4FFF',
                                color: "#FFFFF"
                            }}
                        >
                            Let's Go &#128674; &#128674; &#128674;
                        </Button>
                    </Box>
                </Fade>
            </Box >
        )
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: "#000000",
            }}
        >
            {Billboard()}
            {HeroBanner()}
            {RenderStar()}
        </div>
    )
}

export default Home