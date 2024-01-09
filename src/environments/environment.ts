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

  urlApiLogin: 'https://api-admps-d.famadm.com.br:442/fam.login',
  urlApiCampanha: 'https://api-admps-d.famadm.com.br:442/fam.campanhas',
  urlApiIntegracao: 'https://api-admps-d.famadm.com.br:442/fam.integracao',
  urlApiIngresso: 'https://api-ps-d.famadm.com.br/fam.ingresso',
  urlApiCobranca: 'https://api-ps-d.famadm.com.br/fam.cobranca',
  urlApiBackOffice: 'https://api-admps-d.famadm.com.br:442/fam.backoffice',
  urlApiUsuarios: "https://api-ps-d.famadm.com.br/fam.login",
  urlAcessoToscana: 'https://processoseletivo-d.vemprafam.com.br/inscricao/#/acessoToscana',
  urlApiProcessoSeletivo: 'https://api-ps-d.famadm.com.br/fam.processoseletivo',

  //urlApiLogin: 'http://localhost:57995',
  // urlApiCampanha: 'https://localhost:44389',
  //urlApiIntegracao: 'https://localhost:44355',
  //urlApiIngresso: 'https://localhost:44389',
  //urlApiCobranca: 'https://localhost:8082',
  //urlApiBackOffice: 'http://localhost:8090',
  //urlAcessoToscana: 'http://localhost:4201/#/acessoToscana',
  //urlApiUsuarios: 'https://localhost:44377',

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
