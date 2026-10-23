import { Directive, input } from "@angular/core";
@Directive({
  selector: "button[uiButton]",
  host: {
    "[class.ui-button]": "true",
    "[class.ui-button-primary]": "variant() === 'primary'",
    "[class.ui-button-danger]": "variant() === 'danger'",
    "[class.ui-button-small]": "size() === 'small'",
    "[attr.aria-busy]": "loading() || null",
    "[disabled]": "disabled() || loading()",
  },
})
export class UiButtonDirective {
  variant = input<"primary" | "secondary" | "danger">("secondary");
  size = input<"small" | "normal">("normal");
  disabled = input(false);
  loading = input(false);
}
