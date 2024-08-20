import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esqueci',
  standalone : true, 
  imports : [FormsModule, CommonModule],
  templateUrl: './esqueci.component.html',
  styleUrls: ['./esqueci.component.css']
})
export class EsqueciComponent {
  email: string = '';
  mensagem: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<HttpResponse<any>>('http://localhost:8080/api/cliente/esqueci', { email: this.email }, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.mensagem = 'Um email foi enviado para o endereço fornecido com sucesso.';
          }
        },
        (error: any) => {
          if (error.status === 400) {
            this.mensagem = 'Email não encontrado.';
          } else if (error.status === 500) {
            this.mensagem = 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.';
          } else {
            this.mensagem = 'Ocorreu um erro ao tentar enviar o email.';
          }
        }
      );
  }
}