import { ActorRefFrom, sendParent, spawn } from 'xstate'
import { stop } from 'xstate/lib/actions'
import { createModel } from 'xstate/lib/model'
import { ModelContextFrom } from 'xstate/lib/model.types'
import { QuestionSegmentType } from '../overmind/types'
import { QuestionActor, createQuestionMachine } from './questionMachine'

export const createQuestionSegmentMachine = (segment: QuestionSegmentType) => {
  const questionSegmentModel = createModel(
    {
      segment: segment,
      questions: Object.values(segment.questions),
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
    const machine = spawn(
      createQuestionMachine(question.question),
      question.question.id
    )

    return {
      currentQuestionIndex: nextQuestionIndex,
      questionMachineRef: machine,
    }
  }

  const questionSegmentMachine = questionSegmentModel.createMachine({
    id: 'questionSegment',
    initial: 'intro',
    preserveActionOrder: true, // TODO remove in v5
    context: questionSegmentModel.initialContext,
    states: {
      intro: {
        on: {
          NEXT: {
            target: 'question',
          },
        },
      },
      question: {
        entry: questionSegmentModel.assign(nextQuestionAssign),
        exit: stop((context) => context.questionMachineRef!),
        on: {
          NEXT: [
            {
              target: 'end',
              cond: (context) =>
                context.currentQuestionIndex >= context.questions.length - 1,
            },
            {
              target: 'question',
            },
          ],
          'QUESTION.END': [
            {
              target: 'end',
              cond: (context) =>
                context.currentQuestionIndex >= context.questions.length - 1,
            },
            {
              target: 'question',
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

  return questionSegmentMachine
}

export type QuestionSegmentActor = ActorRefFrom<
  ReturnType<typeof createQuestionSegmentMachine>
>
