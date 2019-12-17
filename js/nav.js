document.addEventListener("DOMContentLoaded", function() {
  
  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
 // Load page content
	var page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadPage(page);
	 
  function loadPage(page) {
	  var idTeam;
	  if(page=='jerman'){
		  idTeam=2002;
		  getTeamList(idTeam);
		  console.log('jerman');
	  }else if(page=='inggris'){
		  idTeam=2021;
		  getTeamList(idTeam);
		  console.log('inggris');
	  }else{
		  if(page!='home'){
		  console.log('else nya masuk');
		  showAllTeam();
		  }
	  }
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		  var content = document.querySelector("#body-content");
		  if (this.status == 200) {
			content.innerHTML = xhttp.responseText;
		  } else if (this.status == 404) {
			content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
		  } else {
			content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
		  }
		}
	  };
	  xhttp.open("GET", "pages/" + page + ".html", true);
	  xhttp.send();
	}

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
 
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
		
		document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
			elm.addEventListener("click", function(event) {
			  // Tutup sidenav
			  var sidenav = document.querySelector(".sidenav");
			  M.Sidenav.getInstance(sidenav).close();
	 
			  // Muat konten halaman yang dipanggil
			  page = event.target.getAttribute("href").substr(1);
			  loadPage(page);
			});
		});
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
  
  function showAllTeam() {
	console.log('showall');
       dbGetAllTeam().then(team => {
           let listTeamInText = "";
           team.forEach(team => {
               listTeamInText += `
               <tr>
                 <td>${team.idTeam}</td>
                 <td>${team.namaTeam}</td>
                 <td>${team.lokasi}</td>
                 <td>${team.email}</td>
				 <td>${team.phone}</td>
				 <td>${team.venue}</td>
				 <td>${team.website}</td>
                 <td><button id="${team.idTeam}" class="removeButton">Remove</button></td>
               </tr>
               `;
           });
		   console.log('showall lagi' + listTeamInText);
           document.querySelector("#faveList").innerHTML = listTeamInText;

           let removeButtons = document.querySelectorAll(".removeButton");
           for(let button of removeButtons) {
               button.addEventListener("click", function (event) {
                   let teamId = event.target.id;
				   console.log(' tim id:'+ teamId)
                   dbDeleteTeam(teamId).then(() => {
                       showAllTeam()
                   })
               })
           }
       })
    }
});
