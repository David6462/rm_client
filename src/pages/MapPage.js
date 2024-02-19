import React, { useEffect, useState } from 'react';
import ContentPage from '../components/ContentPage';
import MapContent from '../components/MapContent';
import DivLoading from "../components/DivLoading";

function MapPage(){
    const [data, setData] = useState([]);

    useEffect(async () => {
        await loadEpisodes();
    }, []);

    async function loadEpisodes(){
        setData([]);

        let page = 1;
        let arrayData = [];
        let url = `http://localhost:7000/episodes`;

        while (true){
            let jsonRslt = await fetch(`${url}?page=${page}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .catch(err => {console.log({err})});

            arrayData = [...arrayData, ...jsonRslt.results];

            if (jsonRslt.info.next !== null) {
                page++;
            } else {
                break;
            }
        }

        setData(arrayData);

        console.log(arrayData);
    }

    return(
        data.length === 0 ? (
            <DivLoading />
        ) : (
            <ContentPage>
                <legend className='pb-2'>Mapa de calor</legend>
                <MapContent data={data}></MapContent>
            </ContentPage>
        )
    );
}

export default MapPage;