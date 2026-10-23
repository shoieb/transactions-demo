import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { UiControlDirective } from "./control.directive";
import { UiFieldComponent } from "./field.component";
const meta: Meta = {
  title: "UI/Select",
  decorators: [
    moduleMetadata({ imports: [UiControlDirective, UiFieldComponent] }),
  ],
  tags: ["autodocs"],
  args: { disabled: false, loading: false, error: "" },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:280px"><ui-field controlId="story-status" label="Status" [error]="error"><select uiControl id="story-status" [disabled]="disabled||loading" [attr.aria-busy]="loading||null" [attr.aria-invalid]="error?'true':null" [attr.aria-describedby]="error?'story-status-error':null"><option>{{loading?'Loading statuses…':'Completed'}}</option><option>In progress</option><option>Failed</option></select></ui-field></div>`,
  }),
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { args: { error: "Please select a status." } };
