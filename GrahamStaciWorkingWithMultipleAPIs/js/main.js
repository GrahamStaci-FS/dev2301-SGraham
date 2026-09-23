import { WEATHER_API_KEY } from "./API.js";

(() => {
  const FLORIDA_MAN_API =
    "https://juliayxhuang.github.io/florida-man-api/api/headlines.json";

  const headlineGrid = document.querySelector("#headline-grid");
  const newStoriesButton = document.querySelector("#new-stories");

  // Get headlines
  const getHeadlines = () => {
    return fetch(FLORIDA_MAN_API)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not get headlines");
        }

        return response.json();
      })
      .then((data) => {
        data.sort(() => Math.random() - 0.5);

        return data.slice(0, 9);
      });
  };

  // Get weather
  const getWeather = (date) => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Florida,USA/${date}?key=${WEATHER_API_KEY}&unitGroup=us&include=days`;

    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Could not get weather");
      }

      return response.json();
    });
  };

  // Display stories
  const displayStories = (stories) => {
    headlineGrid.innerHTML = "";

    stories.forEach((story) => {
      const article = document.createElement("article");
      article.classList.add("story-card");

      const title = document.createElement("h3");
      title.textContent = story.headline.title;

      const date = document.createElement("p");
      date.textContent = `Published: ${story.headline.date}`;

      const source = document.createElement("p");
      source.textContent = `Source: ${story.headline.source}`;

      const link = document.createElement("a");
      link.href = story.headline.url;
      link.textContent = "Read Article";
      link.target = "_blank";

      const weatherPopup = document.createElement("div");
      weatherPopup.classList.add("weather-popup");

      const weatherTitle = document.createElement("h4");
      weatherTitle.textContent = "Florida Weather";

      const temperature = document.createElement("p");
      temperature.textContent = `Temperature: ${story.weather.temp}°F`;

      const conditions = document.createElement("p");
      conditions.textContent = `Conditions: ${story.weather.conditions}`;

      const high = document.createElement("p");
      high.textContent = `High: ${story.weather.tempmax}°F`;

      const low = document.createElement("p");
      low.textContent = `Low: ${story.weather.tempmin}°F`;

      weatherPopup.append(weatherTitle, temperature, conditions, high, low);

      article.append(title, date, source, link, weatherPopup);

      headlineGrid.append(article);

      article.addEventListener("mousemove", (event) => {
        weatherPopup.style.left = `${event.clientX + 15}px`;
        weatherPopup.style.top = `${event.clientY + 15}px`;
      });
    });
  };

  // Load stories
  const loadStories = () => {
    const savedStories = localStorage.getItem("floridaStories");

    if (savedStories) {
      displayStories(JSON.parse(savedStories));
      return;
    }

    getHeadlines()
      .then((headlines) => {
        return headlines.reduce((promise, headline) => {
          return promise.then((stories) => {
            return getWeather(headline.date).then((weather) => {
              stories.push({
                headline: headline,
                weather: weather.days[0],
              });

              return stories;
            });
          });
        }, Promise.resolve([]));
      })
      .then((stories) => {
        localStorage.setItem("floridaStories", JSON.stringify(stories));

        displayStories(stories);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // New stories button
  newStoriesButton.addEventListener("click", () => {
    localStorage.removeItem("floridaStories");

    loadStories();
  });

  // Load stories when page opens
  loadStories();
})();
