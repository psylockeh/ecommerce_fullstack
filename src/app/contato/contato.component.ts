import { Component } from '@angular/core';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  public mensagem : String = "";

  public enviar(){
    //TODO enviar por email atraves do backend
    this.mensagem = "Seu contato foi recebido com sucesso!";
  }

}
