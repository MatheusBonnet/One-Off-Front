//Libs
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//Components
import Header from "../components/Header";

//Services
import api from '../services/api'

//Static
import "../static/css/style.css";

//Validacao
const validacaoPonto = yup.object().shape({
    data: yup.string().required("A data é obritória!"),
    entrada: yup.string().required("A entrada é obritória!"),
    saida: yup.string().required("A saída é obritória!"),
    descricao: yup.string().required("A descrição é obritória!").min(50, "Minimo de carateres 50"),
});

function InserePonto() {

    const [dia, setDia] = useState('');
    const [horaEntrada, setHoraEntrada] = useState('');
    const [horaSaida, setHoraSaida] = useState('');
    const [descricao, setDescricao] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    async function inserePonto(e){
        e.preventDefault();

        const data = {
            dia,
            horaEntrada,
            horaSaida,
            descricao
        };

        try {
            await api.post("api/v1/ponto", data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            alert("Inserido com sucesso!!!")
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacaoPonto)
    });


    return (
        <div>
            <Header />
            
            <main>

                <div class="div-controla">

                    <h2 class="titulo-controla">Insira seu ponto</h2>

                    <form onSubmit={inserePonto} class="formulario-ponto">
                        <h3 class="titulo-campo-ponto">Data</h3>
                        <input class="campo-ponto" name="data" type="date" {...register("dia")}
                        value={dia} onChange={e => setDia(e.target.value)} /><br />
                        <p className="erro-mensagem">{errors.data?.message}</p>

                        <h3 class="titulo-campo-ponto">Entrada</h3>
                        <input class="campo-ponto" name="entrada" type="time" {...register("horaEntrada")}
                        value={horaEntrada} onChange={e => setHoraEntrada(e.target.value)} /><br />
                        <p className="erro-mensagem">{errors.entrada?.message}</p>

                        <h3 class="titulo-campo-ponto">Saída</h3>
                        <input class="campo-ponto" name="saida" type="time" {...register("horaSaida")}
                        value={horaSaida} onChange={e => setHoraSaida(e.target.value)}/><br />
                        <p className="erro-mensagem">{errors.saida?.message}</p>

                        <h3 class="titulo-campo-ponto">Descrição</h3>
                        <input class="campo-ponto" name="descricao" type="text" {...register("descricao")} maxlength="200"
                        value={descricao} onChange={e => setDescricao(e.target.value)} /><br />
                        <p className="erro-mensagem">{errors.descricao?.message}</p>
                        
                        <input class="btn-ponto" type="submit" id="btn-cad" value="INSERIR PONTO" />
                    </form>
                    
                </div>

            </main>

        </div>

    );
}

export default InserePonto;