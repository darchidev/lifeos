import { Component, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="toast-container" role="status" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="toast toast-{{ toast.type }}"
          [@fadeInUp]=""
          (click)="toastService.dismiss(toast.id)"
          role="alert"
        >
          <span class="toast-icon">
            @if (toast.type === 'success') {✓}
            @else if (toast.type === 'error') {✕}
            @else if (toast.type === 'warning') {⚠}
            @else {ℹ}
          </span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 5rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 22rem;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      cursor: pointer;
      backdrop-filter: blur(12px);
      animation: toastIn 0.3s ease-out;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }
    @keyframes toastIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .toast-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .toast-error { background: #fee2e2; color: #991b1b; }
    .toast-info { background: #dbeafe; color: #1e40af; }
    .toast-warning { background: #fef3c7; color: #92400e; }
    .dark .toast-success { background: #064e3b; color: #bbf7d0; }
    .dark .toast-error { background: #7f1d1d; color: #fecaca; }
    .dark .toast-info { background: #1e3a5f; color: #bfdbfe; }
    .dark .toast-warning { background: #78350f; color: #fde68a; }
    .toast-icon { font-size: 1.1rem; font-weight: 700; line-height: 1; }
    .toast-message { font-size: 0.9rem; line-height: 1.3; }
    @media (max-width: 480px) {
      .toast-container {
        left: 1rem;
        right: 1rem;
        max-width: none;
        bottom: 4.5rem;
      }
    }
  `]
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
