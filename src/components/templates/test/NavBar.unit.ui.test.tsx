import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import NavBar from "../NavBar";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

describe("NavBar UI 단위 테스트를 수행한다.", () => {
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
