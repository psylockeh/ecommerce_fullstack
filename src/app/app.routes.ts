import { Routes } from '@angular/router';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { EsqueciComponent } from './esqueci/esqueci.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { DescricaoComponent } from './descricao/descricao.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { LoginComponent } from './login/login.component';
import { ContatoComponent } from './contato/contato.component';

export const routes: Routes = [
    {path:"carrinho", component: CarrinhoComponent},
    {path:"esqueci", component: EsqueciComponent},
    {path:"pesquisa", component:PesquisaComponent},
    {path:"descricao", component: DescricaoComponent},
    {path:"cadastro", component:CadastroComponent},
    {path:"vitrine", component:VitrineComponent},
    {path:"login", component:LoginComponent},
    {path:"contato", component:ContatoComponent},
];
