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


const routes: Routes = [

  { path: '', component: StoryComponent, children: [
    { path: '', component: PerfilComponent, children: [
      { path: '', component: ItensMerchantComponent },
      { path: 'finish', component: FinishComponent },
      { path: 'item-datails', component: ItemDetailsComponent },
    ] },



    { path: 'perfil-user', component: PerfilUserComponent, children: [
      { path: '', component: OrdersUserComponent },
      { path: 'avals', component: AvalsComponent },
      { path: 'adresses', component: AdressesComponent },
      { path: 'data', component: DataUserComponent },
      { path: 'cupons', component: CuponsComponent },
    ] },


  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
