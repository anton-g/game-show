import { ActorRefFrom, sendParent, spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { QuestionActor, questionMachine } from './questionMachine'

const segmentModel = createModel({
  questions: ['q-a', 'q-b', 'q-c'],
  currentQuestionIndex: -1,
  questionMachineRef: null as QuestionActor | null,
}) // TODO should probably type events but weird TS issue so I give up D: https://github.com/statelyai/xstate/pull/2426/files

export const segmentMachine = segmentModel.createMachine(
  {
    id: 'segment',
    initial: 'intro',
    context: segmentModel.initialContext,
    states: {
      intro: {
        on: {
          NEXT: {
            target: 'question',
            actions: 'nextQuestion',
          },
        },
      },
      question: {
        on: {
          NEXT: {
            target: 'question',
            actions: 'nextQuestion',
          },
          'QUESTION.END': [
            {
              target: 'end',
              cond: (context) =>
                context.currentQuestionIndex >= context.questions.length - 1,
            },
            {
              target: 'question',
              actions: 'nextQuestion',
            },
          ],
        },
      },
      end: {
        type: 'final',
        entry: sendParent('SEGMENT.END'),
      },
    },
  },
  {
    actions: {
      nextQuestion: segmentModel.assign((context) => {
        const nextQuestionIndex = context.currentQuestionIndex + 1

        const question = context.questions[nextQuestionIndex]
        const machine = spawn(questionMachine, question)

        return {
          currentQuestionIndex: nextQuestionIndex,
          questionMachineRef: machine,
        }
      }),
    },
  }
)

export type SegmentActor = ActorRefFrom<typeof segmentMachine>
