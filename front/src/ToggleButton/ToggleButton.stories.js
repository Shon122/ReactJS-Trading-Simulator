import { ToggleButton } from ".";

export default {
  title: "Components/ToggleButton",
  component: ToggleButton,
  argTypes: {
    property1: {
      options: ["off", "on"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "off",
    className: {},
  },
};
