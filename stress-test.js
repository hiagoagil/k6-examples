import http from 'k6/http';
import { check, sleep } from 'k6';

// Configurações de Estresse
export let options = {
    stages: [
        { duration: '1m', target: 100 }, // Sobe para 100 usuários em 1 minuto
        { duration: '2m', target: 200 }, // Mantém 200 usuários por 2 minutos
        { duration: '1m', target: 300 }, // Aumenta para 300 usuários em 1 minuto
        { duration: '1m', target: 0 },   // Reduz a 0 usuários
    ],
};

export default function () {
    let url = 'https://serverest.dev/login';

    let payload = JSON.stringify({
        email: 'fulano@qa.com',
        password: 'teste',
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    // Verifica se o status de resposta é 200
    check(res, {
        'status é 200': (r) => r.status === 200,
    });

    sleep(1);  // Pausa de 1 segundo entre as requisições
}