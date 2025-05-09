import { HttpResponse, http } from "msw";
import { BookReviewItem } from "../models/book.model";
import { fakerKO as faker } from "@faker-js/faker";
import { Banner } from "../models/banner.model";

const bannersData: Banner[] = [
  {
    id: 1,
    title: "배너 1 제목",
    description: "Bnner 1 Description",
    image: "http://picsum.photos/id/111/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
  {
    id: 2,
    title: "배너 2 제목",
    description: "Bnner 2 Description",
    image: "http://picsum.photos/id/222/1200/400",
    url: "http://some.url",
    target: "_self",
  },
  {
    id: 3,
    title: "배너 3 제목",
    description: "Bnner 3 Description",
    image: "http://picsum.photos/id/33/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
];

export const banners = http.get("http://localhost:9999/banners", () => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
