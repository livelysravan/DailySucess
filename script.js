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

    const ctx = progressChartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Productivity Ratings',
          data: ratings,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
  }
}
