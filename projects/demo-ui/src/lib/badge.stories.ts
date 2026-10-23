import { Meta, StoryObj } from "@storybook/angular";
import { UiBadgeComponent } from "./badge.component";
const meta: Meta<UiBadgeComponent> = {
  title: "UI/Status badge",
  component: UiBadgeComponent,
  tags: ["autodocs"],
  args: { status: "Completed" },
  argTypes: {
    status: {
      control: "select",
      options: ["Completed", "In progress", "Failed"],
    },
  },
};
export default meta;
type Story = StoryObj<UiBadgeComponent>;
export const Completed: Story = {};
export const InProgress: Story = { args: { status: "In progress" } };
export const Failed: Story = { args: { status: "Failed" } };
