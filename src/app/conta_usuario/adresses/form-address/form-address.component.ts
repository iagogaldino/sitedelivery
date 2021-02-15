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
  form: FormGroup;
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

    this.form.controls.cidade.valueChanges.subscribe( data => {
      this.selectCity(data);
      setTimeout ( () => {
        this.form.controls.bairro.patchValue(this.lojaServ.getEnderecoSelecionado().ba.nome);
      } , 600);
    } );

    this.form.controls.bairro.valueChanges.subscribe( data => {
      console.log('Seleciona bairro');
      console.log(data);
      this.neighborhoods.forEach(element => {
        if (element.nome === data) {
          console.log(element);
          this.selectNeigh(element);
        }
      });
    });

    if (this.service.sistemMultStores) {
      this.options = this.lojaServ.getCidadesSistema();
      this.options.forEach(element => {
        if (element.nome === this.lojaServ.getEnderecoSelecionado().ci.nome) {
          this.form.controls.cidade.patchValue(element);
        }
      });
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
    const cc = { id: this.citySelected.id, nome: this.citySelected.nome };
    const ba = { id: this.neighborhoodsSelected.id, nome: this.neighborhoodsSelected.nome };
    this.form.value.cidade = cc;
    this.form.value.bairro = ba;

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
