// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.interval": {
      type: "done.invoke.interval";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.interval": {
      type: "error.platform.interval";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    interval: "done.invoke.interval";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    notifyParent: "";
    update: "TICK";
  };
  eventsCausingServices: {
    interval: "START" | "TICK";
  };
  eventsCausingGuards: {
    disabled: "START";
    hasEnded: "";
    notEnded: "START";
  };
  eventsCausingDelays: {};
  matchesStates: "ended" | "paused" | "running";
  tags: never;
}
