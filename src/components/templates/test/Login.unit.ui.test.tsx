import { describe, expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import Login from "../Login";

describe("Login UI 단위 테스트를 수행한다.", () => {
  test("Login 버튼이 정상적으로 렌더링되고, Login 버튼을 클릭하면 loginPage:login-button:click argument를 넘겨준다.", () => {
    // given
    const track = vi.fn();
    const rendered = render(<Login track={track} />);

    // when
    rendered.getByText("로그인").click();

    // then
    expect(track).toHaveBeenNthCalledWith(1, "loginPage:login-button:click");
  });
});
