import { Select } from "../Models/Select";
import { GroupBy } from "./GroupBy";

export class CarregarSelect {

  static IdMesmoQueDescricao(dados: any, listSelect: Select[], nomeObj: string): any {
    const groupedCampus = GroupBy.groupByObj(dados, x => x[nomeObj]);
    listSelect = [];
    groupedCampus.forEach(function (i, e) {
      listSelect.push({
        id: e,
        Descricao: e
      })
    })
    return listSelect;
  }

}
