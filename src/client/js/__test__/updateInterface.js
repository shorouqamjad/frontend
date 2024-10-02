export const updateInterface = (responseData) => {
  if (!responseData || typeof responseData !== 'object') {
    console.error('Received invalid data in updateInterface');
    return;
  }

  const polarityDisplay = document.getElementById('result-polarity');
  const subjectivityDisplay = document.getElementById('result-subjectivity');
  const textDisplay = document.getElementById('result-text');

  if (polarityDisplay) {
    polarityDisplay.textContent = `Polarity: ${responseData.polarity}`;
  }

  if (subjectivityDisplay) {
    subjectivityDisplay.textContent = `Subjectivity: ${responseData.subjectivity}`;
  }

  if (textDisplay) {
    textDisplay.textContent = `Text: ${responseData.text}`;
  }
};
