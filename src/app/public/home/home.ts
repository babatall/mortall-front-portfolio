import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

import { Projet } from '../../models/projet.model';
import { Competence } from '../../models/competence.model';
import {ProjetService} from '../../services/projet-service';
import {environment} from '../../environments/environment';
import {CompetenceService} from '../../services/competence-service';
import {MessageContactRequest} from '../../models/message-contact.model';
import {MessageService} from '../../services/message-service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Footer, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  projets = signal<Projet[]>([]);
  projetsEpingles = signal<Projet[]>([]);
  competences = signal<Competence[]>([]);
  apiBaseUrl = environment.apiUrl.replace('/api/v1', '');
  cvUrl = '/assets/cv-tall.pdf';

  contactForm: MessageContactRequest = { nom: '', email: '', message: '' };
  isSending = signal(false);
  contactSuccess = signal(false);
  contactError = signal<string | null>(null);

  formations: Formation[]= [
    {
      titre: 'Master Génie Logiciel',
      etablissement: 'Université Cheikh Hamidou Kane - UCHK',
      periode: 'En cours',
      type: 'diplome'
    },
    {
      titre: 'Certification Flutter',
      etablissement: 'ForceN',
      periode: '2025',
      type: 'certificat'
    },
    {
      titre: 'Certification Angular ',
      etablissement: 'ForceN',
      periode: '2024',
      type: 'certificat'
    },
    {
      titre: 'Licence Informatique',
      etablissement: 'Université Cheikh Hamidou Kane - UCHK',
      periode: '2021 - 2024',
      type: 'diplome'
    }

  ];



  constructor(
    private projetService: ProjetService,
    private competenceService: CompetenceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.projetService.getAllProjets().subscribe(data => {
      this.projets.set(data.filter(p => p.epingle).slice(0, 3));
    });

    this.competenceService.getAllCompetences().subscribe(data => {
      this.competences.set(data);
    });
  }

  onSubmitContact(): void {
    this.contactError.set(null);
    this.contactSuccess.set(false);
    this.isSending.set(true);

    this.messageService.envoyerMessage(this.contactForm).subscribe({
      next: () => {
        this.isSending.set(false);
        this.contactSuccess.set(true);
        this.contactForm = { nom: '', email: '', message: '' };
      },
      error: () => {
        this.isSending.set(false);
        this.contactError.set('Erreur lors de l\'envoi, réessaie plus tard');
      }
    });
  }
}
