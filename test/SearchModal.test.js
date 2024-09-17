import { render, fireEvent } from '@testing-library/react-native';
import SearchModal from 'e:\side projects\todoApp\components\modals\SearchModal';

test('Should open the modal when the energy icon is pressed', () => {
  const { getByTestId } = render(<SearchModal />);
  const energyIcon = getByTestId('energy-icon');
  const modal = getByTestId('modal');

  expect(modal).not.toBeVisible();

  fireEvent.press(energyIcon);

  expect(modal).toBeVisible();
});


test('Should close the modal when the close button is pressed', () => {
  const { getByTestId } = render(<SearchModal />);
  const closeButton = getByTestId('close-button');
  const modal = getByTestId('modal');

  expect(modal).toBeVisible();

  fireEvent.press(closeButton);

  expect(modal).not.toBeVisible();
});

// Test case: Should display the detailed analysis description in the modal body
test('Should display the detailed analysis description in the modal body', () => {
  const { getByTestId } = render(<SearchModal />);
  const modalBody = getByTestId('modal-body');
  const detailedAnalysisDescription = getByText(
    /✨ Sit ut minim do quis dolor nostrud culpa proident. Excepteur qui id sint do incididunt dolor ipsum velit culpa eu deserunt tempor. Nostrud nisi sit ullamco duis qui tempor veniam magna eu amet mollit cillum. Ea fugiat incididunt ad nulla. Voluptate ut pariatur veniam adipisicing magna consectetur. Dolor est non laborum minim laborum irure sunt et sit nisi officia irure. Ea Lorem et nulla consectetur fugiat nulla enim./i
  );

  expect(modalBody).toContainElement(detailedAnalysisDescription);
}); 