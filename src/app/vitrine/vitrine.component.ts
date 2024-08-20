import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent {
  public mensagem: string;
  public lista: Produto[] = [];
  termoDePesquisa: string = '';

  constructor(private service: ProdutoService, private router: Router) {
    this.mensagem = "";
  }

  ngOnInit(): void {
    this.service.listar().subscribe(
      (data: Produto[]) => {
        if (data == null) {
          this.mensagem = "Produtos não encontrados!";
        } else {
          this.lista = data;
        }
      },
      (error) => {
        this.mensagem = "Ocorreu um erro no carregamento da vitrine: " + error;
      }
    );
  }

  pesquisar(): void {
    if (this.termoDePesquisa.trim()) {
      this.router.navigate(['/pesquisa'], { queryParams: { termo: this.termoDePesquisa } });
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

  public abrirDescricao(produto: Produto) {
    localStorage.setItem("descricao",JSON.stringify(produto.codigo));
    window.location.href="./descricao";

  }
}