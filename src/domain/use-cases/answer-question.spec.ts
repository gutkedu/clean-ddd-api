import { Answer } from "@/domain/entities/answer";
import { AnswersRepository } from "@/domain/repositories/answers-repository";
import { AnswerQuestionUseCase } from "@/domain/use-cases/answer-question";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await answerQuestion.execute({
    instructorId: "any_instructor_id",
    questionId: "any_question_id",
    content: "any_content",
  });

  expect(answer.content).toEqual("any_content");
});
