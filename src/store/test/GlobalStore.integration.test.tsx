import { render, renderHook, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import useGlobalStore from "@/store/GlobalStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { server } from "@/setupTests";
import SideBarContainer from "@/containers/SideBarContainer";

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  renderHook(() =>
    useGlobalStore.setState({ dataCards: [], currentDataCard: undefined })
  );
});
afterAll(() => server.close());

describe("GlobalStore 로직 통합 테스트를 수행한다.", () => {
  test("초기 currentDataCard는 undefined로 초기화된다.", () => {
    const currentDataCard = renderHook(() =>
      useGlobalStore((state) => state.currentDataCard)
    );

    expect(currentDataCard.result.current).toBeUndefined();
  });

  test("SideBarItem을 클릭하면 DataCards에 추가된다.", async () => {
    // given
    const dataCards = renderHook(() =>
      useGlobalStore((state) => state.dataCards)
    );
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const sideBarItem = screen.getByRole("SAR");
    await user.click(sideBarItem);

    const dataCard1 = screen.getByText("HwaSeong_map_2_ORIGN_RGB000102");
    await user.click(dataCard1);
    // then
    expect(dataCards.result.current.length).toBe(1);
  });

  test("같은 SideBarItem을 두 번 클릭하면 DataCards에서 제거된다.", async () => {
    // given
    const dataCards = renderHook(() =>
      useGlobalStore((state) => state.dataCards)
    );
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const sideBarItem = screen.getByRole("SAR");
    await user.click(sideBarItem);

    const dataCard1 = screen.getByText("HwaSeong_map_2_ORIGN_RGB000102");
    await user.click(dataCard1);
    await user.click(dataCard1);

    // then
    expect(dataCards.result.current.length).toBe(0);
  });

  test("현재 클릭한 DataCard의 정보를 currentDataCard에 가지고 있는다.", async () => {
    // given
    const currentDataCard = renderHook(() =>
      useGlobalStore((state) => state.currentDataCard)
    );
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const sideBarItem = screen.getByRole("SAR");
    await user.click(sideBarItem);

    // TODO: 이렇게 하드코딩하는 방법밖에 없는건가? @_@ 고민해보기
    const dataCard1 = screen.getByText("HwaSeong_map_2_ORIGN_RGB000102");
    await user.click(dataCard1);

    // then
    expect(currentDataCard.result.current?.title).toBe(
      "HwaSeong_map_2_ORIGN_RGB000102"
    );
  });

  test("같은 DataCard를 두 번 클릭하면, undefined로 바뀌고 정보가 사라진다.", async () => {
    // given
    const currentDataCard = renderHook(() =>
      useGlobalStore((state) => state.currentDataCard)
    );
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    // when
    const sideBarItem = screen.getByRole("SAR");
    await user.click(sideBarItem);

    // TODO: 이렇게 하드코딩하는 방법밖에 없는건가? @_@ 고민해보기
    const dataCard1 = screen.getByText("HwaSeong_map_2_ORIGN_RGB000102");
    await user.click(dataCard1);
    await user.click(dataCard1);

    // then
    expect(currentDataCard.result.current).toBeUndefined();
  });

  test("영상 모두 제거하기 버튼을 클릭하면 모든 영상들을 제거한다.", async () => {
    // given
    const dataCards = renderHook(() =>
      useGlobalStore((state) => state.dataCards)
    );
    const queryClient = new QueryClient();
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarContainer />
      </QueryClientProvider>
    );

    const sideBarItem = screen.getByRole("SAR");
    await user.click(sideBarItem);

    // when
    const dataCard1 = screen.getByText("HwaSeong_map_2_ORIGN_RGB000102");
    await user.click(dataCard1);
    const dataCard2 = screen.getByText("Sejong_map_2_ORIGN_RGB000102");
    await user.click(dataCard2);
    const dataCard3 = screen.getByText("Daecheong_map_2_ORIGN_RGB000102");
    await user.click(dataCard3);

    // then
    expect(dataCards.result.current.length).toBe(0);
  });
});
