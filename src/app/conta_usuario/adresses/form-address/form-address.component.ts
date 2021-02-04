import { LojasService } from './../../../multLojas/lojas/lojas.service';
import { CrudService } from './../../../service/crud.service';
import { ServiceappService } from 'src/app/service/serviceapp.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {

  enderecousuario: any;
  form: any;
  statusbt: boolean;
  statusload1 = false;

  myControl = new FormControl();
  myControl2 = new FormControl();
  neighborhoods: Array<any>;
  options: Array<any>;
  neighborhoodsSelected = { nome: '', taxa: 0, id: 0 };
  statusCity = false;
  citySelected = { nome: '', id: 0, bairros: [] };

  constructor(public dialogRef: MatDialogRef<FormAddressComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private service: ServiceappService,
              private crud: CrudService, private lojaServ: LojasService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      cidade: [''],
      bairro: [''],
      rua: [null],
      idusuario: this.service.getDadosUsuario().id,
      numero: [null],
      complemento: [null],
      tiporesidencia: [null],
      nomeendereco: [null]
    });

    if (this.service.sistemMultStores) {
      this.options = this.lojaServ.getCidadesSistema();
    } else {
      this.options = this.service.getDadosEmpresa().locais_entrega;
    }

  }

  onClickSalvar() {
    this.setAddress();
    if (!this.citySelected) { this.service.mostrarMensagem('Selecione a cidade'); return; }
    if (!this.neighborhoodsSelected) { this.service.mostrarMensagem('Selecione o bairro'); return; }
    if (!this.form.value.rua) { this.service.mostrarMensagem('Preencha o nome de sua rua'); return; }
    // tslint:disable-next-line: max-line-length
    if (!this.form.value.numero) { this.service.mostrarMensagem('Qual o número de seu local de entrega? Caso não tenha informe: S/N'); return; }
    // if (!this.form.value.complemento) { return; }
    // tslint:disable-next-line: max-line-length
    // if (!this.form.value.tiporesidencia) { this.service.mostrarMensagem('Qual o tipo de sua residência? Casa/Apartamento. Caso esteja em um hotel informe no complemento'); return; }
    this.statusbt = true;
    this.form.value.cidade = this.citySelected;
    this.form.value.bairro = this.neighborhoodsSelected;

    const fun = () => {
      const res = this.service.getRespostaApi();
      if (res.erro === true) {
        this.statusbt = false;
      } else {
        this.service.mostrarMensagem('Endereço cadastrado com sucesso.');
        this.service.addEnderecoUsuario(this.form.value);
        setTimeout(() => { this.dialogRef.close(); }, 500);
      }
    };

    this.crud.post_api('cadastro_endereco', fun, this.form.value);

  }



  selectCity(item: any) {
    console.log(item);
    this.statusCity = true;
    this.neighborhoods = item.bairros;
    this.citySelected = item;
  }
  selectNeigh(item: any) {
    this.neighborhoodsSelected = item;
  }

  setAddress() {

    if (!this.citySelected.nome || this.citySelected.nome === '') { this.service.mostrarMensagem('Selecione sua cidade'); return; }
    if (!this.neighborhoodsSelected.nome || this.neighborhoodsSelected.nome === '') {
      this.service.mostrarMensagem('Selecione seu bairro');
      return;
    }

    // Se o usuário digitar o nome errado do bairro, o sistema corrige auto.
    this.service.getDadosEmpresa().locais_entrega.forEach(element => {
      if (element.id === this.citySelected.id) {
        this.citySelected.nome = element.nome;
        this.citySelected.bairros.forEach(bairro => {
          if (bairro.id === this.neighborhoodsSelected.id) {
            this.neighborhoodsSelected.nome = bairro.nome;
          }
        });
      }
    });

  }


}
