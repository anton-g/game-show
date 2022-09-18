// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    sendScoreToParent: "QUESTION.SCORE";
    forwardBuzz: "BUZZ";
    stopQuestionActor: "xstate.init";
    nextQuestionAssign: "NEXT" | "QUESTION.END";
    notifyParent: "NEXT" | "QUESTION.END";
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
    outOfQuestions: "NEXT" | "QUESTION.END";
  };
  eventsCausingDelays: {};
  matchesStates: "intro" | "question" | "end";
  tags: never;
}
