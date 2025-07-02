function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value) / 100;
  const weight = parseFloat(document.getElementById('weight').value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight.");
    return;
  }

  const bmi = weight / (height * height);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  document.getElementById("result").innerText = `Your BMI is ${bmi.toFixed(2)} (${category})`;
  renderChart(bmi);
}

function renderChart(bmi) {
  const ctx = document.getElementById("bmiChart").getContext("2d");

  if (window.bmiChart) window.bmiChart.destroy();

  window.bmiChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Underweight", "Normal", "Overweight", "Obese"],
      datasets: [{
        label: "BMI",
        data: [
          bmi < 18.5 ? bmi : 0,
          bmi >= 18.5 && bmi < 25 ? bmi : 0,
          bmi >= 25 && bmi < 30 ? bmi : 0,
          bmi >= 30 ? bmi : 0
        ],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"]
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 40
        }
      }
    }
  });
}
