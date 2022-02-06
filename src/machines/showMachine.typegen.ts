// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignScore: "SEGMENT.SCORE";
    forwardBuzz: "BUZZ";
    stopSegmentActor: "xstate.init";
    assignNextSegment: "NEXT" | "SEGMENT.END";
    removeSegmentActor: "NEXT" | "SEGMENT.END";
  };
  internalEvents: {
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
    outOfSegments: "NEXT" | "SEGMENT.END";
  };
  eventsCausingDelays: {};
  matchesStates: "loading" | "ready" | "intro" | "segment" | "end";
  tags: never;
}
