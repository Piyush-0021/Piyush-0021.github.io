<?php
session_start();
$isLoggedIn = isset($_SESSION['username']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FitLife | Home</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body, html {
      font-family: 'Poppins', sans-serif;
      scroll-behavior: smooth;
    }

    .hero {
      background: url('login_back3.jpg') no-repeat center center/cover;
      height: 100vh;
      color: white;
      position: relative;
    }

    .overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      padding: 20px 40px;
      align-items: center;
      position: relative;
      z-index: 3;
    }

    .navbar h1 {
      font-size: 45px;
      font-weight: 800;
      color: white;
    }

    .hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 101;
  position: fixed;
  top: 25px;
  right: 25px;
}

.nav-buttons.active {
  right: 0;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
}


    .hamburger div {
      width: 25px;
      height: 3px;
      background-color: white;
      margin: 4px 0;
      transition: 0.4s;
    }

    .nav-buttons {
      display: flex;
      gap: 10px;
    }

    .nav-buttons a, .nav-buttons span {
      text-decoration: none;
      font-weight: 600;
      color: white;
      padding: 10px 20px;
      border: 2px solid white;
      border-radius: 25px;
      transition: all 0.3s ease;
    }

    .nav-buttons a:hover {
      background-color: white;
      color: black;
    }

    .logout-btn {
      background-color: red;
      border: none;
      color: white;
    }

    .content {
      position: relative;
      top: 50%;
      left: 10%;
      transform: translateY(-50%);
      z-index: 2;
      max-width: 600px;
    }

    .content h2 {
      font-size: 48px;
      font-weight: 620;
      margin-bottom: 20px;
    }

    .content p {
      font-size: 18px;
      color: #ddd;
      margin-bottom: 30px;
    }

    .content a.btn {
      text-decoration: none;
      background-color: #ffcc00;
      color: black;
      padding: 14px 28px;
      font-weight: bold;
      border-radius: 30px;
      transition: background 0.3s ease;
    }

    .content a.btn:hover {
      background-color: #e6b800;
    }

    section {
      padding: 80px 60px;
    }

    .section-heading {
      font-size: 36px;
      font-weight: 800;
      margin-bottom: 30px;
      text-align: center;
    }

    .section-content {
      max-width: 1000px;
      margin: auto;
      font-size: 18px;
      line-height: 1.6;
      text-align: center;
    }

    .footer {
      background-color: #222;
      color: #ccc;
      padding: 30px 0;
      text-align: center;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-buttons {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: -100%;
        height: 100vh;
        width: 220px;
        background-color: rgba(20, 20, 20, 0.86);
        padding: 70px 20px;
        transition: right 0.3s ease;
        z-index: 100;
      }

      .nav-buttons.active {
        right: 0;
      }

      .nav-buttons a, .nav-buttons span {
        margin: 10px 0;
        padding: 10px 0;
        font-size: 18px;
        border: none;
        display: block;
      }

      .nav-buttons a:hover {
        color: #ffcc00;
        background: none;
      }

      .logout-btn {
        background-color: transparent;
        color: red;
        font-weight: bold;
        padding: 8px 0;
      }

      .content {
        left: 5%;
        width: 90%;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="overlay"></div>
    <nav class="navbar">
      <h1>FitLife</h1>
      <div class="hamburger" onclick="toggleMenu()">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="nav-buttons" id="navMenu">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="workout.php">Workouts</a>
        <a href="#contact">Contact</a>
        <?php if ($isLoggedIn): ?>
          <span>Welcome, <?= htmlspecialchars($_SESSION['username']); ?></span>
          <a href="logout.php" class="logout-btn">Logout</a>
        <?php else: ?>
          <a href="login.php">Login</a>
          <a href="signup.php">Sign Up</a>
        <?php endif; ?>
      </div>
    </nav>

    <div class="content">
      <h2>Reach Your Best</h2>
      <p>Whether you're training for a marathon or your biggest season yet, we're here to help you make serious progress.</p>
      <a href="#about" class="btn">Get Started</a>
    </div>
  </section>

  <section id="about">
    <h2 class="section-heading">About FitLife</h2>
    <div class="section-content">
      FitLife is your personal gateway to fitness excellence. Whether you're new or experienced, our programs, nutrition guides, and coaching services are tailored to help you grow strong, healthy, and confident.<br><br>
      Founded by <strong>Piyush Gupta</strong>, <strong>Harnoor Singh Nagpal</strong>, and <strong>Tushar Ghalot</strong>, FitLife is built with a passion for wellness and a commitment to helping you transform your lifestyle through sustainable fitness routines.
    </div>
  </section>

  <section id="services">
    <h2 class="section-heading">Our Services</h2>
    <div class="section-content">
      • Personalized Workout Plans<br>
      • 24/7 Virtual Training Access<br>
      • Nutritional Guidance<br>
      • Online Progress Tracking<br>
      • Community Support & Motivation
    </div>
  </section>

  <section id="testimonials">
    <h2 class="section-heading">Testimonials</h2>
    <div class="section-content">
      “FitLife changed my life. I’ve lost 20kg and feel stronger than ever!” – Aman<br><br>
      “Their online training program is super flexible and effective.” – Priya<br><br>
      “Excellent coaching and an inspiring community!” – Raj
    </div>
  </section>

  <section id="contact">
    <h2 class="section-heading">Contact Us</h2>
    <div class="section-content">
      📧 Email: support@fitlife.com<br>
      📞 Phone: +91-XXXXX-XXXXX<br>
    </div>
  </section>

  <div class="footer">
    &copy; 2025 FitLife. All rights reserved.
  </div>

  <script>
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('navMenu');

  function toggleMenu() {
    navMenu.classList.toggle('active');
  }

  document.addEventListener('click', function (event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger) {
      navMenu.classList.remove('active');
    }
  });
</script>

</body>
</html>
