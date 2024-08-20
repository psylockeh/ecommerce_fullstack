import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterEvent } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PesquisaComponent } from '../pesquisa/pesquisa.component';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, PesquisaComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  [x: string]: any;
  public mensagem: string = '';
  public busca: string = '';
  public lista: Produto[] = [];
  

  constructor(private router: Router, private service: ProdutoService) {}


  onSearch(event: Event): void {
    event.preventDefault();
    this.router.navigate(['pesquisa'], { queryParams: { query: this.busca } });  }

  ngOnInit(): void {}

  public pesquisar(): void {
    this.service.pesquisar(this.busca).subscribe(
      (data: Produto[]) => {
        if (data === null) {
          this.mensagem = "Nenhum resultado encontrado para a sua pesquisa.";
        } else {
          this.mensagem = `Resultado da pesquisa por: ${this.busca}`;
          this.lista = data;
        }
      },
      (error) => {
        this.mensagem = "Ocorreu um erro no carregamento dos produtos: " + error;
      }
    );
  }
  

  public comprar(produto: Produto) {
    let novo: Item = new Item();
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

  public abrirDetalhe(produto: Produto) {
    localStorage.setItem("descricao", JSON.stringify(produto.codigo));
    window.location.href = "./descricao";
  }
}

