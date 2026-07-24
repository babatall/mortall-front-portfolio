import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private pendingRequests = signal(0);

  readonly loading = computed(() => this.pendingRequests() > 0);

  show() {
    this.pendingRequests.update(v => v + 1);
  }

  hide() {
    this.pendingRequests.update(v => Math.max(0, v - 1));
  }
}
