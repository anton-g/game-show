import { ActorRefFrom, sendParent, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { ModelContextFrom } from 'xstate/lib/model.types'
import { QuestionActor, questionMachine } from './questionMachine'

const scoreSegmentModel = createModel({})

export const scoreSegmentMachine = scoreSegmentModel.createMachine({
  id: 'scoreSegment',
  initial: 'hidden',
  context: scoreSegmentModel.initialContext,
  states: {
    hidden: {
      on: {
        NEXT: {
          target: 'visible',
        },
      },
    },
    visible: {
      on: {
        NEXT: {
          target: 'ended',
        },
      },
    },
    ended: {
      type: 'final',
      entry: sendParent('SEGMENT.END'),
    },
  },
})

export type ScoreSegmentActor = ActorRefFrom<typeof scoreSegmentMachine>

//

const questionSegmentModel = createModel(
  {
    questions: ['q-a', 'q-b', 'q-c'],
    currentQuestionIndex: -1,
    questionMachineRef: null as QuestionActor | null,
  },
  {
    events: {
      NEXT: () => ({}),
      'QUESTION.END': () => ({}),
    },
  }
)

// Workaround due to weird typings ;(
// Would be fantastic if this could be put in actions instead but: https://github.com/statelyai/xstate/pull/2426/files
const nextQuestionAssign = (
  context: ModelContextFrom<typeof questionSegmentModel>
) => {
  const nextQuestionIndex = context.currentQuestionIndex + 1

  const question = context.questions[nextQuestionIndex]
  const machine = spawn(questionMachine, question)

  return {
    currentQuestionIndex: nextQuestionIndex,
    questionMachineRef: machine,
  }
}
const nextQuestion = questionSegmentModel.assign(nextQuestionAssign, 'NEXT')
const nextQuestionOnEnd = questionSegmentModel.assign(
  nextQuestionAssign,
  'QUESTION.END'
)

export const questionSegmentMachine = questionSegmentModel.createMachine({
  id: 'questionSegment',
  initial: 'intro',
  context: questionSegmentModel.initialContext,
  states: {
    intro: {
      on: {
        NEXT: {
          target: 'question',
          actions: nextQuestion,
        },
      },
    },
    question: {
      on: {
        NEXT: {
          target: 'question',
          actions: nextQuestion,
        },
        'QUESTION.END': [
          {
            target: 'end',
            cond: (context) =>
              context.currentQuestionIndex >= context.questions.length - 1,
          },
          {
            target: 'question',
            actions: nextQuestionOnEnd,
          },
        ],
      },
    },
    end: {
      type: 'final',
      entry: sendParent('SEGMENT.END'),
    },
  },
})

export type QuestionSegmentActor = ActorRefFrom<typeof questionSegmentMachine>