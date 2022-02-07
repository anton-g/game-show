// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    update: "TICK";
    notifyParent: "";
  };
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
    "done.invoke.interval": {
      type: "done.invoke.interval";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.interval": {
      type: "error.platform.interval";
      data: unknown;
    };
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
  eventsCausingServices: {
    interval: "TICK" | "START";
  };
  eventsCausingGuards: {
    hasEnded: "";
    disabled: "START";
    notEnded: "START";
  };
  eventsCausingDelays: {};
  matchesStates: "running" | "paused" | "ended";
  tags: never;
}
