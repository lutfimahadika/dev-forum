/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login page correctly", () => {
    // verifikasi elemen yang harus tampak pada halaman login
    cy.get("input[placeholder=\"Email\"]").should("be.visible");
    cy.get("input[placeholder=\"Password\"]").should("be.visible");
    cy.get("button")
      .contains(/^Masuk$/)
      .should("be.visible");
  });

  it("should display alert when email is empty", () => {
    // klik tombol Masuk tanpa mengisi username
    cy.get("button")
      .contains(/^Masuk$/)
      .click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill out this field");
    });
  });

  it("should display alert when email is empty", () => {
    // mengisi email
    cy.get("input[placeholder=\"Email\"]").type("email@example.com");

    // klik tombol login tanpa mengisi password
    cy.get("button")
      .contains(/^Masuk$/)
      .click();
    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please fill out this field");
    });
  });

  it("should display alert when email and password are wrong", () => {
    // mengisi email
    cy.get("input[placeholder=\"Email\"]").type("emaill@example.com");

    // mengisi password yang salah
    cy.get("input[placeholder=\"Password\"]").type("password");

    // menekan tombol Login
    cy.get("button")
      .contains(/^Masuk$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("UEmail or password is wrong");
    });
  });

  it("should display homepage when email and password are correct", () => {
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
  });
});
