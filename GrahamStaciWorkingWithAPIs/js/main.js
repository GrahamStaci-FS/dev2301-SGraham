"use strict";
(() => {
  const url =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

  const questionElement = document.querySelector("#question");
  const answerElement = document.querySelector("#answer");
  const anotherBtn = document.querySelector("button");

  const handleError = (error) => {
    console.error("There's been an error", error);
  };

  const handleApi = (api) => {
    const question = api.setup;
    const answer = api.delivery;

    const joke = {
      question: question,
      answer: answer,
    };

    showJoke(joke);
  };

  const getJoke = () => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => handleApi(json))
      .catch((error) => handleError(error));
  };

  const showJoke = (data) => {
    questionElement.innerHTML = data.question;
    answerElement.innerHTML = data.answer;
  };

  getJoke();

  anotherBtn.addEventListener("click", () => {
    getJoke();
  });
})();
