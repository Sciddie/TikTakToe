import { describe, it, expect, vi } from "vitest";

import { flushPromises, mount } from "@vue/test-utils";
import App from "@/App.vue";
import axios from "axios";

vi.mock("axios");

it("renders properly", () => {
  const wrapper = mount(App);
  expect(wrapper.text()).toContain("Das Spiel läuft noch!");
});

it("reset gameboard", async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ url: "some-string", height: "100", width: "100" }],
  });
  axios.get.mockResolvedValueOnce({
    data: [{ url: "some-string2", height: "100", width: "100" }],
  });

  const wrapper = mount(App);
  await flushPromises();
  const resetButton = wrapper.find(".reset-btn");
  const initialImageUrl = wrapper.vm.pictureUrl;

  console.log("image Url: " + initialImageUrl);
  await resetButton.trigger("click");

  expect(wrapper.vm.pictureUrl).not.toBe(initialImageUrl);
});
