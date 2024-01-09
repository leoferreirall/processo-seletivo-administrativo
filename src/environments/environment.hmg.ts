const linguagemTabela = {
  sEmptyTable: "Nenhum registro encontrado",
  sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
  sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
  sInfoFiltered: "(Filtrados de _MAX_ registros)",
  sInfoPostFix: "",
  sInfoThousands: ".",
  sLengthMenu: "_MENU_ resultados por página",
  sLoadingRecords: "Carregando...",
  sProcessing: "Processando...",
  sZeroRecords: "Nenhum registro encontrado",
  sSearch: "Pesquisar:",
  oPaginate: {
    sNext: "Próximo",
    sPrevious: "Anterior",
    sFirst: "Primeiro",
    sLast: "Último"
  },
  oAria: {
    sSortAscending: ": Ordenar colunas de forma ascendente",
    sSortDescending: ": Ordenar colunas de forma descendente"
  }
}

export const environment = {
  production: false,

  urlApiLogin: 'https://api-admps-h.famadm.com.br:442/fam.login',
  urlApiCampanha: 'https://api-admps-h.famadm.com.br:442/fam.campanhas',
  urlApiIntegracao: 'https://api-admps-h.famadm.com.br:442/fam.integracao',
  urlApiIngresso: 'https://api-ps-h.famadm.com.br/fam.ingresso',
  urlApiCobranca: 'https://api-ps-h.famadm.com.br/fam.cobranca',
  urlApiBackOffice: 'https://api-admps-h.vemprafam.com.br:442/fam.backoffice',
  urlAcessoToscana: 'https://processoseletivo-h.vemprafam.com.br/#/acessoToscana',
  urlApiUsuarios: "https://api-ps-h.vemprafam.com.br/fam.login/api",

  tableOptions: {
    bLengthChange: false,
    pagingType: "full_numbers",
    responsive: true,
    paging: true,
    ordering: true,
    info: false,
    pageLength: 10,
    language: linguagemTabela,
    classes: {
      sPageButton: ''
    }
  }
};
