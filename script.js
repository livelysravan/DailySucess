function setRating(rating) {
  const hiddenInput = document.getElementById('satisfactionRating');
  hiddenInput.value = rating;

  const stars = document.querySelectorAll('.star'):
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
 the     }
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

  if (storedData && storedData.length > 0) {
    const dates = storedData.map(data => data.date);
    const ratings = storedData.map(data => data.rating);

    const ctx = document.getElementById('progressChart').getContext('2d');

    // Clear the existing chart (if any) to prevent duplication
    Chart.helpers.each(Chart.instances, instance => {
      instance.destroy();
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Satisfaction Ratings',
          data: ratings,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
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
