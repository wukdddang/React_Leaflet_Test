import { render, screen, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import useSideBarStore from "@/store/SideBarStore";
import SideBar from "@/components/SideBar";

describe("zustand를 사용한 GlobalStore의 전역 상태가 잘 저장되는지 테스트한다.", () => {
  test("초기 상태의 SideBarOption 값을 확인한다.", () => {
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
});
