import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import Login from "../Login";

describe("Login 로직 단위 테스트", () => {
  test("Login 버튼을 클릭하면 loginPage:login-button:click argument를 넘겨준다.", () => {
    // given
    const track = vi.fn();
    const rendered = render(<Login track={track} />);

    // when
    rendered.getByText("Login").click();

    // then
    expect(track).toHaveBeenNthCalledWith(1, "loginPage:login-button:click");
  });
});
