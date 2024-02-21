import { createActorContext } from "@xstate/react";
import { assign, createMachine } from "xstate";

export const titleMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgEl8AXAJwHsBiCm2gOTAA9KBtABgF1EoAA61YuSrlr5BIdogCMAJgCcJAOw8AzPM08ALADZFAVnnKAHIoA0IAJ6JDiksaPGe5y8s3HlPYwF9-GzQsPEJSAGVKMCF5egAVcQAbMAAlMFRaADdIXgEkEBExCSkZOQQTYxJNXyNzTXrjcz0Wm3sETQNVby8PXrV5AzVA4IwcAmISKJi4xMoUgEEICFz+GSLxSWkC8sUDKsU94x81JsHFNTbEC80SPR4jAx5Dgz0BvRGQEPHwqejY+gAUSoYGokAWZDy61Em1KO2uXWchnMalRPHk5iaxk0VwQ8lRd2xOnkpj0L2en2+YUm0wBETAKUw0QgEKhBQ2JW2oF2+xIKLcPC0+103mMuPM8mcgsFinM6IsPDUmkpY2pkX+cTZwhhnLKDh0dweJjeis0qOUuLeTiNbiVxkMSuVQS+qom6piinotMUbE4WsKOq2eoQrhI+gMHmOBn28h0lrUBhIh2U+L0Zg0inRH2dVLdfw99HYsEo6GiJHQADNotRkPJpTwiPRc79vf6OUH4SGTGHkZiXDG43YHLL1Cp8WpzMomlp5IFnfhaCt4AVm8RocUO9zEABaAy43cq0J5ph0dewrmyYeWgy3G2KOsPPRTvyHn40jVn3Wd2WJ5QJlwtDwU6aE+8Y8NUSimP+QFGK+ar5kIiifpul4IMYI5AWaPhAaibh6GBEEmFm8hvHKajZqMR4tv8mjIXCW4IAmegkMoEaovsiidHse5DgghiqG8KYRu4JFvNmgRAA */
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
