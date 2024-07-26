document.addEventListener("DOMContentLoaded", function() {
    setDefaultDates();
});

function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataEntrada').value = today;
    document.getElementById('dataSaidaAlmoco').value = today;
    document.getElementById('dataRetornoAlmoco').value = today;
    document.getElementById('dataSaida').value = today;
}

function calcularHoras() {
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaidaAlmoco = document.getElementById('dataSaidaAlmoco').value;
    const dataRetornoAlmoco = document.getElementById('dataRetornoAlmoco').value;
    const dataSaida = document.getElementById('dataSaida').value;

    const horaEntrada = document.getElementById('horaEntrada').value;
    const horaSaidaAlmoco = document.getElementById('horaSaidaAlmoco').value;
    const horaRetornoAlmoco = document.getElementById('horaRetornoAlmoco').value;
    const horaSaida = document.getElementById('horaSaida').value;

    if (!horaEntrada || !horaSaidaAlmoco || !horaRetornoAlmoco || !horaSaida) {
        alert('Por favor, preencha todos os campos de horário.');
        return;
    }

    const entrada = new Date(`${dataEntrada}T${horaEntrada}`);
    const saidaAlmoco = new Date(`${dataSaidaAlmoco}T${horaSaidaAlmoco}`);
    const retornoAlmoco = new Date(`${dataRetornoAlmoco}T${horaRetornoAlmoco}`);
    const saida = new Date(`${dataSaida}T${horaSaida}`);

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
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Você ficará com saldo negativo de ${formatarHoras(bancoHoras)} no banco de horas.</div>`;
    } else if (bancoHoras <= 1 + 58 / 60) {
        mensagem.innerHTML = `<div class="alert alert-warning" role="alert"><i class="fas fa-exclamation-triangle"></i> Você ainda pode bater o ponto.</div>`;
    } else {
        mensagem.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fas fa-exclamation-triangle"></i> Você está gerando ${formatarHoras(bancoHoras)} horas extras.</div>`;
    }
}

function formatarHoras(decimalHoras) {
    const horas = Math.floor(Math.abs(decimalHoras));
    const minutos = Math.round((Math.abs(decimalHoras) - horas) * 60);
    const sinal = decimalHoras < 0 ? "-" : "";
    return `${sinal}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;
}
