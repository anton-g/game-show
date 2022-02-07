// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    setTeam: "BUZZ";
    updateScore: "CORRECT";
    resetTeam: "INCORRECT";
    createTimer: "xstate.init";
    startTimer: "START" | "INCORRECT";
    pauseTimer: "BUZZ";
    notifyParent: "END";
  };
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    skipWaitingForReveal: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "intro"
    | "idle"
    | "buzzed"
    | "waitingForReveal"
    | "revealed"
    | "ended";
  tags: never;
}
