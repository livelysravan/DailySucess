const stars = document.querySelectorAll('.star');
const responseButtons = document.querySelectorAll('.response-btn');
const submitBtn = document.getElementById('submitBtn');
const chartBtn = document.getElementById('chartBtn');
const progressChartCanvas = document.getElementById('progressChart');

let productivityData = [];

stars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute('data-value'));
    setRating(rating);
  });
});

responseButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  });
});

submitBtn.addEventListener('click', () => {
  const success = (document.getElementById('yesBtn').checked) ? true : false;
  const rating = parseInt(document.getElementById('satisfactionRating').value);
  const note = document.getElementById('noteField').value;
  const date = new Date().toLocaleDateString();

  const data = {
    success,
    rating,
    note,
    date
  };

  productivityData.push(data);
  saveToLocalStorage();
});

chartBtn.addEventListener('click', () => {
  displayChart();
});

function setRating(rating) {
  const hiddenInput = document.getElementById('satisfactionRating');
  hiddenInput.value = rating;

  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem('productivityData', JSON.stringify(productivityData));
}

function displayChart() {
  const storedData = JSON.parse(localStorage.getItem('productivityData'));
  if (storedData) {
    const dates = storedData.map(data => data.date);
    const ratings = storedData.map(data => data.rating);
    const notes = storedData.map(data => data.note);

    const ctx = progressChartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Productivity Ratings',
          data: ratings,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointRadius: 5,
          pointHoverRadius: 8,
          lineTension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            min: 1,  // Set the minimum value of y-axis to 1
            max: 10, // Set the maximum value of y-axis to 10
            title: {
              display: true,
              text: 'Rating'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });

    const notesList = document.createElement('ul');
    notesList.classList.add('notes-list');

    notes.forEach(note => {
      const listItem = document.createElement('li');
      listItem.textContent = note;
      notesList.appendChild(listItem);
    });

    const chartContainer = document.querySelector('.chart-container');
    chartContainer.innerHTML = ''; // Clear previous content
    chartContainer.appendChild(notesList); // Append notes list after clearing
    chartContainer.appendChild(progressChartCanvas); // Append chart canvas
    chartContainer.style.display = 'block'; // Show the chart container
  }
}
