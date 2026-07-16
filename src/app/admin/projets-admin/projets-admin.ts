import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Projet, ProjetRequest } from '../../models/projet.model';
import {environment} from '../../environments/environment';
import {FormsModule} from '@angular/forms';
import {ProjetService} from '../../services/projet-service';


@Component({
  selector: 'app-projets-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projets-admin.html',
  styleUrl: './projets-admin.css'
})
export class ProjetsAdmin implements OnInit {

  projets = signal<Projet[]>([]);
  isModalOpen = signal(false);
  isEditMode = signal(false);
  isSaving = signal(false);
  errorMessage = signal<string | null>(null);

  currentId: number | null = null;
  formData: ProjetRequest = this.emptyForm();
  technologiesInput = '';
  selectedImage: File | null = null;
  imagePreviewUrl: string | null = null;

  apiBaseUrl = environment.apiUrl.replace('/api/v1', '');

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe({
      next: (data) => this.projets.set(data),
      error: () => this.errorMessage.set('Impossible de charger les projets')
    });
  }

  openCreateModal(): void {
    this.isEditMode.set(false);
    this.currentId = null;
    this.formData = this.emptyForm();
    this.technologiesInput = '';
    this.selectedImage = null;
    this.imagePreviewUrl = null;
    this.errorMessage.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(projet: Projet): void {
    this.isEditMode.set(true);
    this.currentId = projet.id;
    this.formData = {
      titre: projet.titre,
      description: projet.description,
      technologies: projet.technologies,
      lienGithub: projet.lienGithub,
      lienDemo: projet.lienDemo,
      epingle: projet.epingle,
      ordreAffichage: projet.ordreAffichage
    };
    this.technologiesInput = projet.technologies.join(', ');
    this.selectedImage = null;
    this.imagePreviewUrl = projet.imageUrl ? this.apiBaseUrl + projet.imageUrl : null;
    this.errorMessage.set(null);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      this.imagePreviewUrl = URL.createObjectURL(this.selectedImage);
    }
  }

  onSubmit(): void {
    this.errorMessage.set(null);
    this.isSaving.set(true);

    this.formData.technologies = this.technologiesInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const request$ = this.isEditMode() && this.currentId !== null
      ? this.projetService.updateProjet(this.currentId, this.formData, this.selectedImage)
      : this.projetService.createProjet(this.formData, this.selectedImage);

    request$.subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.loadProjets();
      },
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Une erreur est survenue');
      }
    });
  }

  deleteProjet(id: number): void {
    if (!confirm('Supprimer ce projet définitivement ?')) return;

    this.projetService.deleteProjet(id).subscribe({
      next: () => this.loadProjets(),
      error: () => this.errorMessage.set('Impossible de supprimer ce projet')
    });
  }

  private emptyForm(): ProjetRequest {
    return {
      titre: '',
      description: '',
      technologies: [],
      lienGithub: '',
      lienDemo: '',
      epingle: false,
      ordreAffichage: 0
    };
  }
}
