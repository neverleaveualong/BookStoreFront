import { HttpResponse, http } from "msw";
import { BookReviewItem } from "../models/book.model";
import { fakerKO as faker } from "@faker-js/faker";

// const mockReviewData: BookReviewItem[] = [
//   {
//     id: 1,
//     userName: "Bob",
//     content: "감사합니다",
//     createdAt: "2024-01-01",
//     score: 5,
//   },
//   {
//     id: 2,
//     userName: "Bob2",
//     content: "감사합니다",
//     createdAt: "2024-01-01",
//     score: 3,
//   },
// ];

const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: index,
    userName: faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.number.int({ min: 1, max: 5 }),
  })
);

export const reviewsById = http.get(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);

export const addReview = http.post(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(
      {
        message: "리뷰가 등록되었습니다",
      },
      {
        status: 200,
      }
    );
  }
);

export const reviewForMain = http.get("http://localhost:9999/reviews", () => {
  return HttpResponse.json(mockReviewData, {
    status: 200,
  });
});
