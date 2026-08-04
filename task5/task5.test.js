import { formValidator, required } from "./form.js";
import { init as accordianInit } from "./accordion.js";
import { init as navInit } from "./navbar.js"
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

beforeEach(() =>{
    jest.resetModules();
    document.body.innerHTML = "";
});

describe("test form validator", () => {
    test("error message appeared", () =>{
        document.body.innerHTML =  `
        <style>
	.error{
		display: none;
		color: red;
	}
	</style>
	<main>
		<form id='form'>
			<input type="name" name="name" id="name">
		 	<span class="error" data-testid="error">Invalid input</span>
		</form>
	</main>`;
        
    const form = document.querySelector("#form");
    const input = form.querySelector("input");
    const Validator = new formValidator(form, {
        name: [required],
    });
    Validator.runChecks(input);
    expect(screen.getByTestId("error")).toBeVisible();
    });
});

describe("test accordion", () => {
    test("accordion open", () =>{
        document.body.innerHTML =  `
       <style>
	.faqs {
	  margin-top: 3rem;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  gap: 2rem;
	}

	.faqs > .faq {
	  width: 100%;
	  border: 1px solid #fff;
	  border-radius: 5px;
	  padding: 4px 15px;
	}

	.faqs > .faq > .accordian {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 4px 0;
	}

	.faqs > .faq > .accordian > button {
	  border: none;
	  background-color: transparent;
	}

	.faqs > .faq > p {
	  text-align: left;
	  max-height: 0px;
	  overflow-y: hidden;
	  color: #ffffff99;
	  transition: 600ms ease-in;
	}

	.accordian-open {
	  max-height: 500px !important;
	}
	</style>
	 <div class="faqs">
          <div class="faq">
            <div class="accordian">
              <h4>Is my data secure in a SaaS model?</h4>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  class="bi bi-arrow-right-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
              </button>
            </div>
            <p>
              Yes, reputable SaaS providers use industry-standard security,
              including end-to-end data encryption, automated backups, and
              multi-factor authentication (MFA) to protect your sensitive
              corporate data.
            </p>
          </div>
	 </div>`;

     const accordian = document.querySelector(".accordian");
     const p = document.querySelector("p");
     accordianInit();
     accordian.click();
     expect(p.classList.value).toBe("accordian-open");
    });
});

describe("navbar check", () =>{
    test("is navbar visible", () =>{
        document.body.innerHTML = `
        <style>
	.nav-mobile {
	  display: none;
	  padding: 0 36px;
	  width: 100%;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  gap: 20px;
	}

	.nav-mobile .btn-container {
	  width: 100%;
	  display: flex;
	  justify-content: flex-end;
	}

	.nav-mobile .btn-container .hamburger {
	  border: none;
	  background-color: #c35bff;
	  border-radius: 5px;
	  padding: 2px;
	}

	.nav-mobile .btn-container .hamburger svg {
	  fill: white;
	  width: 28px;
	  height: 28px;
	}

	.nav-mobile .btn-container .hamburger main {
	  margin-top: 3rem;
	}

	.nav-mobile .nav-container {
	  background-color: #fff;
	  color: #c35bff;
	  height: 0px;
	  width: 100%;
	  border-radius: 20px;
	  overflow: hidden;
	  transition: 300ms;
	}

	.open {
	  height: 500px !important;
	}

	.nav-mobile .nav-container ul li {
	  margin: 36px;
	  font-size: 20px;
	  padding-bottom: 16px;
	}

	.nav-mobile .nav-container ul li .theme-btn {
	  border: none;
	  background-color: transparent;
	  display: flex;
	  place-content: center;
	  flex-wrap: wrap;
	}

	.nav-mobile .nav-container ul li .theme-btn svg {
	  fill: #c35bff;
	  width: 24px;
	  height: 24px;
	}
	</style>
	<main>
		<nav class="nav-mobile">
		<div class="btn-container">
		  <button class="hamburger" tabindex="-1">
		    <svg
		      xmlns="http://www.w3.org/2000/svg"
		      width="24"
		      height="24"
		      fill="currentColor"
		      class="bi bi-list"
		      viewBox="0 0 16 16"
		    >
		      <path
			fill-rule="evenodd"
			d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
		      />
		    </svg>
		  </button>
		</div>

		<div class="nav-container">
		  <ul>
		    <li aria-current="page" class="nav-links">
		      <a href="index.html" tabindex="-1">Home</a>
		    </li>
		    <li class="nav-links">
		      <a href="about.html" tabindex="-1">About</a>
		    </li>
		    <li class="nav-links">
		      <a href="services.html" tabindex="-1">Services</a>
		    </li>
		    <li class="nav-links">
		      <a href="team.html" tabindex="-1">Team</a>
		    </li>
		    <li class="nav-links">
		      <a href="contact.html" tabindex="-1">Contact</a>
		    </li>
		    <li>
		      <button class="theme-btn" aria-pressed="false" tabindex="-1">
			<svg
			  xmlns="http://www.w3.org/2000/svg"
			  width="16"
			  height="16"
			  class="bi bi-moon-stars-fill"
			  viewBox="0 0 16 16"
			>
			  <path
			    d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
			  />
			  <path
			    d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
			  />
			</svg>
		      </button>
		    </li>
		  </ul>
		</div>
	      </nav>
	</main>`;
    const hamburger = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-container");
    navInit();
    hamburger.click();
    expect(navContainer.classList.value).toContain("open")
    expect(navContainer.getAttribute("aria-expanded")).toBe("true");
    });
});