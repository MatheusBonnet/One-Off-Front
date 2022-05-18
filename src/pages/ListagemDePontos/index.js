import React, {useState, useEffect} from 'react';

export default function Pontos(){

    const [ponotos, setPontos] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const nomeUser = sessionStorage.getItem('nome');
    const history = useHistory();


    useEffect(() => {
        api.get('api/v1/ponto' , {
        headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setDoacoes(response.data.content)
        })
    }, []);

}