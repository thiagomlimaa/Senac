$(document).ready(function() {
  const statusCiclo = ['Em Análise', 'Aguardando Peças', 'Pronto'];

  // Atualiza o estilo conforme o texto do status
  function atualizarStatus(statusBox, novoStatus) {
    statusBox.removeClass('status-verde status-vermelho status-amarelo');

    switch (novoStatus) {
      case 'Em Análise':
        statusBox.addClass('status-vermelho').text('Em Análise');
        break;
      case 'Aguardando Peças':
        statusBox.addClass('status-amarelo').text('Aguardando Peças');
        break;
      case 'Pronto':
        statusBox.addClass('status-verde').text('Pronto');
        break;
    }
  }

  // Botão de mudar status
  $('.mudar-status').on('click', function() {
    const card = $(this).closest('.os-card');
    const statusBox = card.find('.os-status');
    const statusAtual = statusBox.text().trim();

    let proximoStatusIndex = (statusCiclo.indexOf(statusAtual) + 1) % statusCiclo.length;
    const novoStatus = statusCiclo[proximoStatusIndex];

    atualizarStatus(statusBox, novoStatus);

    // Feedback visual
    alert(`✅ Status alterado para: ${novoStatus}`);
  });

  // Botão de editar (simulação)
  $('.editar-os').on('click', function() {
    const codigo = $(this).closest('.os-card').find('h5 b').text();
    alert(`📝 Editando ordem de serviço: ${codigo}`);
  });

  // Botão de excluir
  $('.excluir-os').on('click', function() {
    if (confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
      $(this).closest('.os-card').fadeOut(400, function() {
        $(this).remove();
      });
    }
  });
});
