import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({ name: "John" });
  }),

  http.get("/temp", () => {
    return HttpResponse.json({
      imageUrl: "/assets/images/daecheong_preview.png",
    });
  }),
];
