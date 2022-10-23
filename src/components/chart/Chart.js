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
} from 'chart.js';
/* Components */
import Container from "@mui/material/Container";
import {
    Bar,
    Line,
    Pie,
} from 'react-chartjs-2';
/* API */
import ChartAPI from 'services/ChartAPI';

function Chart(props) {
    const [pvpBattles, setPvpBattles] = useState({})
    const [survivedBattles, setSurvivedBattles] = useState({})
    const [winLossRatio, setWinLossRatio] = useState({})

    const { battlesPlayedPVP = [], playerFullName = [] } = pvpBattles
    const { battlesSurvived = [], dates = [] } = survivedBattles
    const { winsPVP = [], lossesPVP = [] } = winLossRatio

    useEffect(() => {
        fetchPVPBattles()
        fetchSurvivedBattles()
        fetchWinLossRatio()
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
        Legend
    );

    const fetchPVPBattles = async () => {
        try {
            const { data: result } = await ChartAPI.PVPBattles()
            const battlesPlayedPVP = []
            const playerFullName = []

            for (let account in result) {
                battlesPlayedPVP.push(result[account]["statistics"]["pvp"]["battles"]);
                playerFullName.push(result[account]["nickname"]);
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

    const displayBar = () => {
        const data = {
            labels: playerFullName,
            datasets: [{
                label: 'PVP Battles Played by Player',
                data: battlesPlayedPVP,
                backgroundColor: ["red", "blue", "green", "purple"],
                borderColor: 'rgba(255, 26, 104, 1)',
                borderWidth: 1
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
                    beginAtZero: true
                }
            }
        }

        return (
            <Bar
                options={options}
                data={data}
            />
        )
    }

    const displayLine = () => {
        const data = {
            labels: dates,
            datasets: [{
                label: 'PVP Battles Survived by Player',
                data: battlesSurvived,
                backgroundColor: 'rgba(255, 26, 104, 0.2)',
                borderColor: 'rgba(255, 26, 104, 1)',
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
            animations: {
                tension: {
                    duration: 3000,
                    easing: 'linear',
                    from: 1,
                    to: 0,
                    loop: true
                }
            }
        }

        return (
            <Line
                options={options}
                data={data}
            />
        )
    }

    const displayPie = () => {
        const data = {
            labels: ['Wins', 'Losses'],
            datasets: [{
                label: 'Win/Loss Ratio',
                data: [winsPVP, lossesPVP],
                backgroundColor: ["#a9e13e", "#520f0c"],
                borderColor: 'rgba(255, 26, 104, 1)',
                borderWidth: 1
            }]
        };

        return (
            <Pie
                data={data}
            />
        )
    }

    return (
        <Container maxWidth='md'>
            {displayBar()}
            {displayLine()}
            {displayPie()}
        </Container>
    )
}

export default Chart