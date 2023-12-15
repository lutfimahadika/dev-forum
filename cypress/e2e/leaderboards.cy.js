/**
 * - Leaderboards spec
 *   - should display Home page
 */

describe("leaderboards spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display leaderboards page when login success and click navigation leadersboards", () => {
    // mengisi email
    cy.get("input[placeholder=\"Email\"]").type("HopePoint19@gmail.com");

    // mengisi password yang salah
    cy.get("input[placeholder=\"Password\"]").type("ErvanMuhammadA");

    // menekan tombol Login
    cy.get("button")
      .contains(/^Masuk$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get("nav")
      .contains(/^Thread$/)
      .should("be.visible");
    cy.get("button").contains("Logout").should("be.visible");
    cy.get("button").contains("Logout").should("be.visible");
    cy.get("nav")
      .contains(/^Leaderboards$/)
      .click();

    cy.get("h2")
      .contains(/^Pengguna Paling Aktif$/)
      .should("be.visible");
  });
});
