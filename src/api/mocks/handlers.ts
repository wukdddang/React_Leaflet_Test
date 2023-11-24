import { http, HttpResponse } from "msw";
import SARData from "@/api/data/sar.json";
import InSARData from "@/api/data/insar.json";
import ShipData from "@/api/data/ship.json";
import BridgeData from "@/api/data/bridge.json";
import WaterData from "@/api/data/water.json";
import EarthquakeData from "@/api/data/earthquake.json";
import OilspillData from "@/api/data/oilspill.json";

export const handlers = [
  http.get("/data", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    switch (category) {
      case "ship":
        return HttpResponse.json(ShipData);
      case "sar":
        return HttpResponse.json(SARData);
      case "insar":
        return HttpResponse.json(InSARData);
      case "bridge":
        return HttpResponse.json(BridgeData);
      case "water":
        return HttpResponse.json(WaterData);
      case "earthquake":
        return HttpResponse.json(EarthquakeData);
      case "oilspill":
        return HttpResponse.json(OilspillData);
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
];
