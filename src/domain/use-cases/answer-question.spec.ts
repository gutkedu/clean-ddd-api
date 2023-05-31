import { test, expect } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: "any_instructor_id",
    questionId: "any_question_id",
    content: "any_content",
  });

  expect(answer.content).toEqual("any_content");
});
