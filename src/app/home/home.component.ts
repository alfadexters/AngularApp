import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataP: any[] = [];
  dataM: any[] = [];
  showSeparator: boolean = true;
  porcentajeHombresP: number = 0;
  porcentajeMujeresP: number = 0;
  porcentajeHombresM: number = 0;
  porcentajeMujeresM: number = 0;

  constructor(private apiService: ApiService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getDataPostgres().subscribe(data => {
      this.dataP = data;
      this.calcularPorcentajesIndividuales();
    });

    this.apiService.getDataMySql().subscribe(data => {
      this.dataM = data;
      this.calcularPorcentajesIndividuales();
    });
  }

  contarGenero(data: any[], genero: string): number {
    return data.filter(item => item.genero.toLowerCase() === genero).length;
  }

  calcularPorcentajesIndividuales() {
    const totalHombresP = this.contarGenero(this.dataP, 'hombre');
    const totalMujeresP = this.contarGenero(this.dataP, 'mujer');
    
    const totalHombresM = this.contarGenero(this.dataM, 'hombre');
    const totalMujeresM = this.contarGenero(this.dataM, 'mujer');

    this.porcentajeHombresP = (totalHombresP / (totalHombresP + totalMujeresP)) * 100;
    this.porcentajeMujeresP = (totalMujeresP / (totalHombresP + totalMujeresP)) * 100;

    this.porcentajeHombresM = (totalHombresM / (totalHombresM + totalMujeresM)) * 100;
    this.porcentajeMujeresM = (totalMujeresM / (totalHombresM + totalMujeresM)) * 100;

    // Actualizar variables CSS con los nuevos porcentajes
    this.document.documentElement.style.setProperty('--porcentaje-hombres-p', `${this.porcentajeHombresP}%`);
    this.document.documentElement.style.setProperty('--porcentaje-hombres-m', `${this.porcentajeHombresM}%`);
    this.document.documentElement.style.setProperty('--porcentaje-mujeres-p', `${this.porcentajeMujeresP}%`);
    this.document.documentElement.style.setProperty('--porcentaje-mujeres-m', `${this.porcentajeMujeresM}%`);
  }

  toggleSeparator() {
    this.showSeparator = !this.showSeparator;
  }
}


