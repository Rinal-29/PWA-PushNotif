document.addEventListener("DOMContentLoaded", function () {

    const sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav);
    loadnav();

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadnav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });
            };

            document.querySelectorAll(".sidenav a, .topnav a, .brand-logo").forEach(function (elm) {
                elm.addEventListener("click", function (event) {
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    page = event.target.getAttribute("href").substr(1);
                    loadPage(page);
                });
            });
        };
        xhttp.open("GET", "assets/navigation/nav.html", true);
        xhttp.send();
    }

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                const body = document.querySelector("#body-content");
                if (this.status == 200) {
                    body.innerHTML = xhttp.responseText;

                    if (page == "home") {
                        let elems = document.querySelectorAll("select");
                        M.FormSelect.init(elems);

                        getStandingsByLeague();
                        const options = document.getElementById("leagues-id");
                        options.addEventListener("change", function (event) {
                            let id = event.target.value;
                            getStandingsByLeague(id);
                        })
                    } else if (page == "teams") {
                        let elems = document.querySelectorAll("select");
                        M.FormSelect.init(elems);

                        getTeamsByLeagues();
                        const options = document.getElementById("leagues-id");
                        options.addEventListener("change", function (event) {
                            let id = event.target.value;
                            getTeamsByLeagues(id);
                        });
                    } else if (page == "saved") {
                        getSavedTeam();
                    }

                } else if (this.status == 404) {
                    body.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>";
                } else {
                    body.innerHTML = "<h1>Halaman Tidak Dapat Diakses!</h1>";
                };
            };
        };
        xhttp.open("GET", "assets/pages/" + page + ".html");
        xhttp.send();
    }
});