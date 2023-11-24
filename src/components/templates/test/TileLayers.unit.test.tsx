import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TileLayers from "../TileLayers";
import userEvent from "@testing-library/user-event";

describe("TileLayers 컴포넌트 테스트", () => {
  test("TileLayer 버튼을 클릭하면, tileLayers:tilelayer-button:click이 argument로 전달된다.", async () => {
    // given
    const mockSetCurrentTileLayer = vi.fn();
    const track = vi.fn();
    const user = userEvent.setup();
    render(
      <TileLayers
        setCurrentTileLayer={mockSetCurrentTileLayer}
        layers={["google_satellite", "leaflet_dark", "leaflet_osm"]}
        track={track}
        handleMouseEnter={() => {}}
        handleMouseLeave={() => {}}
      />
    );

    // when
    const tileLayerButton = screen.getByRole("google_satellite");
    await user.click(tileLayerButton);

    // then
    expect(track).toHaveBeenNthCalledWith(
      1,
      "tileLayers:tilelayer-button:click"
    );
    expect(mockSetCurrentTileLayer).toHaveBeenNthCalledWith(
      1,
      "google_satellite"
    );

    await user.click(tileLayerButton);
  });
});
