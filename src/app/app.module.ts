import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapaComponent } from './inicio/capa/capa.component';
import { StoreProfileComponent } from './inicio/store-profile/store-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContentComponent } from './inicio/content/content.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatSelectModule} from '@angular/material/select';
import { BagComponent } from './inicio/bag/bag.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { AssessmentsComponent } from './inicio/assessments/assessments.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { InfoComponent } from './inicio/info/info.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ItemDetailsComponent } from './inicio/item-details/item-details.component';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './inicio/home/home.component';
import { LoginComponent } from './inicio/login/login.component';
import { RecuperarSenhaComponent } from './inicio/content/recuperar-senha/recuperar-senha.component';
import { LocaisEnderecoComponent } from './inicio/locais-endereco/locais-endereco.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';
import { StoryComponent } from './inicio/story/story.component';
import { PerfilUserComponent } from './conta_usuario/perfil-user/perfil-user.component';
import { OrdersUserComponent } from './conta_usuario/orders-user/orders-user.component';
import { AvalsComponent } from './conta_usuario/avals/avals.component';
import { DataUserComponent } from './conta_usuario/data-user/data-user.component';
import { AdressesComponent } from './conta_usuario/adresses/adresses.component';
import {MatMenuModule} from '@angular/material/menu';
import { CuponsComponent } from './conta_usuario/cupons/cupons.component';
import { RegrasCupomComponent } from './conta_usuario/cupons/regras-cupom/regras-cupom.component';
import { NotificationsComponent } from './conta_usuario/notifications/notifications.component';
import { FinishComponent } from './payment-steps/finish/finish.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BagStepsComponent } from './payment-steps/bag-steps/bag-steps.component';
import { ItensMerchantComponent } from './inicio/itens-merchant/itens-merchant.component';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WindowLoaderComponent } from './components/window-loader/window-loader.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddfpComponent } from './payment-steps/addfp/addfp.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent,
    CapaComponent,
    StoreProfileComponent,
    ContentComponent,
    BagComponent,
    FooterComponent,
    AssessmentsComponent,
    InfoComponent,
    ItemDetailsComponent,
    HomeComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    LocaisEnderecoComponent,
    PerfilComponent,
    StoryComponent,
    PerfilUserComponent,
    OrdersUserComponent,
    AvalsComponent,
    DataUserComponent,
    AdressesComponent,
    CuponsComponent,
    RegrasCupomComponent,
    NotificationsComponent,
    FinishComponent,
    BagStepsComponent,
    ItensMerchantComponent,
    WindowLoaderComponent,
    AddfpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,
    LazyLoadImageModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSlideToggleModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
