import { render, screen } from "@testing-library/react";
import { server } from "@/setupTests"; // Import the MSW server setup
import SideBarItemContainer from "@/containers/SideBarItemContainer";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { BsBookmarks } from "react-icons/bs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SideBarItemContainer 로직 테스트를 수행한다.", () => {
  test("SideBarItemContainer를 렌더링 한다.", async () => {
    // given
    const queryClient = new QueryClient();

    // when
    render(
      <QueryClientProvider client={queryClient}>
        <SideBarItemContainer
          text={"BookMark"}
          icon={<BsBookmarks size={20} role="BookMark" />}
        />
      </QueryClientProvider>
    );

    // then
    const sideBarItemContainer = await screen.getByRole("BookMark");
    expect(sideBarItemContainer).toBeInTheDocument();
  });

  test("SideBarItemContainer를 클릭했을 때 이벤트가 발생한다.", async () => {
    // given
    const queryClient = new QueryClient();
    const track = vi.fn();
    const rendered = render(
      <QueryClientProvider client={queryClient}>
        <SideBarItemContainer
          text={"BookMark"}
          icon={<BsBookmarks size={20} role="BookMark" />}
          track={track}
        />
      </QueryClientProvider>
    );

    // when
    rendered.getByText("BookMark").click();

    // then
    expect(track).toHaveBeenNthCalledWith(
      1,
      "homePage:sideBarItemContainer:click"
    );
  });
});
