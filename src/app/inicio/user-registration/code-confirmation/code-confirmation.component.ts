import { CrudService } from 'src/app/service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Router } from '@angular/router';
import { UserRegistrationService } from './../user-registration.service';
import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-code-confirmation',
  templateUrl: './code-confirmation.component.html',
  styleUrls: ['./code-confirmation.component.css']
})
export class CodeConfirmationComponent implements OnInit {

  typeReg: any;
  statusBT = false;
  confirmationCode: string;
  @ViewChild('in1') in1: ElementRef;
  @ViewChild('in2') in2: ElementRef;
  @ViewChild('in3') in3: ElementRef;
  @ViewChild('in4') in4: ElementRef;


  constructor(private userServ: UserRegistrationService, private router: Router, @Inject(PLATFORM_ID) private platformId: any,
    private service: ServiceappService, private crud: CrudService) { }

  ngOnInit(): void {
    this.typeReg = this.userServ.getTypeReg();
  }

  onKeyIn1(code, input) {
    if (!code) { return; }
    console.log('>>' + code);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (input === 2) { this.confirmationCode += code; this.in2.nativeElement.focus(); }
        if (input === 3) { this.confirmationCode += code; this.in3.nativeElement.focus(); }
        if (input === 4) { this.confirmationCode += code; this.in4.nativeElement.focus(); }
        if (input === 5) {
          this.confirm();
        }
      }, 300);
    }
  }

  confirm() {
    this.statusBT = true;
    this.postApi();
  }

  postApi() {
    this.confirmationCode = this.in1.nativeElement.value + '' + this.in2.nativeElement.value + '' + this.in3.nativeElement.value + '' + this.in4.nativeElement.value;
    const a = () => {
      const r = this.service.getRespostaApi();
      console.log(r);
      if (r.erro) {
        this.service.mostrarMensagem(r.detalhes); this.statusBT = false;
        this.in1.nativeElement.value = '';
        this.in2.nativeElement.value = '';
        this.in3.nativeElement.value = '';
        this.in4.nativeElement.value = '';
        this.in1.nativeElement.focus();
        this.confirmationCode = '';
        return;
      }
      this.router.navigate(['/registration/data']);
    };

    if (this.userServ.getTypeReg() === 'email') {
      this.crud.post_api('verificaCodEmail', a, { email: this.userServ.getDataUserEmail(), token: this.confirmationCode }, false);
    }
    if (this.userServ.getTypeReg() === 'phone') {
      this.crud.post_api('verificaCodTelefone', a, { telefone: this.userServ.getDataUserPhone(), token: this.confirmationCode }, false);
    }


  }

}
