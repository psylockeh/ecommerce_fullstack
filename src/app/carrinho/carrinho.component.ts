import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  public lista: Item[] = [];
  public mensagem: String = "";
  public totalCarrinho: number = 0;
  public orderNumber: string = "";

  constructor(private http: HttpClient, private router: Router) {
    let json = localStorage.getItem("carrinho");
    if (json == null) {
      this.mensagem = "Seu carrinho está vazio :c";
    } else {
      this.lista = JSON.parse(json);
      for (let item of this.lista) {
        this.totalCarrinho += item.total;
      }
    }

    // Retrieve order number from localStorage
    const storedOrderNumber = localStorage.getItem('orderNumber');
    if (storedOrderNumber) {
      this.orderNumber = JSON.parse(storedOrderNumber);
    }
  }

  limpar() {
    this.lista = [];
    localStorage.removeItem("carrinho");
    this.mensagem = "Seu carrinho está vazio :c";
    this.totalCarrinho = 0;
  }

  removerItem(item: any) {
    const index = this.lista.indexOf(item);
    if (index !== -1) {
      this.lista.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(this.lista));
      this.totalCarrinho = this.lista.reduce((total, item) => total + item.total, 0);
      if (this.lista.length === 0) {
        this.mensagem = "Seu carrinho está vazio :c";
      }
    }
  }

  private generateOrderNumber(): string {
    return 'PED-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  public saveCartAndGenerateOrder() {
    if (this.lista.length === 0) {
      this.mensagem = "Seu carrinho está vazio :c";
      return;
    }

    this.orderNumber = this.generateOrderNumber();

    const order = {
      orderNumber: this.orderNumber,
      items: this.lista,
      total: this.totalCarrinho,
      dataPedido: new Date()
    };

    this.http.post('http://localhost:8080/api/pedido', order).subscribe(
      (response: any) => {
        console.log('Response from backend:', response);
        localStorage.setItem("orderNumber", JSON.stringify(this.orderNumber));
        this.mensagem = `Seu pedido foi gerado com o número: ${response.orderNumber}`;
        this.limpar();
      },
      (error: any) => {
        console.error('Error response from backend:', error);
        this.mensagem = "Ocorreu um erro ao salvar o pedido. Por favor, tente novamente.";
      }
    );
  }

  public redirectToVitrine() {
    this.router.navigate(['/vitrine']);
  }
}
