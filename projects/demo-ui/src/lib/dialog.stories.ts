import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { UiDialogComponent } from "./dialog.component";
import { UiButtonDirective } from "./button.directive";
const meta: Meta = {
  title: "UI/Dialog",
  decorators: [
    moduleMetadata({ imports: [UiDialogComponent, UiButtonDirective] }),
  ],
  tags: ["autodocs"],
  render: () => ({
    template: `<button uiButton variant="primary" (click)="dialog.open()">Open dialog</button><ui-dialog #dialog heading="Transaction details" dialogId="story-dialog"><p>Native modal semantics, keyboard focus containment, Escape dismissal, and focus restoration.</p><div class="dialog-footer"><button uiButton (click)="dialog.close()">Done</button></div></ui-dialog>`,
  }),
};
export default meta;
export const Default: StoryObj = {};
