import { device, element, by } from "detox";
import { kebabCase } from "lodash";
import moment from "moment";

describe("HistoryScreen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should be able mark as done", async () => {
    await element(by.id("email-input")).typeText(
      "manoel.martins@muralis.com.br"
    );
    await element(by.id("password-input")).typeText("123456");
    await element(by.id("password-input")).typeText("\n");
    await element(by.id("login-button")).tap();

    // await element(by.text("COSTAS")).tap();
    await element(by.text("BÍCEPS")).tap();

    await element(by.text("Rosca Scott barra w")).tap();

    await element(by.text("Marcar como realizado")).tap();

    const time = moment().utc().format("HH:mm");
    const name = "Rosca Scott barra w";
    const group = "Bíceps";
    const kebabCaseTime = kebabCase(time);
    const kebabCaseName = kebabCase(name);

    await expect(
      element(by.text("Parabéns! Exercício registrado no seu histórico."))
    ).toBeVisible();
    await expect(
      element(
        by
          .id(`${kebabCaseName}.${kebabCaseTime}`)
          .withDescendant(by.text(name))
          .withDescendant(by.text(group))
      )
    ).toBeVisible();
  });
});
