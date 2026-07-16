import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Projet, ProjetRequest} from '../models/projet.model';
import {Projets} from '../public/projets/projets';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {

  private baseUrl = `${environment.apiUrl}/projets`;
  private adminUrl = `${environment.apiUrl}/admin/projets`;

  constructor(private http: HttpClient) { }


  getAllProjets() {
    return this.http.get<Projets[]>(`${this.baseUrl}/projets`);
  }

  // --- Admin ---
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.adminUrl}/${id}`);
  }

  createProjet(projet: ProjetRequest, image: File | null): Observable<Projet> {
    const formData = new FormData();
    formData.append('projet', new Blob([JSON.stringify(projet)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.post<Projet>(this.adminUrl, formData);
  }

  updateProjet(id: number, projet: ProjetRequest, image: File | null): Observable<Projet> {
    const formData = new FormData();
    formData.append('projet', new Blob([JSON.stringify(projet)], { type: 'application/json' }));
    if (image) {
      formData.append('image', image);
    }
    return this.http.put<Projet>(`${this.adminUrl}/${id}`, formData);
  }

  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }

}
