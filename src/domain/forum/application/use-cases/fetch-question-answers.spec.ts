import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('questionId'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('questionId') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('questionId') }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'questionId',
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch answer questions with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('questionId') }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'questionId',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
