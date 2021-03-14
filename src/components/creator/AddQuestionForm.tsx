import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Question } from '../../overmind/state'

type FormValue = Partial<Omit<Question, 'id'>>

function AddQuestionForm() {
  const { register, watch, handleSubmit } = useForm<FormValue>()

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    // console.log(data.answer.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Type</label>
        <select name="type" ref={register}>
          <option value="TEXT">text</option>
          <option value="SOUND">sound</option>
        </select>
      </div>
      <div>
        <label>Question</label>
        <input name="question" ref={register} />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}
