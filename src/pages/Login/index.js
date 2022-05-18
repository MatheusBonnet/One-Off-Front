import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../global.css';
import logo from '../../assets/arteLogin.png';
import api from '../../services/api';

export default function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const history = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            cpf,
            password,
        };

        try {
            const response = await api.post('login', data);

            localStorage.setItem('accessToken', response.data);

            history.push('/doacoes')
        } catch (err) {
            alert('Insira os dados corretamente e tente novamente!!!');
        }
    };

    return (
        <body>
            <main>
                <div class="container-login">
                    <img class="arteLogin" src={logo} alt="OneOff"></img>

                    <form class="formulario-login" onSubmit={login}>
                        <h3 class="titulo-campo-login">CPF</h3>
                        <input class="campo-login" id="user" type="text" placeholder="CPF"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                        />

                        <h3 class="titulo-campo-login">SENHA</h3>
                        <input class="campo-login" id="senha" type="password" name="senha" placeholder="Senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button class="btn-login" type="submit">ENTRAR</button>
                    </form>
                </div>
            </main>
        </body>
    )
}
