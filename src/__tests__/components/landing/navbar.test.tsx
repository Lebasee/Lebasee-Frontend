import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../../components/landing/heroSection/navbar";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";

const mockScrollToSection = vi.fn();
const mockSectionRefs = {
    home: { current: document.createElement("div") },
    features: { current: document.createElement("div") },
    testimonials: { current: document.createElement("div") },
    aboutUs: { current: document.createElement("div") },
    footer: { current: document.createElement("div") },
};

describe("Navbar", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Navbar scrollToSection={mockScrollToSection} sectionRefs={mockSectionRefs} />
            </BrowserRouter>
        );
    });

    test("renders all sections", () => {
        expect(screen.getByText(/خانه/i)).toBeInTheDocument();
        expect(screen.getByText(/ویژگی ها و مزایا/i)).toBeInTheDocument();
        expect(screen.getByText(/نظرات کاربران/i)).toBeInTheDocument();
        expect(screen.getByText(/درباره ما/i)).toBeInTheDocument();
        expect(screen.getByText(/تماس با ما/i)).toBeInTheDocument();
    });

    test("calls scrollToSection when section button is clicked", () => {
        fireEvent.click(screen.getByText(/خانه/i));
        expect(mockScrollToSection).toHaveBeenCalledWith(mockSectionRefs.home);

        fireEvent.click(screen.getByText(/ویژگی ها و مزایا/i));
        expect(mockScrollToSection).toHaveBeenCalledWith(mockSectionRefs.features);

        fireEvent.click(screen.getByText(/نظرات کاربران/i));
        expect(mockScrollToSection).toHaveBeenCalledWith(mockSectionRefs.testimonials);

        fireEvent.click(screen.getByText(/درباره ما/i));
        expect(mockScrollToSection).toHaveBeenCalledWith(mockSectionRefs.aboutUs);

        fireEvent.click(screen.getByText(/تماس با ما/i));
        expect(mockScrollToSection).toHaveBeenCalledWith(mockSectionRefs.footer);
    });

    test("renders login button", () => {
        expect(screen.getByText(/ورود/i)).toBeInTheDocument();
    });

    test("redirects to login page on login button click", () => {
        const loginButton = screen.getByText(/ورود/i);
        fireEvent.click(loginButton);

        expect(window.location.pathname).toBe("/auth/login");
    });
});