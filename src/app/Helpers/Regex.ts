export class Regex {
  static deixarApenasNumeros(numeroStr: string) : number{
    return Number(numeroStr.replace(/\D+/g, ''));
  }
}
