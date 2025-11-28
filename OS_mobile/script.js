// Dados das Ordens de Serviço
let ordensServico = [
    {
        numero: '#OS0001',
        cliente: 'cwe',
        aparelho: 'verc',
        problema: 'ecwerecwrc',
        status: 'Aguardando',
        prioridade: 'Urgente',
        data: '28/10/2025',
        prazo: '10/07/2026'
    }
];

// Filtros ativos
let filtrosAtivos = {
    status: '',
    prioridade: '',
    periodo: 'todas'
};

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    atualizarEstatisticas();
    renderizarTabela();
    renderizarMobileCards();
    setDataAtual();
});

// Definir data atual no campo de data
function setDataAtual() {
    const hoje = new Date().toISOString().split('T')[0];
    const dataInput = document.getElementById('data');
    if (dataInput) {
        dataInput.value = hoje;
    }
}

// Carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('ordensServico');
    if (dadosSalvos) {
        ordensServico = JSON.parse(dadosSalvos);
    }
}

// Salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('ordensServico', JSON.stringify(ordensServico));
}

// Atualizar estatísticas
function atualizarEstatisticas() {
    const total = ordensServico.length;
    const aguardando = ordensServico.filter(os => os.status === 'Aguardando').length;
    const emReparo = ordensServico.filter(os => os.status === 'Em Reparo').length;
    
    // Calcular atrasadas (prazo menor que hoje)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const atrasadas = ordensServico.filter(os => {
        const prazo = converterData(os.prazo);
        return prazo < hoje && os.status !== 'Concluído';
    }).length;

    document.getElementById('totalOS').textContent = total;
    document.getElementById('aguardando').textContent = aguardando;
    document.getElementById('emReparo').textContent = emReparo;
    document.getElementById('atrasadas').textContent = atrasadas;
}

// Converter data de DD/MM/YYYY para objeto Date
function converterData(dataStr) {
    const partes = dataStr.split('/');
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

// Formatar data de YYYY-MM-DD para DD/MM/YYYY
function formatarData(dataStr) {
    if (dataStr.includes('/')) return dataStr;
    const partes = dataStr.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Renderizar tabela desktop
function renderizarTabela() {
    const tbody = document.getElementById('tableBody');
    const dadosFiltrados = aplicarFiltrosNoDados();
    
    tbody.innerHTML = '';
    
    dadosFiltrados.forEach((os, index) => {
        const indexReal = ordensServico.indexOf(os);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${os.numero}</strong></td>
            <td>${os.cliente}</td>
            <td><span class="device-badge">📱</span>${os.aparelho}</td>
            <td>${os.problema}</td>
            <td><span class="badge ${os.status.toLowerCase().replace(' ', '-')}">${os.status}</span></td>
            <td><span class="badge ${os.prioridade.toLowerCase()}">${os.prioridade}</span></td>
            <td>${os.data}</td>
            <td>${os.prazo}</td>
            <td>
                <div class="actions">
                    <button class="action-btn view" onclick="visualizarOS(${indexReal})" title="Visualizar">👁️</button>
                    <button class="action-btn edit" onclick="editarOS(${indexReal})" title="Editar">✏️</button>
                    <button class="action-btn delete" onclick="excluirOS(${indexReal})" title="Excluir">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    atualizarTextoExibicao(dadosFiltrados.length);
}

// Renderizar cards mobile
function renderizarMobileCards() {
    const container = document.getElementById('mobileCards');
    const dadosFiltrados = aplicarFiltrosNoDados();
    
    container.innerHTML = '';
    
    dadosFiltrados.forEach((os, index) => {
        const indexReal = ordensServico.indexOf(os);
        const card = document.createElement('div');
        card.className = 'order-card';
        card.innerHTML = `
            <div class="order-card-header">
                <div class="order-number">${os.numero}</div>
                <div class="order-badges">
                    <span class="badge ${os.status.toLowerCase().replace(' ', '-')}">${os.status}</span>
                </div>
            </div>
            <div class="order-info">
                <div class="info-row">
                    <span class="info-label">Cliente:</span>
                    <span class="info-value">${os.cliente}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Aparelho:</span>
                    <span class="info-value">📱 ${os.aparelho}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Problema:</span>
                    <span class="info-value">${os.problema}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Prioridade:</span>
                    <span class="info-value"><span class="badge ${os.prioridade.toLowerCase()}">${os.prioridade}</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${os.data}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Prazo:</span>
                    <span class="info-value">${os.prazo}</span>
                </div>
            </div>
            <div class="order-actions">
                <button class="action-btn view" onclick="visualizarOS(${indexReal})" title="Visualizar">👁️</button>
                <button class="action-btn edit" onclick="editarOS(${indexReal})" title="Editar">✏️</button>
                <button class="action-btn delete" onclick="excluirOS(${indexReal})" title="Excluir">🗑️</button>
            </div>
        `;
        container.appendChild(card);
    });

    atualizarTextoExibicao(dadosFiltrados.length);
}

// Aplicar filtros nos dados
function aplicarFiltrosNoDados() {
    let dados = [...ordensServico];

    // Filtro de status
    if (filtrosAtivos.status) {
        dados = dados.filter(os => os.status === filtrosAtivos.status);
    }

    // Filtro de prioridade
    if (filtrosAtivos.prioridade) {
        dados = dados.filter(os => os.prioridade === filtrosAtivos.prioridade);
    }

    // Filtro de período
    if (filtrosAtivos.periodo !== 'todas') {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        dados = dados.filter(os => {
            const dataOS = converterData(os.data);

            if (filtrosAtivos.periodo === 'hoje') {
                return dataOS.toDateString() === hoje.toDateString();
            } else if (filtrosAtivos.periodo === 'semana') {
                const inicioSemana = new Date(hoje);
                inicioSemana.setDate(hoje.getDate() - hoje.getDay());
                const fimSemana = new Date(inicioSemana);
                fimSemana.setDate(inicioSemana.getDate() + 6);
                return dataOS >= inicioSemana && dataOS <= fimSemana;
            }
            return true;
        });
    }

    return dados;
}

// Aplicar filtros
function aplicarFiltros() {
    filtrosAtivos.status = document.getElementById('filterStatus').value;
    filtrosAtivos.prioridade = document.getElementById('filterPrioridade').value;
    renderizarTabela();
    renderizarMobileCards();
}

// Filtrar por período
function filtrarPeriodo(periodo) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Adicionar classe active ao botão clicado
    event.target.classList.add('active');

    filtrosAtivos.periodo = periodo;
    renderizarTabela();
    renderizarMobileCards();
}

// Limpar filtros
function limparFiltros() {
    filtrosAtivos = {
        status: '',
        prioridade: '',
        periodo: 'todas'
    };

    document.getElementById('filterStatus').value = '';
    document.getElementById('filterPrioridade').value = '';

    // Resetar botões de período
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn').classList.add('active'); }