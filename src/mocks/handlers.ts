import { http, HttpResponse } from "msw";

const categories = [
  "sar",
  "insar",
  "ship",
  "bridge",
  "water",
  "oilspill",
  "earthquake",
];

export const handlers = [
  http.get("/data/groups?page=1&limit=10", async () => {
    await Promise.all(
      categories.map(async (category) => {
        const url = `/data?category=${category}&page=1`;

        try {
          const response = await fetch(url);
          const json = await response.json();
          return HttpResponse.json(json);
        } catch (err) {
          console.error(err);
        }
      })
    );
    // const buffer = await fetch(
    //   "/assets/images/S1A_IW_GRDH_1SDV_20230901T042927_20230901T042952_050129_060869_5AB9_SHIPD_RGB000102.png"
    // ).then((response) => response.arrayBuffer());
    // return HttpResponse.arrayBuffer(buffer, {
    //   headers: {
    //     "Content-Type":
    //       "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    //   },
    // });
  }),

  http.get("/data?category=sar&page=1", () => {
    return HttpResponse.json("sar");
  }),

  http.get("/data?category=insar&page=1", () => {
    return HttpResponse.json("insar");
  }),

  http.get("/data?category=ship&page=1", () => {
    return HttpResponse.json("ship");
  }),

  http.get("/data?category=bridge&page=1", () => {
    return HttpResponse.json("bridge");
  }),

  http.get("/data?category=water&page=1", () => {
    return HttpResponse.json("water");
  }),

  http.get("/data?category=oilspill&page=1", () => {
    return HttpResponse.json("oilspill");
  }),

  http.get("/data?category=earthquake&page=1", () => {
    return HttpResponse.json("earthquake");
  }),
];
