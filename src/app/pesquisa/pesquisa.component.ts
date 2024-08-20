import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pesquisa.component.html',
  styleUrl: './pesquisa.component.css'
})
export class PesquisaComponent {
  public mensagem:string;
  public lista: Produto[] = []; 
  public busca: string = "";

  public constructor(private service: ProdutoService){
    this.mensagem = "nenhuma resultado para sua pesquisa";
  }

  public pesquisar(){
    this.service.pesquisar(this.busca).subscribe(
      (data: Produto[]) => {    
        if(data==null){
          this.mensagem = "Produtos não encontrados!";
        } else {        
          this.mensagem = "resultado da pesquisa por:"+ this.busca;
          this.lista = data;
        }
      } , 
      (error) => {
        this.mensagem = "ocorreu um erro no carregamento da vitrine !"+ error;
      }
    )        
  }

  public comprar(produto: Produto){
    let novo: Item = new Item();
    novo.codigoProduto = produto.codigo;
    novo.nomeProduto = produto.nome;
    novo.valor = produto.valor;
    novo.qtd = 1;
    novo.total = produto.valor;
    let lista : Item[] = [];
    let json = localStorage.getItem("carrinho");
    if(json==null){
      lista.push(novo);  
      console.log(JSON.stringify(lista));
    } else {
      lista = JSON.parse(json);
      lista.push(novo);
    }  
    localStorage.setItem("carrinho",JSON.stringify(lista));
    window.location.href="./carrinho";
  }


  public abrirDetalhe(produto: Produto){
    localStorage.setItem("descricao",JSON.stringify(this.lista));
    window.location.href="./descricao";
  }
}
