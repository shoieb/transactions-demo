import { Component, ElementRef, input, output, viewChild } from "@angular/core";
import { UiButtonDirective } from "./button.directive";
@Component({
  selector: "ui-dialog",
  imports: [UiButtonDirective],
  template: `<dialog
    #dialog
    [attr.aria-labelledby]="dialogId() + '-title'"
    (cancel)="onCancel($event)"
    (keydown)="trapFocus($event)"
    (close)="onClosed()"
  >
    <header class="dialog-header">
      <h2 [id]="dialogId() + '-title'">{{ heading() }}</h2>
      <button
        uiButton
        type="button"
        aria-label="Close dialog"
        (click)="close()"
      >
        ×
      </button>
    </header>
    <ng-content />
  </dialog>`,
})
export class UiDialogComponent {
  heading = input.required<string>();
  dialogId = input("editor");
  fallbackFocusId = input("");
  dismissed = output();
  private element = viewChild.required<ElementRef<HTMLDialogElement>>("dialog");
  private returnFocus: HTMLElement | null = null;
  open() {
    const active = document.activeElement as HTMLElement | null;
    this.returnFocus =
      active?.closest(".action-disclosure")?.querySelector("button") ?? active;
    this.element().nativeElement.showModal();
  }
  onClosed() {
    if (this.returnFocus?.isConnected && !this.returnFocus.matches(":disabled"))
      this.returnFocus.focus();
    else if (this.fallbackFocusId())
      document.getElementById(this.fallbackFocusId())?.focus();
    this.dismissed.emit();
  }
  trapFocus(event: KeyboardEvent) {
    if (event.key !== "Tab") return;
    const controls = [
      ...this.element().nativeElement.querySelectorAll<HTMLElement>(
        'button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]',
      ),
    ].filter((el) => el.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  close() {
    this.element().nativeElement.close();
  }
  onCancel(event: Event) {
    event.preventDefault();
    this.close();
  }
}
