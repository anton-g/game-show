import { spawn } from 'xstate'
import { createModel } from 'xstate/lib/model'
import { QuestionActor, questionMachine } from './questionMachine'

const questions = ['a', 'b', 'c']
const segmentModel = createModel({
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
          'QUESTION.END': 'end',
        },
      },
      end: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      nextQuestion: segmentModel.assign((context) => {
        const nextQuestionIndex = context.currentQuestionIndex + 1

        const question = questions[nextQuestionIndex]
        const machine = spawn(questionMachine, question)

        return {
          currentQuestionIndex: nextQuestionIndex,
          questionMachineRef: machine,
        }
      }),
    },
  }
)
