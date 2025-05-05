const App = (function () {
  const moodSelect = document.getElementById("moodSelect");
  const carouselImage = document.getElementById("carouselImage");
  const affirmationDiv = document.getElementById("affirmation");

  // Mood-based data
  const moodData = {
    happy: {
      images: [
        "https://picsum.photos/id/237/600/400",
        "https://picsum.photos/id/10/600/400",
        "https://picsum.photos/id/1024/600/400"
      ],
      affirmations: [
        "Today is full of joy and possibility!",
        "You're smiling more than ever today.",
        "Your happiness inspires everyone around you."
      ],
      themeClass: "happy"
    },
    calm: {
      images: [
        "https://picsum.photos/id/260/600/400",
        "https://picsum.photos/id/349/600/400",
        "https://picsum.photos/id/573/600/400"
      ],
      affirmations: [
        "Peace begins with a single breath.",
        "You're grounded, centered, and calm.",
        "Every moment is a chance to breathe deeply."
      ],
      themeClass: "calm"
    },
    energetic: {
      images: [
        "https://picsum.photos/id/1011/600/400",
        "https://picsum.photos/id/1012/600/400",
        "https://picsum.photos/id/1013/600/400"
      ],
      affirmations: [
        "You're unstoppable today!",
        "Energy flows through you like fire.",
        "You have all the power you need within you."
      ],
      themeClass: "energetic"
    },
    nostalgic: {
      images: [
        "https://picsum.photos/id/22/600/400",
        "https://picsum.photos/id/30/600/400",
        "https://picsum.photos/id/43/600/400"
      ],
      affirmations: [
        "Memories make us who we are.",
        "Time passes, but memories stay forever.",
        "Look back fondly, move forward gently."
      ],
      themeClass: "nostalgic"
    }
  };

  let currentMood = "happy";
  let currentImageIndex = 0;

  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function showAffirmation(mood) {
    const aff = getRandomItem(moodData[mood].affirmations);
    affirmationDiv.style.opacity = 0;
    setTimeout(() => {
      affirmationDiv.textContent = aff;
      affirmationDiv.style.opacity = 1;
    }, 300);
  }

  function updateTheme(mood) {
    Object.values(moodData).forEach(data => {
      document.body.classList.remove(data.themeClass);
    });
    document.body.classList.add(moodData[mood].themeClass);
  }

  function loadImageForMood(mood) {
    const images = moodData[mood].images;
    carouselImage.style.opacity = 0;

    setTimeout(() => {
      carouselImage.src = images[currentImageIndex];
      carouselImage.alt = `${mood} mood image`;
      carouselImage.style.opacity = 1;
    }, 500);
  }

  function nextImage() {
    const images = moodData[currentMood].images;
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImageForMood(currentMood);
  }

  function loadSavedMoodPreference() {
    const saved = localStorage.getItem("userMood");
    if (saved && moodData[saved]) {
      currentMood = saved;
      moodSelect.value = saved;
      updateTheme(saved);
      showAffirmation(saved);
      loadImageForMood(saved);
    }
  }

  function initEventListeners() {
    moodSelect.addEventListener("change", (e) => {
      currentMood = e.target.value;
      updateTheme(e.target.value);
      showAffirmation(e.target.value);
      loadImageForMood(e.target.value);
      localStorage.setItem("userMood", e.target.value);
    });

    setInterval(nextImage, 4000); // Change image every 4 seconds
  }

  return {
    init: function () {
      loadSavedMoodPreference();
      initEventListeners();
      // Start with one affirmation and image
      showAffirmation(currentMood);
      loadImageForMood(currentMood);
    }
  };
})();

App.init();
