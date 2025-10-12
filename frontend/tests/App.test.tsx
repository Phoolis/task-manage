import App from '../src/App'
import { test, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

test("renders App component", () => {
  render(<App />);
  const header = screen.getByText(/Task manager/i);
  expect(header).toBeInTheDocument();
});

