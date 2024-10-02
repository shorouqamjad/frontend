import { processSubmission } from '../formHandler';
import * as interfaceUpdater from '../updateInterface';

describe('processSubmission', () => {
  beforeAll(() => {
    // Mock the global fetch API
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    // Set up a basic HTML mockup for the form
    document.body.innerHTML = `
      <form id="submission-form">
        <input id="url-input" type="text" value="https://example.com">
        <div id="result-polarity"></div>
        <div id="result-subjectivity"></div>
        <div id="result-text"></div>
      </form>
    `;

    // Spy on the interfaceUpdater.updateInterface and mock its implementation
    jest.spyOn(interfaceUpdater, 'updateInterface').mockImplementation(() => {});
  });

  test('Should confirm processSubmission is a function', () => {
    expect(typeof processSubmission).toBe('function');
  });

  test('Should prevent form from submitting by default', () => {
    const mockEvent = { preventDefault: jest.fn() };
    processSubmission(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test('Should call updateInterface with the data from the fetch response', async () => {
    // Mock fetch to return a resolved promise containing expected structure
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        polarity: 'positive',
        subjectivity: 'subjective',
        text: 'Sample text',
      }),
    });

    const mockEvent = { preventDefault: jest.fn() };
    await processSubmission(mockEvent);

    // Ensure that updateInterface is invoked with the correct response data
    expect(interfaceUpdater.updateInterface).toHaveBeenCalledWith({
      polarity: 'positive',
      subjectivity: 'subjective',
      text: 'Sample text',
    });
  });
});
