(() => {
  const teams = Array.from(document.querySelectorAll("li")).map(
    (team) => team.textContent,
  );

  console.log(teams);

  const firstPlaceTeams = Array.from(document.querySelectorAll("section")).map(
    (league) => league.querySelector("li").textContent,
  );

  console.log(firstPlaceTeams);

  const secondPlaceTeams = Array.from(document.querySelectorAll("section")).map(
    (league) => league.querySelectorAll("li")[1].textContent,
  );

  console.log(secondPlaceTeams);

  const laLiga = Array.from(document.querySelectorAll("section")).find(
    (league) => league.querySelector("h2").textContent === "La Liga",
  );

  laLiga.remove();

  const newLeague = {
    name: "MLS",
    region: "North America",
    teams: [
      "NY Red Bulls",
      "DC United",
      "Columbus",
      "Orlando City",
      "Philadelphia",
    ],
  };

  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = newLeague.name;

  const region = document.createElement("h3");
  region.textContent = newLeague.region;

  const list = document.createElement("ul");

  newLeague.teams.forEach((team) => {
    const item = document.createElement("li");
    item.textContent = team;
    list.append(item);
  });

  section.append(heading, region, list);

  document.querySelector("main").append(section);
})();
