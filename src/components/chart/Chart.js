import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale
} from 'chart.js';
/* Components */
import {
    Bar,
    Line,
    Pie,
    Radar
} from 'react-chartjs-2';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
/* API */
import ChartAPI from 'services/ChartAPI';

function Chart(props) {
    const [pvpBattles, setPvpBattles] = useState({})
    const [survivedBattles, setSurvivedBattles] = useState({})
    const [winLossRatio, setWinLossRatio] = useState({})
    const [goozombies, setGoozombies] = useState([])
    const [goodNotBest, setGoodNotBest] = useState([])

    const { battlesPlayedPVP = [], playerFullName = [] } = pvpBattles
    const { battlesSurvived = [], dates = [] } = survivedBattles
    const { winsPVP = [], lossesPVP = [] } = winLossRatio

    useEffect(() => {
        fetchPVPBattles()
        fetchSurvivedBattles()
        fetchWinLossRatio()
        fetchRadarData()
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        ArcElement,
        BarElement,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        RadialLinearScale,
    );

    const fetchPVPBattles = async () => {
        try {
            const { data: result } = await ChartAPI.PVPBattles()
            const battlesPlayedPVP = []
            const playerFullName = []

            for (let account in result) {
                battlesPlayedPVP.push(result[account]["statistics"]["pvp"]["battles"]);
                playerFullName.push(`player: ${result[account]["nickname"]}`);
            }

            setPvpBattles({
                battlesPlayedPVP,
                playerFullName,
            })
        } catch (error) {
            console.log("fetchPVPBattles : ", error);
        }
    }

    const fetchSurvivedBattles = async () => {
        try {
            const { data: result } = await ChartAPI.SurvivedBattles()
            const battlesSurvived = [];
            const dates = [];

            for (let account in result) {
                for (let date in result[account]["pvp"]) {
                    dates.push(date);
                    battlesSurvived.push(result[account]["pvp"][date]["survived_battles"])
                }
            }

            setSurvivedBattles({
                battlesSurvived,
                dates,
            })
        } catch (error) {
            console.log('fetchSurvivedBattles: ', error)
        }
    }

    const fetchWinLossRatio = async () => {
        try {
            const { data: result } = await ChartAPI.WinLossRatio()
            const winsPVP = [];
            const lossesPVP = [];

            for (let account in result) {
                winsPVP.push(result[account]["statistics"]["pvp"]["wins"])
                lossesPVP.push(result[account]["statistics"]["pvp"]["losses"])
            }

            setWinLossRatio({
                winsPVP,
                lossesPVP,
            })

        } catch (error) {
            console.log('fetchWinLossRatio: ', error)
        }
    }

    const fetchRadarData = async () => {
        try {
            const [statsGoozombies, statsGoodNotBest] = await Promise.all([
                ChartAPI.StatsGoozombies(),
                ChartAPI.StatsGoodNotBest(),
            ])
            const { data: goodZombies } = statsGoozombies
            const { data: goodNotBest } = statsGoodNotBest

            const goodZombiesResult = []
            const goodNotBestResult = []

            for (let account in goodZombies) {
                goodZombiesResult.push(goodZombies[account]["statistics"]["pvp"]["main_battery"]["max_frags_battle"])
                goodZombiesResult.push(goodZombies[account]["statistics"]["pvp"]["second_battery"]["max_frags_battle"])
                goodZombiesResult.push(goodZombies[account]["statistics"]["pvp"]["ramming"]["max_frags_battle"])
                goodZombiesResult.push(goodZombies[account]["statistics"]["pvp"]["torpedoes"]["max_frags_battle"])
            }
            for (let account in goodNotBest) {
                goodNotBestResult.push(goodNotBest[account]["statistics"]["pvp"]["main_battery"]["max_frags_battle"])
                goodNotBestResult.push(goodNotBest[account]["statistics"]["pvp"]["second_battery"]["max_frags_battle"])
                goodNotBestResult.push(goodNotBest[account]["statistics"]["pvp"]["ramming"]["max_frags_battle"])
                goodNotBestResult.push(goodNotBest[account]["statistics"]["pvp"]["torpedoes"]["max_frags_battle"])
            }

            setGoozombies(goodZombiesResult)
            setGoodNotBest(goodNotBestResult)
        } catch {

        }
    }

    const barChart = () => {
        const data = {
            labels: playerFullName,
            datasets: [{
                label: 'PVP Battles Played by Player',
                data: battlesPlayedPVP,
                backgroundColor: ["#3B5249", "#519872", "#A4B494", "#BEC5AD"],
                // borderWidth: 1
            }]
        };

        const options = {
            animation: {
                onComplete: () => {
                    let delayed = true
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 1000;
                    }
                    return delay;
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            maintainAspectRatio: false
        }

        return (
            <Grid
                container
                width="100%"
                alignItems="center"
                rowSpacing={2}
            >
                <Grid item xs={3}>
                    <Typography variant='h5' color="#FFFFFF">
                        Battles Fought
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ width: "100%", minHeight: "250px" }}>
                    <Bar
                        options={options}
                        data={data}
                    />
                </Grid>

            </Grid>
        )
    }

    const lineChart = () => {
        const data = {
            labels: dates,
            datasets: [{
                label: 'PVP Battles Survived by Player',
                data: battlesSurvived,
                backgroundColor: '#84B59F',
                borderColor: '#50808E',
                borderWidth: 1
            }]
        };

        const options = {
            scales: {
                y: {
                    ticks: {
                        suggestedMin: 2900
                    }
                }
            },
            // animations: {
            //     tension: {
            //         duration: 3000,
            //         easing: 'linear',
            //         from: 1,
            //         to: 0,
            //         loop: true
            //     }
            // },
            maintainAspectRatio: false
        }

        return (
            <Grid
                container
                width="100%"
                alignItems="center"
                rowSpacing={2}
            >
                <Grid item xs={3}>
                    <Typography variant='h5' color="#FFFFFF">
                        Battles Survived
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ width: "100%", minHeight: "250px" }}>
                    <Line
                        options={options}
                        data={data}
                    />
                </Grid>
            </Grid>
        )
    }

    const pieChart = () => {
        const data = {
            labels: ['Wins', 'Losses'],
            datasets: [{
                label: 'Win/Loss Ratio',
                data: [winsPVP, lossesPVP],
                backgroundColor: ["#DDD8C4", "#50808E"],
            }]
        };

        return (
            <Grid
                container
                width="100%"
                alignItems="center"
                rowSpacing={2}
            >
                <Grid item xs={3}>
                    <Typography variant='h5' color="#FFFFFF">
                        Win/Loss Ratio
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ width: "100%", minHeight: "250px" }}>
                    <Pie
                        data={data}
                        height="300px"
                        options={{ maintainAspectRatio: false }}
                    />
                </Grid>
            </Grid>
        )
    }

    const radarChart = () => {
        const data = {
            labels: ['Main Battery Max Kills', 'Secondary Max Kills', 'Ramming Max Kills', 'Torpedo Max Kills'],
            datasets: [{
                label: 'Goozombies Max kills by type in one battle',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
                data: goozombies
            },
            {
                label: 'Goodbutnotthebest Max kills by type in one battle',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 3,
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                data: goodNotBest
            }]
        }

        const options = {
            scales: {
                r: {
                    grid: {
                        color: "#575758",
                    },
                    ticks: {
                        textStrokeColor: 'rgb(54, 162, 235)',
                        color: 'rgba(240, 240, 240, 0.5)',
                        backdropColor: '#18151D'
                    },
                },
            }
        }

        return (
            <Grid
                container
                width="100%"
                alignItems="center"
                rowSpacing={2}
            >
                <Grid item xs={3}>
                    <Typography variant='h5' color="#FFFFFF">
                        Radar Chart
                    </Typography>
                </Grid>
                <Grid item xs={9} sx={{ width: "100%", minHeight: "250px" }}>
                    <Radar data={data} options={options} />
                </Grid>
            </Grid>
        )
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: "#18151D",
                padding: "60px"
            }}
        >
            <Container maxWidth='lg'>
                {barChart()}
                <Divider light sx={{ margin: "70px 0px", background: "#D0CCD0" }} />
                {lineChart()}
                <Divider light sx={{ margin: "70px 0px", background: "#D0CCD0" }} />
                {pieChart()}
                <Divider light sx={{ margin: "70px 0px", background: "#D0CCD0" }} />
                {radarChart()}
            </Container>
        </div>
    )
}

export default Chart