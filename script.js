function setRating(rating) {
  const hiddenInput = document.getElementById('satisfactionRating');
  hiddenInput.value = rating;

  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

function saveToLocalStorage() {
  const success = document.getElementById('yesBtn').checked;
  const rating = parseInt(document.getElementById('satisfactionRating').value);
  const note = document.getElementById('noteField').value;
  const date = new Date().toLocaleDateString();

  const data = {
    success,
    rating,
    note,
    date
  };

  let storedData = JSON.parse(localStorage.getItem('productivityData')) || [];
  storedData.push(data);
  localStorage.setItem('productivityData', JSON.stringify(storedData));
}

function displayChart() {
  const storedData = JSON.parse(localStorage.getItem('productivityData'));
  if (storedData) {
    // Chart display code (as mentioned previously)
    // ...
  }
}

function displayAllNotes() {
  const storedData = JSON.parse(localStorage.getItem('productivityData'));
  if (storedData) {
    const notesContainer = document.getElementById('allNotes');
    notesContainer.innerHTML = ''; // Clear previous content

    storedData.forEach(data => {
      const note = data.note;
      const date = data.date;

      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `<strong>${date}</strong>: ${note}`;
      notesContainer.appendChild(noteElement);
    });
  }
}

document.addEventListener('DOMContentLoaded', displayChart);

const stars = document.querySelectorAll('.star');
stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-value'));
    setRating(rating);
  });
});

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  saveToLocalStorage();
});

const showChartBtn = document.getElementById('showChartBtn');
showChartBtn.addEventListener('click', () => {
  displayChart();
});

const showAllNotesBtn = document.getElementById('showAllNotesBtn');
showAllNotesBtn.addEventListener('click', () => {
  displayAllNotes();
});
