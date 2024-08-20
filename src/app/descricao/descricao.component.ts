import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../service/produto.service';
import { VitrineComponent } from '../vitrine/vitrine.component';
import { Item } from '../model/item';


@Component({
  selector: 'app-descricao',
  standalone: true,
  imports: [CommonModule,FormsModule, VitrineComponent],
  templateUrl: './descricao.component.html',
  styleUrl: './descricao.component.css'
})
export class DescricaoComponent {

    public mensagem: String = "";
    public obj : Produto = new Produto();
  
    public constructor(private service: ProdutoService){
      let codigo : any = localStorage.getItem("descricao");
      if(codigo==null){
        this.mensagem = "produto não encontrado!!!";
      } else {
          this.service.carregar(codigo).subscribe(
          (data: Produto) => {    
            if(data==null){
              this.mensagem = "Produto não encontrado!";
            } else {        
              this.obj = data;
            }
          } , 
          (error) => {
            this.mensagem = "ocorreu um erro no carregamento do detalhe !"+ error;
          }
        )        
      } 
    }

    public comprar(produto: Produto) {
      let novo = new Item();
      novo.codigoProduto = produto.codigo;
      novo.nomeProduto = produto.nome;
      novo.valor = produto.valor;
      novo.qtd = 1;
      novo.total = produto.valor;
      let lista: Item[] = [];
      let json = localStorage.getItem("carrinho");
      if (json == null) {
        lista.push(novo);
      } else {
        lista = JSON.parse(json);
        lista.push(novo);
      }
      localStorage.setItem("carrinho", JSON.stringify(lista));
      window.location.href = "./carrinho";
    }
    
}
