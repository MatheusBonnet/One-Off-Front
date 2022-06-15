//Libs
import React, { useState, useEffect } from "react";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {BsFileEarmarkPdfFill} from 'react-icons/bs'

//Components
import Header from "../components/Header";

//Static
import "../static/css/index.css";

//Services
import api from '../services/api'

function RelatorioPonto() {


    const accessToken = localStorage.getItem('accessToken');
    const [pontos, setPontos] = useState([]);
    const [busca, setBusca] = useState('');


    
    useEffect(() => {
        api.get('api/v1/ponto/user',{
        headers: {
            Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setPontos(response.data)
            console.log(response.data)
        })
    }, []);


    function geraPdf() {

        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const reportTitle = [
            {
                text: 'Pontos',
                fontSize: 15,
                bold: true,
                margin: [15,20,0,45]
            }
        ];

        const dados = pontos.map((ponto) => {
            return [
                    {text: ponto.date, fontSize: 9, margin: [0,2,0,2]},
                    {text: ponto.horasEntrada, fontSize: 9, margin: [0,2,0,2]},
                    {text: ponto.horaSaida, fontSize: 9, margin: [0,2,0,2]},
                    {text: ponto.descricao, fontSize: 9, margin: [0,2,0,2]}
                ]
        });

        const details = [
            {
                table:{
                    headerRows: 1,
                    widths: ['*','*','*','*'],
                    body:[
                        [
                            {text: 'Data', style: 'tableHeader', fontSize: 10},
                            {text: 'Entrada', style: 'tableHeader', fontSize: 10},
                            {text: 'Saida', style: 'tableHeader', fontSize: 10},
                            {text: 'Descricao', style: 'tableHeader', fontSize: 10}
                        ],
                        ...dados
                    ]
                },
                layout: 'lightHorizontalLines'
            }
        ];
        
        

        const docDefinitons = {
            pageSize: 'A4',
            pageMargins: [15,50,15, 40],
            header: [reportTitle],
            content: [details],
            footer: rodape 
        }

        pdfMake.createPdf(docDefinitons).download();



    }

    function rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                aligment: 'right',
                fontSize: 9,
                margin: [0,10,20,0]
            }
        ]
    };

    return (
        <div>
            <Header />

            <main>

                <div class="div-controla">

                    <h2 class="titulo-controla">Relatório ponto</h2>
                    <div class="div-pesquisa">
                        <h3>Filtrar:</h3>
                        <input class="busca-relatorio" value={busca} onChange={(ev) => setBusca(ev.target.value)}
                        type="date"/>
                        <h3> Gerar Pdf:</h3>
                        <button id="pdf" type="button" onClick={geraPdf}>
                            <BsFileEarmarkPdfFill/>
                        </button>

                    </div>


                    <table class="box-relatorio">
                        <thead>
                            <tr scope="row">
                                <th>Dia</th>
                                <th>Entrada</th>
                                <th>Saída</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody id="dados">
                            {pontos.map(ponto =>
                            <tr key={ponto.id}>
                                <td>{ponto.date}</td>
                                <td>{ponto.horasEntrada}</td>
                                <td>{ponto.horaSaida}</td>
                                <td>{ponto.descricao}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                

            </main>

        </div>

    );
}

export default RelatorioPonto;