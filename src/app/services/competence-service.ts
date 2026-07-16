import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {Competence, CompetenceRequest} from '../models/competence.model';


@Injectable({ providedIn: 'root' })
export class CompetenceService {

  private baseUrl = `${environment.apiUrl}/competences`;
  private adminUrl = `${environment.apiUrl}/admin/competences`;

  constructor(private http: HttpClient) {}

  // --- Public ---
  getAllCompetences(): Observable<Competence[]> {
    return this.http.get<Competence[]>(this.baseUrl);
  }

  // --- Admin ---
  getCompetenceById(id: number): Observable<Competence> {
    return this.http.get<Competence>(`${this.adminUrl}/${id}`);
  }

  createCompetence(competence: CompetenceRequest): Observable<Competence> {
    return this.http.post<Competence>(this.adminUrl, competence);
  }

  updateCompetence(id: number, competence: CompetenceRequest): Observable<Competence> {
    return this.http.put<Competence>(`${this.adminUrl}/${id}`, competence);
  }

  deleteCompetence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }
}
