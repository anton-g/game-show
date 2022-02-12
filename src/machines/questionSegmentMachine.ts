import { ActorRefFrom, createMachine, sendParent, spawn, assign } from 'xstate'
import { forwardTo, stop } from 'xstate/lib/actions'
import { PlayerType } from '../components/presentation/PresentationsControl'
import {
  QuestionSegmentType,
  Segment,
  SegmentQuestion,
} from '../overmind/types'
import { SegmentMachineId } from './machines.types'
import { QuestionActor, createQuestionMachine } from './questionMachine'

export const createQuestionSegmentMachine = (segment: QuestionSegmentType) => {
  const questionSegmentMachine = createMachine(
    {
      id: SegmentMachineId.QuestionSegment,
      schema: {
        context: {} as {
          segment: Segment
          questions: SegmentQuestion[]
          currentQuestionIndex: number
          questionMachineRef: QuestionActor | null
        },
        events: {} as
          | { type: 'NEXT' }
          | { type: 'BUZZ'; team: PlayerType['id'] }
          | { type: 'QUESTION.END' }
          | {
              type: 'QUESTION.SCORE'
              scores: { team: PlayerType['id']; score: number }[]
            },
      },
      tsTypes: {} as import('./questionSegmentMachine.typegen').Typegen0,
      initial: 'intro',
      preserveActionOrder: true, // TODO remove in v5
      context: {
        segment: segment,
        questions: Object.values(segment.questions),
        currentQuestionIndex: -1,
        questionMachineRef: null as QuestionActor | null,
      },
      states: {
        intro: {
          on: {
            NEXT: {
              target: 'question',
            },
          },
        },
        question: {
          entry: 'nextQuestionAssign',
          exit: 'stopQuestionActor',
          on: {
            NEXT: [
              {
                target: 'end',
                cond: 'outOfQuestions',
              },
              {
                target: 'question',
              },
            ],
            'QUESTION.END': [
              {
                target: 'end',
                cond: 'outOfQuestions',
              },
              {
                target: 'question',
              },
            ],
            'QUESTION.SCORE': {
              actions: 'sendScoreToParent',
            },
            BUZZ: {
              actions: 'forwardBuzz',
            },
          },
        },
        end: {
          type: 'final',
          entry: 'notifyParent',
        },
      },
    },
    {
      actions: {
        notifyParent: sendParent('SEGMENT.END'),
        stopQuestionActor: stop((context) => context.questionMachineRef!),
        sendScoreToParent: sendParent((_, event) => ({
          type: 'SEGMENT.SCORE',
          scores: event.scores,
        })),
        nextQuestionAssign: assign((context) => {
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
        }),
        forwardBuzz: forwardTo((context) => context.questionMachineRef!),
      },
      guards: {
        outOfQuestions: (context) =>
          context.currentQuestionIndex >= context.questions.length - 1,
      },
    }
  )

  return questionSegmentMachine
}

export type QuestionSegmentActor = ActorRefFrom<
  ReturnType<typeof createQuestionSegmentMachine>
>
