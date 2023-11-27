import { render, screen, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import useSideBarStore from "@/store/SideBarStore";
import SideBar from "@/components/templates/SideBar";

describe("SideBar 컴포넌트의 통합 테스트를 수행한다.", () => {
  test("초기 상태의 SideBarOption 값은 Null이다.", () => {
    const { result } = renderHook(() =>
      useSideBarStore((state) => state.currentSideBarOption)
    );
    expect(result.current).toBeNull();
  });

  test("특정 SideBarItem을 클릭하면 currentSideBarOption에 해당 값을 저장한다.", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    const { result } = renderHook(() =>
      useSideBarStore((state) => state.currentSideBarOption)
    );

    const bookMark = await screen.getByRole("BookMark");
    await user.click(bookMark);
    expect(result.current).toEqual("BookMark");

    const rangeSearch = await screen.getByRole("RangeSearch");
    await user.click(rangeSearch);
    expect(result.current).toEqual("Range Search");

    const sar = await screen.getByRole("SAR");
    await user.click(sar);
    expect(result.current).toEqual("SAR");
  });

  test("클릭한 값들은 clickedSideBarOptions에 저장된다.", async () => {
    const user = userEvent.setup();
    render(<SideBar />);

    const { result } = renderHook(() =>
      useSideBarStore((state) => state.clickedSideBarOptions)
    );

    const bookMark = await screen.getByRole("BookMark");
    await user.click(bookMark);
    const rangeSearch = await screen.getByRole("RangeSearch");
    await user.click(rangeSearch);
    const sar = await screen.getByRole("SAR");
    await user.click(sar);

    expect(result.current).toEqual(
      expect.arrayContaining(["BookMark", "Range Search", "SAR"])
    );
  });

  test("SideBar가 닫혔을 때 SideBarItemContainer들이 렌더링되지 않아야 한다. ");
});
