import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ponto, StorageService } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-criar-pontos',
  templateUrl: './criar-pontos.page.html',
  styleUrls: ['./criar-pontos.page.scss'],
})
export class CriarPontosPage {

  pontos: Ponto[] = [];

  newPonto: Ponto = <Ponto>{}

  @ViewChild('myList')myList: IonList;
  
  constructor(private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(()=>{
      this.loadPontos();
    })
   }

   addItem(){
     this.newPonto.id = Date.now();

     this.storageService.addPonto(this.newPonto).then(ponto => {
       this.newPonto = <Ponto>{};
       this.showToast('Ponto de Interesse criado');
       this.loadPontos();
     })
   }

   loadPontos(){
     this.storageService.getPontos().then(pontos => {
       this.pontos = pontos;
     })
   };

   updatePonto(ponto: Ponto){
    ponto.lugar = `UPDATED: ${ponto.lugar}`;
    ponto.nome = `UPDATED: ${ponto.nome}`;
    ponto.tipo = `UPDATED: ${ponto.tipo}`;
    
    this.storageService.updatePonto(ponto).then(ponto => {
      this.showToast('Ponto Atualizado');
      this.myList.closeSlidingItems();
      this.loadPontos();
    });
   }

   deletePonto(ponto: Ponto){
     this.storageService.deletePonto(ponto.id).then(ponto =>{
       this.showToast('Ponto Removido');
       this.myList.closeSlidingItems();
       this.loadPontos();
     });
   }

   async showToast(msg){
     const toast = await this.toastController.create({
       message: msg,
       duration: 2000
     });
     toast.present();
   }
  voltar(){
    this.router.navigate(['pdi']);
  }
}
