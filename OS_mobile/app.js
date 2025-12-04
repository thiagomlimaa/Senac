/*
================================================================================
APLICAÇÃO: OS MOBILE - GESTÃO DE ORDENS DE SERVIÇO
DESCRIÇÃO: Sistema completo para gerenciamento de ordens de serviço com autenticação
VERSÃO: 1.0
DATA: 03/12/2025
AUTOR: Sistema de Desenvolvimento Assistido

DEPENDÊNCIAS HMTL:
- Element com ID 'container' (div principal da app)
- Elements de UI: 'tableBody', 'mobileCards', 'modalOS', 'formOS', etc.
- Espera elementos do HTML atual intactos

SEÇÕES DO CÓDIGO:
1. VARIÁVEIS GLOBAIS .......................... Linha 35
2. AUTENTICAÇÃO ............................... Linha 65
3. GERENCIAMENTO DE DADOS ...................... Linha 170
4. INTERFACE DO USUÁRIO ........................ Linha 230
5. UTILITÁRIOS ................................. Linha 450
6. INICIALIZAÇÃO ............................... Linha 520
================================================================================
*/

// ========== 1. VARIÁVEIS GLOBAIS ==========
/*
  Todas as variáveis centrais da aplicação
  - ordensServico: Array principal contendo todas as ordens de serviço
  - filtrosAtivos: Estado dos filtros aplicados na interface
  - usuarioAtual: Objeto do usuário logado ou null
  - Chaves para localStorage
*/

/** @type {Array} Lista principal de todas as ordens de serviço */
let ordensServico = [];

/** @type {Object} Estado atual dos filtros da interface */
let filtrosAtivos = {
    status: '',
    prioridade: '',
    periodo: 'todas'
};

/** @type {Object|null} Usuário atualmente logado */
let usuarioAtual = null;

/** Chave para localStorage das ordens */
const ORDEM_KEY = 'ordensServico';

/** Chave para localStorage dos usuários */
const USUARIOS_KEY = 'usuarios';

// ========== 2. SISTEMA DE AUTENTICAÇÃO ==========
/*
  Controle completo de usuários, login/logout e proteção da interface
  - Cria usuário padrão na primeira execução
  - Modal de login para acesso
  - Persistência de sessão e logout
*/

/**
 * INICIALIZAR AUTENTICAÇÃO
 * Verifica se existem usuários, cria padrão se necessário
 * @returns {void}
 */
function initAuth() {
    carregarUsuarios();
    verificarLogin();
}

/**
 * CARREGAR USUÁRIOS DO LOCALSTORAGE
 * Carrega lista de usuários ou cria usuário padrão
 * @returns {void}
 */
function carregarUsuarios() {
    const usuariosSalvos = localStorage.getItem(USUARIOS_KEY);
    if (!usuariosSalvos) {
        // Criar usuário padrão para demonstração
        const usuariosPadrao = [{
            id: 1,
            nome: 'Admin',
            email: 'admin@exemplo.com',
            senha: hashSenha('admin123'), // Hash simples (não seguro - usar bcrypt no backend)
            role: 'admin'
        }];
        localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuariosPadrao));
    }
}

/**
 * HASH SIMPLES DE SENHA
 * Algoritmo básico para hashing (INSEGURO - só para demo)
 * @param {string} senha - Senha em texto plano
 * @returns {string} Hash numérico como string
 */
function hashSenha(senha) {
    let hash = 0;
    for (let i = 0; i < senha.length; i++) {
        const char = senha.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Manter 32 bits
    }
    return hash.toString();
}

/**
 * VERIFICAR LOGIN
 * Checa se há sessão ativa e controla exibição da app
 * @returns {void}
 */
function verificarLogin() {
    const sessao = localStorage.getItem('sessaoUsuario');
    if (sessao) {
        usuarioAtual = JSON.parse(sessao);
        mostrarApp();
    } else {
        mostrarTelaLogin();
    }
}

/**
 * MOSTRAR TELA DE LOGIN
 * Desabilita app e exibe modal de login
 * @returns {void}
 */
function mostrarTelaLogin() {
    ocultarApp();
    if (!document.getElementById('loginModal')) {
        criarModalLogin();
    }
    document.getElementById('loginModal').classList.add('active');
}

/**
 * OCULTAR APP PRINCIPAL
 * Desabilita interações na interface principal (login required)
 * @returns {void}
 */
function ocultarApp() {
    document.querySelector('.container').style.pointerEvents = 'none';
    document.querySelector('.container').style.opacity = '0.3';
}

/**
 * MOSTRAR APP PRINCIPAL
 * Habilita interações e removes modal de login
 * @returns {void}
 */
function mostrarApp() {
    document.querySelector('.container').style.pointerEvents = 'auto';
    document.querySelector('.container').style.opacity = '1';
    if (document.getElementById('loginModal')) {
        document.getElementById('loginModal').classList.remove('active');
    }
}

/**
 * CRIAR MODAL DE LOGIN DINAMICAMENTE
 * Gera HTML do modal de login se não existir
 * @returns {void}
 */
function criarModalLogin() {
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h2>Login</h2>
                <span class="close-modal" onclick="fecharModalLogin()">×</span>
            </div>
            <form onsubmit="fazerLogin(event)">
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label>Senha</label>
                    <input type="password" id="loginSenha" required>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn btn-save">Entrar</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * FECHAR MODAL DE LOGIN
 * Remove modal do DOM ou oculta
 * @returns {void}
 */
function fecharModalLogin() {
    document.getElementById('loginModal').classList.remove('active');
}

/**
 * FAZER LOGIN
 * Valida credenciais e cria sessão
 * @param {Event} event - Evento do formulário
 * @returns {void}
 */
function fazerLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY)) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === hashSenha(senha));

    if (usuario) {
        usuarioAtual = usuario;
        localStorage.setItem('sessaoUsuario', JSON.stringify(usuario));
        mostrarApp();
        fecharModalLogin();
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

/**
 * FAZER LOGOUT
 * Limpa sessão e retorna ao login
 * @returns {void}
 */
function fazerLogout() {
    usuarioAtual = null;
    localStorage.removeItem('sessaoUsuario');
    mostrarTelaLogin();
}

// ========== 3. GERENCIAMENTO DE DADOS ==========
/*
  CRUD completo das ordens de serviço + localStorage
  - Persistência automática
  - Geração de números únicos
  - Backup/restore de dados
*/

/**
 * CARREGAR DADOS
 * Carrega ordens do localStorage ou usa dados padrão
 * @returns {void}
 */
function carregarDados() {
    const dadosSalvos = localStorage.getItem(ORDEM_KEY);
    if (dadosSalvos) {
        ordensServico = JSON.parse(dadosSalvos);
    } else {
        // Dados iniciais para demonstração
        ordensServico = [
            {
                numero: '#OS0001',
                cliente: 'Cliente Demo',
                aparelho: 'Celular Demo',
                problema: 'Problema demo',
                status: 'Aguardando',
                prioridade: 'Urgente',
                data: '28/10/2025',
                prazo: '10/07/2026'
            }
        ];
    }
}

/**
 * SALVAR DADOS
 * Persiste ordens no localStorage
 * @returns {void}
 */
function salvarDados() {
    localStorage.setItem(ORDEM_KEY, JSON.stringify(ordensServico));
}

// ========== 4. INTERFACE DO USUÁRIO ==========
/*
  Todas as funções de renderização, modais, filtros e interações
  - Renderização condicional desktop/mobile
  - Modais de CRUD das OS
  - Sistema de filtros
*/

/**
 * ATUALIZAR ESTATÍSTICAS
 * Calcula e exibe estatísticas da dashboard
 * @returns {void}
 * @effects Modifica elementos HTML .totalOS, .aguardando, .emReparo, .atrasadas
 */
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

/**
 * CONVERTER DATA STRING PARA DATE
 * Converte "DD/MM/YYYY" para objeto Date
 * @param {string} dataStr - Data no formato brasileiro
 * @returns {Date} Objeto Date
 */
function converterData(dataStr) {
    const partes = dataStr.split('/');
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

/**
 * RENDERIZAR TABELA DESKTOP
 * Gera HTML da tabela principal baseado nos filtros
 * @returns {void}
 * @effects Modifica #tableBody e #showingText
 */
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

/**
 * RENDERIZAR CARDS MOBILE
 * Gera HTML dos cards para telas pequenas
 * @returns {void}
 * @effects Modifica #mobileCards e #showingText
 */
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

/**
 * APLICAR FILTROS NOS DADOS
 * Filtra ordens baseado no estado filtrosAtivos
 * @returns {Array} Array filtrado de ordens
 */
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

/**
 * APLICAR FILTROS
 * Função para onchange dos selects de filtro
 * @returns {void}
 * @effects Chama renderizarTabela e renderizarMobileCards
 */
function aplicarFiltros() {
    filtrosAtivos.status = document.getElementById('filterStatus').value;
    filtrosAtivos.prioridade = document.getElementById('filterPrioridade').value;
    renderizarTabela();
    renderizarMobileCards();
}

/**
 * FILTRAR POR PERÍODO
 * Atualiza filtro de período e re-renderiza
 * @param {string} periodo - 'todas', 'hoje', 'semana'
 * @returns {void}
 * @effects Modifica filtrosAtivos e UI dos botões
 */
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

/**
 * LIMPAR FILTROS
 * Reseta todos os filtros para estado inicial
 * @returns {void}
 * @effects Modifica filtrosAtivos e elementos HTML dos filtros
 */
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
    document.querySelector('.filter-btn').classList.add('active');
}

/**
 * ATUALIZAR TEXTO DE EXIBIÇÃO
 * Atualiza contador "Mostrando X de Y ordens"
 * @param {number} totalMostrado - Número de itens visíveis
 * @returns {void}
 * @effects Modifica #showingText
 */
function atualizarTextoExibicao(totalMostrado) {
    const texto = `Mostrando ${totalMostrado} de ${ordensServico.length} ordens de serviço`;
    document.getElementById('showingText').textContent = texto;
}

/**
 * DEFINIR DATA ATUAL NO CAMPO
 * Seta data atual como valor padrão no input de data
 * @returns {void}
 * @effects Modifica #data
 */
function setDataAtual() {
    const hoje = new Date().toISOString().split('T')[0];
    const dataInput = document.getElementById('data');
    if (dataInput) {
        dataInput.value = hoje;
    }
}

// MODAIS E FORMULÁRIO

/**
 * ABRIR MODAL PARA NOVA O.S
 * Prepara e abre modal para criação de nova OS
 * @returns {void}
 * @effects Modifica #modalOS, #modalTitle, #editIndex
 */
function abrirModalNova() {
    resetarFormulario();
    document.getElementById('editIndex').value = '';
    document.getElementById('modalTitle').textContent = 'Nova Ordem de Serviço';
    document.getElementById('modalOS').classList.add('active');
}

/**
 * FECHAR MODAL
 * Fecha modal e limpa formulário
 * @returns {void}
 * @effects Modifica #modalOS
 */
function fecharModal() {
    document.getElementById('modalOS').classList.remove('active');
    resetarFormulario();
}

/**
 * RESETAR FORMULÁRIO
 * Limpa todos os campos do formulário
 * @returns {void}
 * @effects Modifica #formOS
 */
function resetarFormulario() {
    document.getElementById('formOS').reset();
    setDataAtual();
}

/**
 * SALVAR ORDEM DE SERVIÇO
 * Processa formulário e salva/edita OS
 * @param {Event} event - Evento do submit do form
 * @returns {void}
 * @effects Modifica ordensServico, localStorage, UI
 */
function salvarOS(event) {
    event.preventDefault();

    console.log('salvarOS chamado');

    const index = document.getElementById('editIndex').value;
    console.log('index:', index);

    const formData = new FormData(document.getElementById('formOS'));
    const cliente = formData.get('cliente');
    const aparelho = formData.get('aparelho');
    const problema = formData.get('problema');
    const status = formData.get('status');
    const prioridade = formData.get('prioridade');
    const data = formData.get('data');
    const prazo = formData.get('prazo');

    console.log('formData:', { cliente, aparelho, problema, status, prioridade, data, prazo });

    // Validações básicas
    if (!cliente || !aparelho || !problema || !status || !prioridade) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (!data || !prazo) {
        alert('Por favor, selecione datas válidas para início e prazo.');
        return;
    }

    const os = {
        numero: index ? ordensServico[parseInt(index)].numero : gerarNumeroOS(),
        cliente,
        aparelho,
        problema,
        status,
        prioridade,
        data: formatarData(data),
        prazo: formatarData(prazo)
    };

    console.log('os criado:', os);

    if (index && index !== '') {
        ordensServico[parseInt(index)] = os;
        console.log('OS editada no index', index);
    } else {
        ordensServico.push(os);
        console.log('Nova OS adicionada, total:', ordensServico.length);
    }

    console.log('ordensServico atual:', ordensServico);

    salvarDados();
    console.log('Salvo no localStorage');

    atualizarEstatisticas();
    console.log('Estatísticas atualizadas');

    // Limpar filtros para garantir visibilidade
    limparFiltros();
    console.log('Filtros limpos');

    renderizarTabela();
    renderizarMobileCards();
    console.log('UI renderizada');

    fecharModal();
    console.log('Modal fechado');

    alert('Ordem de Serviço salva com sucesso!');
}

/**
 * EDITAR ORDEM DE SERVIÇO
 * Abre modal preenchido para edição da OS selecionada
 * @param {number} index - Índice da OS em ordensServico
 * @returns {void}
 * @effects Preenche form e abre modal
 */
function editarOS(index) {
    const os = ordensServico[index];
    document.getElementById('editIndex').value = index.toString();
    document.getElementById('cliente').value = os.cliente;
    document.getElementById('aparelho').value = os.aparelho;
    document.getElementById('problema').value = os.problema;
    document.getElementById('status').value = os.status;
    document.getElementById('prioridade').value = os.prioridade;
    document.getElementById('data').value = converterDataISO(os.data);
    document.getElementById('prazo').value = converterDataISO(os.prazo);
    document.getElementById('modalTitle').textContent = 'Editar Ordem de Serviço';
    document.getElementById('modalOS').classList.add('active');
}

/**
 * VISUALIZAR ORDEM DE SERVIÇO
 * Exibe dados da OS em popup readonly
 * @param {number} index - Índice da OS em ordensServico
 * @returns {void}
 * @effects Mostra alert com dados formatados
 */
function visualizarOS(index) {
    const os = ordensServico[index];
    const mensagem = `
Número: ${os.numero}
Cliente: ${os.cliente}
Aparelho: ${os.aparelho}
Problema: ${os.problema}
Status: ${os.status}
Prioridade: ${os.prioridade}
Data: ${os.data}
Prazo: ${os.prazo}
    `;
    alert(mensagem);
}

/**
 * EXCLUIR ORDEM DE SERVIÇO
 * Remove OS após confirmação
 * @param {number} index - Índice da OS em ordensServico
 * @returns {void}
 * @effects Modifica ordensServico, localStorage, UI
 */
function excluirOS(index) {
    if (confirm('Tem certeza que deseja excluir esta Ordem de Serviço?')) {
        ordensServico.splice(index, 1);
        salvarDados();
        atualizarEstatisticas();
        renderizarTabela();
        renderizarMobileCards();
        alert('Ordem de Serviço excluída com sucesso!');
    }
}

// ========== 5. UTILITÁRIOS ==========
/*
  Funções auxiliares para formatação, conversão e operações comuns
*/

/**
 * GERAR NÚMERO ÚNICO DE OS
 * Cria número sequencial baseado no total atual
 * @returns {string} Número formatado #OSXXXX
 * @example gerarNumeroOS() => "#OS0005"
 */
function gerarNumeroOS() {
    const numero = ordensServico.length + 1;
    return `#OS${String(numero).padStart(4, '0')}`;
}

/**
 * FORMATAR DATA PARA BRASIL
 * Converte YYYY-MM-DD para DD/MM/YYYY com proteções contra valores inválidos
 * @param {string} dataStr - Data no formato ISO ou brasileiro
 * @returns {string} Data no formato brasileiro ou data atual se inválida
 */
function formatarData(dataStr) {
    // Proteção contra valores nulos, undefined ou não-string
    if (!dataStr || typeof dataStr !== 'string' || dataStr.length === 0) {
        // Fallback: data atual formatada
        const hoje = new Date();
        return hoje.toLocaleDateString('pt-BR');
    }

    if (dataStr.includes('/')) return dataStr; // Já está formatado

    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr; // Retorna como está se formato estranho

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/**
 * CONVERTER DATA PARA FORMATO ISO
 * Converte DD/MM/YYYY para YYYY-MM-DD
 * @param {string} dataStr - Data no formato brasileiro
 * @returns {string} Data no formato ISO
 */
function converterDataISO(dataStr) {
    const partes = dataStr.split('/');
    return `${partes[2]}-${partes[1].padStart(2,'0')}-${partes[0].padStart(2,'0')}`;
}

/**
 * EXPORTAR DADOS PARA CSV
 * Baixa arquivo CSV com dados filtrados
 * @returns {void}
 * @effects Cria download automático
 */
function exportarDados() {
    const dados = aplicarFiltrosNoDados();
    const csv = converterParaCSV(dados);
    downloadArquivo(csv, 'ordens_servico.csv', 'text/csv');
}

/**
 * CONVERTER ARRAY PARA CSV
 * Formata dados das OS para formato CSV
 * @param {Array} dados - Array de objetos OS
 * @returns {string} Conteúdo CSV
 */
function converterParaCSV(dados) {
    if (dados.length === 0) return 'Nenhum dado encontrado';

    const headers = ['Número', 'Cliente', 'Aparelho', 'Problema', 'Status', 'Prioridade', 'Data', 'Prazo'];
    const linhas = dados.map(os => [
        os.numero,
        os.cliente,
        os.aparelho,
        os.problema,
        os.status,
        os.prioridade,
        os.data,
        os.prazo
    ]);

    let csv = headers.join(',') + '\n';
    linhas.forEach(linha => {
        csv += linha.map(campo => `"${campo}"`).join(',') + '\n';
    });

    return csv;
}

/**
 * DOWNLOAD DE ARQUIVO
 * Utilitário para baixar blobs no navegador
 * @param {string} conteudo - Conteúdo do arquivo
 * @param {string} nomeArquivo - Nome sugerido para download
 * @param {string} tipoMime - MIME type do arquivo
 * @returns {void}
 * @effects Cria link temporário e inicia download
 */
function downloadArquivo(conteudo, nomeArquivo, tipoMime) {
    const blob = new Blob([conteudo], { type: tipoMime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ========== 6. INICIALIZAÇÃO ==========
/*
  Funções de startup e event listeners
  - Executado quando DOM está pronto
  - Carrega dados e UI inicial
  - Define listeners de eventos
*/

/**
 * INICIALIZAR APLICAÇÃO
 * Função principal chamada no DOMContentLoaded
 * Carrega dados, configura UI e inicia auth
 * @returns {void}
 * @effects Configura toda a aplicação
 */
function initApp() {
    console.log('Inicializando app OS Mobile...');

    carregarDados();        // Carregar dados do localStorage
    atualizarEstatisticas(); // Calcular e mostrar stats
    renderizarTabela();     // Montar tabela desktop
    renderizarMobileCards(); // Montar cards mobile
    setDataAtual();         // Definir data atual no form
    initAuth();             // Verificar login/autenticação

    console.log('App inicializada com sucesso');
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initApp);
