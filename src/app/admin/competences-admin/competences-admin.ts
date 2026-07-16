import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Competence, CompetenceRequest, CategorieCompetence } from '../../models/competence.model';
import {CompetenceService} from '../../services/competence-service';

@Component({
  selector: 'app-competences-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competences-admin.html',
  styleUrl: './competences-admin.css'
})
export class CompetencesAdmin implements OnInit {

  competences = signal<Competence[]>([]);
  isModalOpen = signal(false);
  isEditMode = signal(false);
  isSaving = signal(false);
  errorMessage = signal<string | null>(null);

  currentId: number | null = null;
  formData: CompetenceRequest = this.emptyForm();

  categories: CategorieCompetence[] = [
    'FRONTEND', 'BACKEND', 'MOBILE', 'BASE_DE_DONNEES', 'DEVOPS', 'OUTIL', 'LANGAGE'
  ];

  constructor(private competenceService: CompetenceService) {}

  ngOnInit(): void {
    this.loadCompetences();
  }

  loadCompetences(): void {
    this.competenceService.getAllCompetences().subscribe({
      next: (data) => this.competences.set(data),
      error: () => this.errorMessage.set('Impossible de charger les compétences')
    });
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.currentId = null;
    this.formData = this.emptyForm();
    this.errorMessage.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(competence: Competence): void {
    this.isEditMode.set(true);
    this.currentId = competence.id;
    this.formData = {
      nom: competence.nom,
      categorie: competence.categorie,
      niveau: competence.niveau,
      ordreAffichage: 0
    };
    this.errorMessage.set(null);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request$ = this.isEditMode() && this.currentId !== null
      ? this.competenceService.updateCompetence(this.currentId, this.formData)
      : this.competenceService.createCompetence(this.formData);

    request$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.loadCompetences();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue');
      }
    });
  }

  deleteCompetence(id: number): void {
    if (!confirm('Supprimer cette compétence ?')) return;

    this.competenceService.deleteCompetence(id).subscribe({
      next: () => this.loadCompetences(),
      error: () => this.errorMessage.set('Impossible de supprimer cette compétence')
    });
  }

  private emptyForm(): CompetenceRequest {
    return { nom: '', categorie: 'FRONTEND', niveau: 3, ordreAffichage: 0 };
  }
}
