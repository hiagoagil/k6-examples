import http from 'k6/http';
import { check, sleep } from 'k6';

// Configurações de Carga
export let options = {
    stages: [
        { duration: '1m', target: 50 },  // Sobe para 50 usuários em 1 minuto
        { duration: '3m', target: 50 },  // Mantém 50 usuários por 3 minutos
        { duration: '1m', target: 0 },   // Reduz para 0 usuários
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