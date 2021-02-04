import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapaComponent } from './inicio/capa/capa.component';
import { StoreProfileComponent } from './inicio/store-profile/store-profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContentComponent } from './inicio/content/content.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { BagComponent } from './inicio/bag/bag.component';
import { FooterComponent } from './inicio/footer/footer.component';
import { AssessmentsComponent } from './inicio/assessments/assessments.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { InfoComponent } from './inicio/info/info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemDetailsComponent } from './inicio/item-details/item-details.component';
import { MatInputModule } from '@angular/material/input';
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
import { MatMenuModule } from '@angular/material/menu';
import { CuponsComponent } from './conta_usuario/cupons/cupons.component';
import { RegrasCupomComponent } from './conta_usuario/cupons/regras-cupom/regras-cupom.component';
import { NotificationsComponent } from './conta_usuario/notifications/notifications.component';
import { FinishComponent } from './payment-steps/finish/finish.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BagStepsComponent } from './payment-steps/bag-steps/bag-steps.component';
import { ItensMerchantComponent } from './inicio/itens-merchant/itens-merchant.component';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WindowLoaderComponent } from './components/window-loader/window-loader.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddfpComponent } from './payment-steps/addfp/addfp.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './conta_usuario/orders-user/order-details/order-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserRegistrationComponent } from './inicio/user-registration/user-registration.component';
import { CodeConfirmationComponent } from './inicio/user-registration/code-confirmation/code-confirmation.component';
import { InputEmailortelComponent } from './inicio/user-registration/input-emailortel/input-emailortel.component';
import { InputUserDataComponent } from './inicio/user-registration/input-user-data/input-user-data.component';
import { SelectAddressComponent } from './inicio/select-address/select-address.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EvaluateOrderComponent } from './conta_usuario/evaluate-order/evaluate-order.component';
import { FormAddressComponent } from './conta_usuario/adresses/form-address/form-address.component';
import { CuponsListComponent } from './payment-steps/cupons-list/cupons-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatBadgeModule } from '@angular/material/badge';
import { CookieService } from 'ngx-cookie-service';
import { NamePipe } from './name.pipe';
import { FilterIdPipe } from './filter-id.pipe';
import { RouterInbagComponent } from './inicio/router-inbag/router-inbag.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LojasComponent } from './multLojas/lojas/lojas.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// tslint:disable-next-line: max-line-length
import { SelecionarEnderecoBuscarLojaComponent } from './multLojas/selecionar-endereco-buscar-loja/selecionar-endereco-buscar-loja.component';
import { EntrarComponent } from './multLojas/entrar/entrar.component';
import { RecuperarContaComponent } from './multLojas/recuperar-conta/recuperar-conta.component';
import { IconeLojaComponent } from './multLojas/lojas/icone-loja/icone-loja.component';
import { ToolbarMultLojasComponent } from './multLojas/toolbar-mult-lojas/toolbar-mult-lojas.component';
import { Page404Component } from './page404/page404.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { FacebookComponent } from './components/facebook/facebook.component';
import { TelefoneUsuarioComponent } from './inicio/telefone-usuario/telefone-usuario.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

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
    OrderDetailsComponent,
    UserRegistrationComponent,
    CodeConfirmationComponent,
    InputEmailortelComponent,
    InputUserDataComponent,
    SelectAddressComponent,
    EvaluateOrderComponent,
    FormAddressComponent,
    CuponsListComponent,
    NamePipe,
    FilterIdPipe,
    RouterInbagComponent,
    LojasComponent,
    SelecionarEnderecoBuscarLojaComponent,
    EntrarComponent,
    RecuperarContaComponent,
    IconeLojaComponent,
    ToolbarMultLojasComponent,
    Page404Component,
    FacebookComponent,
    TelefoneUsuarioComponent,
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
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot(),
    MatBadgeModule,
    IvyCarouselModule,
    NgxSkeletonLoaderModule.forRoot(),
    SocialLoginModule,
    CurrencyMaskModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CookieService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [

        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('582148842445848')
        },

      ]
    } as SocialAuthServiceConfig,
  },
  { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
