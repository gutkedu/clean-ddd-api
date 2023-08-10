import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionProps } from '@/domain/forum/enterprise/entities/question'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export function makeQuestionComment(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionComment
}
