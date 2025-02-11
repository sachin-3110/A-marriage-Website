// Set the target date: February 15, 2025 at 00:00:00
const targetDate = new Date("February 18, 2025 00:00:00").getTime();

function updateCountdown() {
  // Get current date and time
  const now = new Date().getTime();

  // Find the time difference between now and target date
  const timeLeft = targetDate - now;

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Add leading zeros and update the display
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );

  // Check if countdown is complete
  if (timeLeft < 0) {
    clearInterval(countdownInterval);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    document.getElementById("message").textContent = "Countdown Complete!";
  }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();
