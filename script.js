// Function to set the rating stars
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

// Function to save data to local storage
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

// Function to display the chart for the past month
function displayChart() {
  const storedData = JSON.parse(localStorage.getItem('productivityData'));
  if (storedData) {
    const today = new Date().toLocaleDateString();
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString();

    const filteredData = storedData.filter(data => {
      return new Date(data.date) >= new Date(oneMonthAgo) && new Date(data.date) <= new Date(today);
    });

    const dates = filteredData.map(data => data.date);
    const ratings = filteredData.map(data => data.rating);

    const ctx = document.getElementById('progressChart').getContext('2d');
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

// Event listeners for rating stars and buttons
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
