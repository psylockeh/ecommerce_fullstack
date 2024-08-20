export class Produto {
    public codigo: number;
    public nome: string;
    public marca: string;
    public tecido: string;
    public cor: string;
    public estampa: string;
    public valor: number;
    public orientacoes: string;
    public valorPromo: number;
    public destaque: number;
    public estoque: number;
    constructor(){
        this.codigo = 0;
        this.nome = "";
        this.marca = "";
        this.tecido = "";
        this.cor = "";
        this.estampa = "";
        this.valor = 0;
        this.orientacoes = "";
        this.valorPromo = 0;
        this.estoque = 0;
        this.destaque = 0;
    }
}
