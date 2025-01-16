  // Bar Chart
  const barCtx = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Invoices',
        data: [10, 20, 15, 30, 25, 35],
        backgroundColor: '#4f46e5'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  // Column Chart (treated as bar chart with vertical orientation)
  const columnCtx = document.getElementById('columnChart').getContext('2d');
  const columnChart = new Chart(columnCtx, {
    type: 'bar',
    data: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [{
        label: 'Sales',
        data: [120, 200, 150, 170],
        backgroundColor: ['#4f46e5', '#4338ca', '#6b46ca', '#4f46e5']
      }]
    },
    options: {
      responsive: true,
      indexAxis: 'y', // Makes it horizontal
      plugins: {
        legend: { display: true }
      }
    }
  });

  // Doughnut Chart
  const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
  const doughnutChart = new Chart(doughnutCtx, {
    type: 'doughnut',
    data: {
      labels: ['Paid', 'Pending', 'Overdue'],
      datasets: [{
        label: 'Invoice Status',
        data: [60, 25, 15],
        backgroundColor: ['#4f46e5', '#4338ca', '#4b5563']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  // Pie Chart
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Services', 'Products', 'Subscriptions'],
      datasets: [{
        label: 'Revenue Sources',
        data: [50, 30, 20],
        backgroundColor: ['#4f46e5', '#4338ca', '#6b46ca']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });

  document.querySelector('.btn').addEventListener('click', function () {
    // Select the container you want to convert to PDF
    const container = document.querySelector('.content'); // Adjust if you want specific content
    
    // Define options for the PDF
    const options = {
      filename: 'report.pdf', // Name of the generated PDF file
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 }, // Increase scale for better quality
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().set(options).from(container).save();
  });

  window.addEventListener('load', function () {
    document.body.classList.add('loaded');  // Add 'loaded' class when the page finishes loading
  });
