import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import DivLoading from './DivLoading';

function MapContent({data}){
    const [firstSeason, setFirstSeason] = useState([]);
    const [secondSeason, setSecondSeason] = useState([]);
    const [thirdSeason, setThirdSeason] = useState([]);
    const [fourthSeason, setFourthSeason] = useState([]);
    const [fifthSeason, setFifthSeason] = useState([]);
    const [processedData, setProcessedData] = useState([]);

    useEffect(async () => {
        data.forEach(episodio => {
            switch (true) {
                case episodio.episode.includes("S01"):
                    setFirstSeason(prevState => [...prevState, episodio]);
                    break;
                case episodio.episode.includes("S02"):
                    setSecondSeason(prevState => [...prevState, episodio]);
                    break;
                case episodio.episode.includes("S03"):
                    setThirdSeason(prevState => [...prevState, episodio]);
                    break;
                case episodio.episode.includes("S04"):
                    setFourthSeason(prevState => [...prevState, episodio]);
                    break;
                case episodio.episode.includes("S05"):
                    setFifthSeason(prevState => [...prevState, episodio]);
                    break;
                default:
                    break;
            }
        });
    }, [data]);

    useEffect(() => {
        let arrayOrden = [];

        // Iterar sobre cada temporada
        [firstSeason, secondSeason, thirdSeason, fourthSeason, fifthSeason].forEach((seasonEpisodes, seasonIndex) => {
            // Inicializar un arreglo para los datos de la temporada actual
            let seasonData = [];

            // Iterar sobre los episodios de la temporada actual
            seasonEpisodes.forEach((episode, episodeIndex) => {
                // Agregar los datos del episodio al arreglo de datos de la temporada actual
                seasonData.push({
                    x: episodeIndex + 1, // +1 para que el índice comience desde 1
                    y: episode.characters.length
                });
            });

            // Agregar los datos de la temporada actual al arreglo principal
            arrayOrden.push({
                name: `Temporada ${seasonIndex + 1}`, // +1 para que la temporada comience desde 1
                data: seasonData
            });
        });

        console.log(arrayOrden);
        setProcessedData(arrayOrden);
    }, [firstSeason, secondSeason, thirdSeason, fourthSeason, fifthSeason])

    let state = {
        options: {
            chart: {
                toolbar: {
                    show: false // Oculta la barra de herramientas del gráfico
                }
            },
            dataLabels: {
                enabled: false // Desactiva las etiquetas de datos
            },
            colors: ["#008FFB"], // Color de los puntos del heatmap
            xaxis: {
                categories: ['Ep 1', 'Ep 2', 'Ep 3', 'Ep 4', 'Ep 5', 'Ep 6', 'Ep 7', 'Ep 8', 'Ep 9', 'Ep 10', 'Ep 11']
            }
        },
        series: processedData
    }


    return (
        <div className="heatmap-chart">
            <ReactApexChart  options={state.options} series={state.series} type="heatmap" height={550} />
        </div>
    );

}

export default MapContent;