import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NavBar from "../NavBar";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

describe("NavBar UI 단위 테스트를 수행한다.", () => {
  test("검색창에 값을 입력했을 때 값이 잘 입력되는 지 테스트한다.", async () => {
    const navigate = vi.fn();
    render(<NavBar navigate={navigate} />);

    const user = userEvent.setup();
    const searchBox = await screen.getByRole("Search");

    await user.type(searchBox, "안녕하세요");

    expect(searchBox).toBeInTheDocument();
    expect(searchBox).toHaveValue("안녕하세요");
  });

  test("로그인 버튼을 클릭했을 때 새로운 페이지로 라우팅된다.", async () => {
    const navigate = vi.fn();
    const track = vi.fn();
    render(
      <>
        <NavBar navigate={navigate} />
        <Login track={track} />
      </>
    );

    const user = userEvent.setup();

    const loginButton = screen.getByRole("login");
    await user.click(loginButton);

    const loginSubmitButton = await screen.getByText("로그인");
    expect(loginSubmitButton).toBeInTheDocument();
  });
});
