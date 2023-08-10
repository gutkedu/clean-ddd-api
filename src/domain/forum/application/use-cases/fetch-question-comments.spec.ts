import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch comment questions with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('questionId') }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'questionId',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
