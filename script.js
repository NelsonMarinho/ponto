function calcularHoras() {
    const entrada = new Date(document.getElementById('entrada').value);
    const saidaAlmoco = new Date(document.getElementById('saidaAlmoco').value);
    const retornoAlmoco = new Date(document.getElementById('retornoAlmoco').value);
    const saida = new Date(document.getElementById('saida').value);

    if (isNaN(entrada) || isNaN(saidaAlmoco) || isNaN(retornoAlmoco) || isNaN(saida)) {
        alert('Por favor, preencha todos os campos de horário.');
        return;
    }

    const msPorHora = 1000 * 60 * 60;
    const primeiroTurno = (saidaAlmoco - entrada) / msPorHora;
    const segundoTurno = (saida - retornoAlmoco) / msPorHora;
    const totalHoras = primeiroTurno + segundoTurno;

    document.getElementById('horasPrimeiroTurno').innerText = formatarHoras(primeiroTurno);
    document.getElementById('horasSegundoTurno').innerText = formatarHoras(segundoTurno);
    document.getElementById('totalHoras').innerText = formatarHoras(totalHoras);

    const horasNormais = 7 + 20 / 60; // 7 horas e 20 minutos
    const bancoHoras = totalHoras - horasNormais;
    document.getElementById('bancoHoras').innerText = formatarHoras(bancoHoras);

    const mensagem = document.getElementById('mensagem');
    mensagem.innerHTML = ''; // Limpar mensagem anterior

    if (bancoHoras < 0) {
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert">Você ficará com saldo negativo de ${formatarHoras(bancoHoras)} no banco de horas.</div>`;
    } else if (bancoHoras <= 1 + 58 / 60) {
        mensagem.innerHTML = `<div class="alert alert-warning" role="alert">Você ainda pode bater o ponto.</div>`;
    } else {
        mensagem.innerHTML = `<div class="alert alert-success" role="alert">Você está gerando ${formatarHoras(bancoHoras)} horas extras.</div>`;
    }
}

function formatarHoras(decimalHoras) {
    const horas = Math.floor(Math.abs(decimalHoras));
    const minutos = Math.round((Math.abs(decimalHoras) - horas) * 60);
    const sinal = decimalHoras < 0 ? "-" : "";
    return `${sinal}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
}
