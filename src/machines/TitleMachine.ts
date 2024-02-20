import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";

export const titleMachine = createMachine(
  {
    initial: "Intro",
    states: {
      Intro: {
        on: {
          IntroNext: {
            target: "Step1",
          },
        },
      },
      Step1: {
        on: {
          TitleRemoved: {
            actions: assign({
              titleAdded: false,
              aiEntered: false,
              selectedAi: false,
            }),
          },
          TitleAdded: {
            actions: assign({
              titleAdded: true,
            }),
          },
          EnteredAI: {
            actions: assign(({ context }) => {
              if (context.titleAdded) {
                return {
                  aiEntered: true,
                };
              }
            }),
          },
          SelectedAI: {
            actions: assign(({ context }) => {
              if (context.aiEntered) {
                return {
                  selectedAi: true,
                };
              }
            }),
          },
        },
        always: {
          guard: ({ context }) => {
            return (
              context.titleAdded && context.aiEntered && context.selectedAi
            );
          },
          target: "Step2",
        },
      },
      Step2: {
        after: {
          10000: {
            target: "Step3",
          },
        },
        on: {
          Step2Next: {
            target: "Step3",
          },
        },
      },
      Step3: {},
    },
  },
  {
    actions: {},
    guards: {},
  }
);

export const TitleMachineContext = createActorContext(titleMachine, {});
