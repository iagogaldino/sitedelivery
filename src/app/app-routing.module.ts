import { Page404Component } from './page404/page404.component';
import { RecuperarContaComponent } from './multLojas/recuperar-conta/recuperar-conta.component';
import { EntrarComponent } from './multLojas/entrar/entrar.component';
import { LoginComponent } from './inicio/login/login.component';
import { LojasComponent } from './multLojas/lojas/lojas.component';
import { SGuard } from './s.guard';
import { BagComponent } from './inicio/bag/bag.component';
import { CodeConfirmationComponent } from './inicio/user-registration/code-confirmation/code-confirmation.component';
import { UserRegistrationComponent } from './inicio/user-registration/user-registration.component';
import { NotificationsComponent } from './conta_usuario/notifications/notifications.component';
import { ItemDetailsComponent } from './inicio/item-details/item-details.component';
import { ItensMerchantComponent } from './inicio/itens-merchant/itens-merchant.component';
import { CuponsComponent } from './conta_usuario/cupons/cupons.component';
import { DataUserComponent } from './conta_usuario/data-user/data-user.component';
import { AdressesComponent } from './conta_usuario/adresses/adresses.component';
import { AvalsComponent } from './conta_usuario/avals/avals.component';
import { OrdersUserComponent } from './conta_usuario/orders-user/orders-user.component';
import { PerfilUserComponent } from './conta_usuario/perfil-user/perfil-user.component';
import { StoryComponent } from './inicio/story/story.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';
import { HomeComponent } from './inicio/home/home.component';
import { CapaComponent } from './inicio/capa/capa.component';
import { StoreProfileComponent } from './inicio/store-profile/store-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishComponent } from './payment-steps/finish/finish.component';
import { InputEmailortelComponent } from './inicio/user-registration/input-emailortel/input-emailortel.component';
import { InputUserDataComponent } from './inicio/user-registration/input-user-data/input-user-data.component';
import { MensagemPedidoEnviadoComponent } from './components/mensagem-pedido-enviado/mensagem-pedido-enviado.component';


const routes: Routes = [

  { path: 'ok', component: MensagemPedidoEnviadoComponent },


  { path: 'registration', component: UserRegistrationComponent, children: [
    { path: '', component: InputEmailortelComponent },
    { path: 'code', component: CodeConfirmationComponent },
    { path: 'data', component: InputUserDataComponent },
  ] },


  { path: '', component: StoryComponent, canActivate: [SGuard], children: [
    { path: '', component: PerfilComponent, children: [
      { path: '', component: ItensMerchantComponent },
      { path: 'finish', component: FinishComponent },
      { path: 'item-datails/:id', component: ItemDetailsComponent },
      { path: 'bag', component: BagComponent },

    ] },
  ] 
  },

  { path: 'buscar-lojas', component: HomeComponent },
  { path: 'lojas', component: LojasComponent },
  { path: 'entrar', component: EntrarComponent },
  { path: 'recuperar-cadastro', component: RecuperarContaComponent },
  { path: '404', component: Page404Component },


  { path: 'perfil-user', component: PerfilUserComponent, children: [
    { path: 'orders', component: OrdersUserComponent },
    { path: 'avals', component: AvalsComponent },
    { path: 'adresses', component: AdressesComponent },
    { path: 'data', component: DataUserComponent },
    { path: 'cupons', component: CuponsComponent },
    { path: 'notifications', component: NotificationsComponent },
  ] },

  // {path: '**', redirectTo: '/404'},
  {path: '**', component: Page404Component  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
