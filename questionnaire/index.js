const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const basicDetailInputs = document.querySelectorAll('.basic-details');
  const inputs = document.querySelectorAll('input[type="radio"]:checked');

  const userData = getBasicDetails(basicDetailInputs);
  const categoryScores = generateCategoryScores(inputs);

  showResults(categoryScores);
  showUserData(userData);
});

function generateCategoryScores(inputs) {
  const categoryScores = {};

  inputs.forEach((input) => {
    const score = parseInt(input.getAttribute('data-score'), 10);
    const category = input.getAttribute('data-category');

    if (!categoryScores[category]) {
      categoryScores[category] = 0;
    }

    categoryScores[category] += score;
  });

  return categoryScores;
}

function showResults(categoryScores) {
  const resultsContainer = document.querySelector('.results');
  const resultsList = document.querySelector('.results-list');

  resultsList.innerHTML = '';

  for (const category in categoryScores) {
    const score = categoryScores[category];
    const feedback = getFeedbackByScore(score);

    const scoreBreakdownParagraph = document.createElement('p');
    scoreBreakdownParagraph.textContent = `${category}: ${score} - ${feedback}`;
    resultsList.appendChild(scoreBreakdownParagraph);

    resultsContainer.style.visibility = 'visible';
  }
}

function showUserData(userData) {
  const userDataParagraph = document.querySelector('.user-data');
  userDataParagraph.textContent = `You are ${userData.firstName} ${userData.lastName}, ${userData.age} years old. Let's have a look at your results 😊`;
}

function getFeedbackByScore(score) {
  const adjustedScore = Math.round(score / 3);
  const feedbackLookup = {
    0: "Needs Improvement. Let's focus on this area a bit more.",
    1: "Getting There. You've made some progress, but there's room for improvement.",
    2: "Good Job. You're doing well, but there's still a bit more to achieve.",
    3: "Excellent. You've mastered this area!",
  };

  // Return the feedback text based on the score
  return feedbackLookup[adjustedScore] || 'Unknown score; no feedback available.';
}

function getBasicDetails(inputs) {
  const details = {};
  inputs.forEach((input) => {
    const name = input.name;
    const value = input.value;

    details[name] = value;
  });

  return details;
}
