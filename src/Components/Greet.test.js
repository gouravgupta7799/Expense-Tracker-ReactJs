import { render, screen } from "@testing-library/react";
import Greet from './Greet'

test('renders Hello World as a text', () => {
  render(<Greet />);

  const helloworldElement = screen.getAllByText('Hello World', { exact: false });
  expect(helloworldElement)
});