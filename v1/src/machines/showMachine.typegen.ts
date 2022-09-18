// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignNextSegment: "NEXT" | "SEGMENT.END";
    assignScore: "SEGMENT.SCORE";
    forwardBuzz: "BUZZ";
    removeSegmentActor: "NEXT" | "SEGMENT.END";
    stopSegmentActor: "NEXT" | "SEGMENT.END" | "xstate.stop";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    outOfSegments: "NEXT" | "SEGMENT.END";
  };
  eventsCausingDelays: {};
  matchesStates: "end" | "intro" | "loading" | "ready" | "segment";
  tags: never;
}
