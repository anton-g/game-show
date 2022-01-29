import { ActorRefFrom, createMachine, sendParent, spawn, assign } from 'xstate'
import { stop } from 'xstate/lib/actions'
import { PlayerType } from '../components/admin/Admin'
import {
  QuestionSegmentType,
  Segment,
  SegmentQuestion,
} from '../overmind/types'
import { QuestionActor, createQuestionMachine } from './questionMachine'

export const createQuestionSegmentMachine = (segment: QuestionSegmentType) => {
  const questionSegmentMachine = createMachine(
    {
      id: 'questionSegment',
      schema: {
        context: {} as {
          segment: Segment
          questions: SegmentQuestion[]
          currentQuestionIndex: number
          questionMachineRef: QuestionActor | null
        },
        events: {} as
          | { type: 'NEXT' }
          | { type: 'QUESTION.END' }
          | { type: 'QUESTION.SCORE'; team: PlayerType['id']; score: number },
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
          team: event.team,
          score: event.score,
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
