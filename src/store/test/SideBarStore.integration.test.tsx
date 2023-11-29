import { render, screen, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import useSideBarStore from "@/store/SideBarStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/setupTests";
import SideBarContainer from "@/containers/SideBarContainer";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  renderHook(() => useSideBarStore.setState({ isSideBarOpened: false }));
});
afterAll(() => server.close());

describe("SideBarStore 로직 통합 테스트를 수행한다.", () => {
  test("초기 상태의 SideBarOption 값은 Null이다.", () => {
    const { result } = renderHook(() =>
      useSideBarStore((state) => state.currentSideBarOption)
    );
    expect(result.current).toBeNull();
  });

  test("특정 SideBarItem을 클릭하면 currentSideBarOption에 해당 값을 저장한다.", async () => {
    // given
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    const { result } = renderHook(() =>
      useSideBarStore((state) => state.currentSideBarOption)
    );

    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const bookMark = screen.getByRole("BookMark");
    await user.click(bookMark);

    // then
    expect(result.current).toEqual("BookMark");

    // when
    const rangeSearch = screen.getByRole("RangeSearch");
    await user.click(rangeSearch);

    // then
    expect(result.current).toEqual("Range Search");

    // when
    const sar = screen.getByRole("SAR");
    await user.click(sar);
    // then
    expect(result.current).toEqual("SAR");

    queryClient.clear();
  });

  test("클릭한 값들은 clickedSideBarOptions에 저장된다.", async () => {
    // given
    const user = userEvent.setup();
    const queryClient = new QueryClient();
    const { result } = renderHook(() =>
      useSideBarStore((state) => state.clickedSideBarOptions)
    );

    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const bookMark = screen.getByRole("BookMark");
    const rangeSearch = screen.getByRole("RangeSearch");
    const sar = screen.getByRole("SAR");

    await user.click(bookMark);
    await user.click(rangeSearch);
    await user.click(sar);

    // then
    expect(result.current).toEqual(
      expect.arrayContaining(["BookMark", "Range Search", "SAR"])
    );
  });
});
