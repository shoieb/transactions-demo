import { moduleMetadata, Meta, StoryObj } from "@storybook/angular";
import { UiTransactionTableComponent } from "./table.component";
import { UiTableStateComponent } from "./state.component";
const rows = [
  {
    id: "1",
    description: "Payment from Alex Morgan",
    date: "2025-10-22",
    amount: 199,
    status: "Completed",
  },
  {
    id: "2",
    description: "Payment refund to #00910",
    date: "2025-10-23",
    amount: -120,
    status: "In progress",
  },
  {
    id: "3",
    description: "Payment to Studio North",
    date: "2025-10-24",
    amount: -450,
    status: "Failed",
  },
];
const meta: Meta = {
  title: "UI/Transaction table",
  decorators: [
    moduleMetadata({
      imports: [UiTransactionTableComponent, UiTableStateComponent],
    }),
  ],
  tags: ["autodocs"],
  args: { state: "populated", readOnly: false, rows },
  render: (args) => ({
    props: args,
    template: `<section class="transaction-panel" aria-label="Transaction table example">@if(state==='populated'){<ui-transaction-table [rows]="rows" [readOnly]="readOnly"/>}@else{<ui-table-state [kind]="state" [heading]="state==='loading'?'Loading transactions…':state==='error'?'Unable to load transactions':'No transactions found'" [description]="state==='error'?'Please try again.':''" [actionLabel]="state==='error'?'Try again':''"/>}</section>`,
  }),
};
export default meta;
type Story = StoryObj;
export const Populated: Story = {};
export const Loading: Story = { args: { state: "loading" } };
export const Empty: Story = { args: { state: "empty" } };
export const Error: Story = { args: { state: "error" } };
export const ReadOnly: Story = { args: { readOnly: true } };
