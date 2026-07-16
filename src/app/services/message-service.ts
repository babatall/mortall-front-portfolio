import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {MessageContact, MessageContactRequest} from '../models/message-contact.model';


@Injectable({ providedIn: 'root' })
export class MessageService {

  private contactUrl = `${environment.apiUrl}/contact`;
  private adminUrl = `${environment.apiUrl}/admin/messages`;

  constructor(private http: HttpClient) {}

  // --- Public ---
  envoyerMessage(message: MessageContactRequest): Observable<void> {
    return this.http.post<void>(this.contactUrl, message);
  }

  // --- Admin ---
  getAllMessages(): Observable<MessageContact[]> {
    return this.http.get<MessageContact[]>(this.adminUrl);
  }

  getMessagesNonLus(): Observable<MessageContact[]> {
    return this.http.get<MessageContact[]>(`${this.adminUrl}/non-lus`);
  }

  marquerCommeLu(id: number): Observable<MessageContact> {
    return this.http.patch<MessageContact>(`${this.adminUrl}/${id}/lu`, {});
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }
}
