const base_url = "https://api.football-data.org/v2/competitions/";
const match_url = "https://api.football-data.org/v2/teams/";

function status(response) {
    if (response.status !== 200) {
        console.log("error : ", response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.error("Error : " + error);
}

function getTeamsByLeagues(id = "2021") {

    if ("caches" in window) {
        caches.match(`${base_url+id}/teams`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let cardTeams = "";
                    data.teams.forEach(team => {
                        cardTeams +=
                            `
                            <div class="col s12 m6">
                                <div class="card">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img class="activator" src="${team.crestUrl}" alt="cannot load image">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more</i></span>
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">${team.shortName}<i class="material-icons right">close</i></span>
                                        <p>Stadium : ${team.venue}</p>
                                        <p>Founded : ${team.founded}</p>
                                        <p>Address : ${team.address}</p>
                                        <p>Website : ${team.website}</p>
                                        <p>Colors  : ${team.clubColors}</p>
                                        <a href="/assets/pages/detail.html?id=${team.id}" class="waves-effect waves-light btn-small">Details</a>
                                    </div>    
                                    <div class="card-action">
                                        <a href="/assets/pages/match.html?id=${team.id}">See All Match Schedule</a>
                                    </div>
                                </div>
                            </div>
                            `;
                        document.getElementById("content-cards").innerHTML = cardTeams;
                    });
                });
            }
        });
    }

    fetch(`${base_url+id}/teams`, {
            headers: {
                "X-Auth-Token": "0c7e698264284e2db0df502ffb1cb527"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            let cardTeams = "";
            data.teams.forEach(team => {
                cardTeams +=
                    `
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="${team.crestUrl}" alt="cannot load image">
                            </div>
                            <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">remove_red_eye</i></span>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${team.shortName}<i class="material-icons right">close</i></span>
                                <p>Stadium : ${team.venue}</p>
                                <p>Founded : ${team.founded}</p>
                                <p>Address : ${team.address}</p>
                                <p>Website : ${team.website}</p>
                                <p>Colors  : ${team.clubColors}</p>
                                <a href="/assets/pages/detail.html?id=${team.id}" class="waves-effect waves-light btn-small">Details</a>
                            </div>
                            <div class="card-action">
                                <a href="/assets/pages/match.html?id=${team.id}">See All Match Schedule</a>
                            </div>
                        </div>
                    </div>
                    `;
                document.getElementById("content-cards").innerHTML = cardTeams;
            });
        })
        .catch(error);
};

function getStandingsByLeague(id = "2021") {

    if ("caches" in window) {
        caches.match(`${base_url+id}/standings?standingType=TOTAL`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let leagueStandings = "";
                    data.standings.forEach(standing => {
                        standing.table.forEach(table => {
                            leagueStandings +=
                                `
                            <tr>
                                <td>${table.position}</td>
                                <td><img src="${table.team.crestUrl}" alt="no image loaded"></td>
                                <td>${table.team.name}</td>
                                <td>${table.playedGames}</td>
                                <td>${table.form}</td>
                                <td>${table.won}</td>
                                <td>${table.draw}</td>
                                <td>${table.lost}</td>
                                <td>${table.points}</td>
                            </tr>
                            `;
                            document.getElementById("content-standing").innerHTML = leagueStandings;
                        });
                    });
                })
            };
        });
    }

    fetch(`${base_url+id}/standings?standingType=TOTAL`, {
            headers: {
                "X-Auth-Token": "0c7e698264284e2db0df502ffb1cb527"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            let leagueStandings = "";
            data.standings.forEach(standing => {
                standing.table.forEach(table => {
                    leagueStandings +=
                        `
                    <tr>
                        <td>${table.position}</td>
                        <td><img src="${table.team.crestUrl}" alt="no image loaded"></td>
                        <td>${table.team.name}</td>
                        <td>${table.playedGames}</td>
                        <td>${table.form}</td>
                        <td>${table.won}</td>
                        <td>${table.draw}</td>
                        <td>${table.lost}</td>
                        <td>${table.points}</td>
                    </tr>
                    `;
                    document.getElementById("content-standing").innerHTML = leagueStandings;
                });
            });
        })
}

function getMatchByTeamId() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParams = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${match_url+idParams}/matches`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let matchRows = "";
                    data.matches.forEach(match => {
                        let scoreHomeFull = match.score.fullTime.homeTeam;
                        let scoreAwayFull = match.score.fullTime.awayTeam;
                        let scoreHomeHalf = match.score.halfTime.homeTeam;
                        let scoreAwayHalf = match.score.halfTime.awayTeam;

                        if (scoreHomeFull == null || scoreAwayFull == null) {
                            scoreHomeFull = "0";
                            scoreAwayFull = "0";
                            scoreHomeHalf = "0";
                            scoreAwayHalf = "0";
                        }

                        matchRows +=
                            `                    
                                <tr>
                                    <td>${match.competition.name}</td>
                                    <td>${dateFormated(match.utcDate)}</td>
                                    <td>${match.matchday}</td>
                                    <td>${match.homeTeam.name}<strong> VS </strong>${match.awayTeam.name}</td>
                                    <td>${scoreHomeHalf}<strong> - </strong>${scoreAwayHalf}</td>
                                    <td>${scoreHomeHalf}<strong> - </strong>${scoreAwayHalf}</td>
                                </tr>
                            `;
                        document.getElementById("table-schedule").innerHTML = matchRows;
                    });
                })
            };
        });
    }

    fetch(`${match_url+idParams}/matches`, {
            headers: {
                "X-Auth-Token": "0c7e698264284e2db0df502ffb1cb527"
            }
        })
        .then(status)
        .then(json)
        .then(function (data) {
            let matchRows = "";
            data.matches.forEach(match => {
                let scoreHomeFull = match.score.fullTime.homeTeam;
                let scoreAwayFull = match.score.fullTime.awayTeam;
                let scoreHomeHalf = match.score.halfTime.homeTeam;
                let scoreAwayHalf = match.score.halfTime.awayTeam;

                if (scoreHomeFull == null || scoreAwayFull == null) {
                    scoreHomeFull = "0";
                    scoreAwayFull = "0";
                    scoreHomeHalf = "0";
                    scoreAwayHalf = "0";
                }

                matchRows +=
                    `                    
                    <tr>
                        <td>${match.competition.name}</td>
                        <td>${dateFormated(match.utcDate)}</td>
                        <td>${match.matchday}</td>
                        <td>${match.homeTeam.name}<strong> VS </strong>${match.awayTeam.name}</td>
                        <td>${scoreHomeHalf}<strong> - </strong>${scoreAwayHalf}</td>
                        <td>${scoreHomeHalf}<strong> - </strong>${scoreAwayHalf}</td>
                    </tr>
                `
                document.getElementById("table-schedule").innerHTML = matchRows;
            });
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function (resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParams = urlParams.get("id");

        if ("caches" in window) {
            caches.match(match_url + idParams).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        let itemRows = "";
                        itemRows = `
                        <div class="row">
                            <div class="col s12 m8 offset-m2 card-team">
                                <h4>Detail Team</h4>
                                <div class="card">
                                    <div class="card-image">
                                        <img src="${data.crestUrl}" alt="cannot load image">
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title">${data.name}</span>
                                        <p><strong>Stadium</strong> : ${data.venue}</p>
                                        <p><strong>Founded</strong> : ${data.founded}</p>
                                        <p><strong>Address</strong> : ${data.address}</p>
                                        <p><strong>Website</strong> : ${data.website}</p>
                                        <p><strong>Colors</strong>  : ${data.clubColors}</p>
                                    </div>
                                    <div class="card-action">
                                        <a href="/assets/pages/match.html?id=${data.id}">See All Match Schedule</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        document.getElementById("body-content").innerHTML = itemRows;
                        resolve(data);
                    });
                };
            });
        }

        fetch(match_url + idParams, {
                headers: {
                    "X-Auth-Token": "0c7e698264284e2db0df502ffb1cb527"
                }
            })
            .then(status)
            .then(json)
            .then(function (data) {
                let itemRows = "";
                itemRows += `
                <div class="row">
                    <div class="col s12 m8 offset-m2 card-team">
                        <h4>Detail Team</h4>
                        <div class="card">
                            <div class="card-image">
                                <img src="${data.crestUrl}" alt="cannot load image">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${data.name}</span>
                                <p><strong>Stadium</strong> : ${data.venue}</p>
                                <p><strong>Founded</strong> : ${data.founded}</p>
                                <p><strong>Address</strong> : ${data.address}</p>
                                <p><strong>Website</strong> : ${data.website}</p>
                                <p><strong>Colors</strong>  : ${data.clubColors}</p>
                            </div>
                            <div class="card-action">
                                <a href="/assets/pages/match.html?id=${data.id}">See All Match Schedule</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                document.getElementById("body-content").innerHTML = itemRows;
                resolve(data);
            })
            .catch(error);
    });
}

function getSavedTeam() {
    getAll().then(function (teams) {
        console.log(teams);
        let cardTeams = "";
        teams.forEach(team => {
            cardTeams +=
                `<div class="col s12 m6">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="${team.crestUrl}" alt="cannot load image">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">remove_red_eye</i></span>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">${team.shortName}<i class="material-icons right">close</i></span>
                            <p>Stadium : ${team.venue}</p>
                            <p>Founded : ${team.founded}</p>
                            <p>Address : ${team.address}</p>
                            <p>Website : ${team.website}</p>
                            <p>Colors  : ${team.clubColors}</p>
                            <a href="/assets/pages/detail.html?id=${team.id}&saved=true" class="waves-effect waves-light btn-small">Details</a>
                        </div>
                        <div class="card-action">
                            <a href="/assets/pages/match.html?id=${team.id}">See All Match Schedule</a>
                        </div>
                    </div>
                </div>`;
            document.getElementById("content-cards").innerHTML = cardTeams;
        });
    });
}

function dateFormated(date) {
    let dateFormated = new Date(date);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    let newDate = dateFormated.toLocaleDateString("id-ID", options);
    let newTime = dateFormated.toLocaleTimeString("id-ID");
    return newDate + " " + newTime;
}