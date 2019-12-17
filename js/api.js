const base_url = "https://api.football-data.org/v2/";

function fetchWithKey(url){
	return fetch(url, {
		headers:{
		'X-Auth-Token': 'cb054e17210a448fb8a74d4d95337bb8'
		}
})
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getTeamList(idTeam) {
	  if ("caches" in window) {  
    caches.match(base_url + "competitions/"+idTeam+"/teams").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articlesHTML = "";
          data.teams.forEach(function(teams) {
            articlesHTML += `
			
                 <div class ="col s12 m6">
                    <div class="card center-align">
                       <div class="card-image">
                          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 170px; height: 150px; padding: 15px;">
                        </div>
                        <div class="card-content" style="background: white;">
                            <span class="card-title">${teams.name}</span>
                            <p><a class="waves-effect waves-light btn-small" href="./teamdetail.html?id=${teams.id}">See Details</a></p>
                        </div>
                    </div>
                  </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articlesHTML;
        })
      }
    });
  }
  fetchWithKey(base_url + "competitions/"+idTeam+"/teams")
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function(teams) {
        articlesHTML += `
                 <div class ="col s12 m6">
                    <div class="card">
                       <div class="card-image center-align">
                          <img src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 170px; height: 150px; padding: 15px;">
                        </div>
                        <div class="card-content" style="background: white;">
                            <span class="card-title">${teams.name}</span>
                            <p><a class="waves-effect waves-light btn-small" href="./teamdetail.html?id=${teams.id}">See Details</a></p>
                        </div>
                    </div>
                  </div>
                `;
          });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}
function getTeamById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  console.log('idParam: '+idParam);

  if ("caches" in window) {
    caches.match(base_url + "teams/"+idParam).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var articleHTML = `
		  <table >
					<thead>
					<tr>
						<td style="text-align: center;" colspan="3" >
							<img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 170px; height: 150px; padding: 15px;">
							<br/>
							<span class="card-title">${data.name}</span>
						</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>
							League Location
						</td>
						<td>
							:
						</td>
						<td>
							${data.area.name}
						</td>
					</tr>
					<tr>
						<td>
							Email
						</td>
						<td>
							:
						</td>
						<td>
							${data.email}
						</td>
					</tr>
					<tr>
						<td>
							Phone
						</td>
						<td>
							:
						</td>
						<td>
							${data.phone}
						</td>
					</tr>
					<tr>
						<td>
							Venue
						</td>
						<td>
							:
						</td>
						<td>
							${data.venue}
						</td>
					</tr>
					<tr>
						<td>
							Website
						</td>
						<td>
							:
						</td>
						<td>
							${data.website}
						</td>
					</tr>
					<tr>
						<td colspan="3">
							<p><a class="waves-effect waves-light btn-small modal-trigger center-align" href="#modal1" id="saveFave">Save Favorite</a></p>
						</td>
					</tr>
					
					</tbody>
			    </table>
          `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
        });
      }
    });
  }

  fetchWithKey(base_url + "teams/"+idParam)
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
	  let dataTeam = {};
	  dataTeam['idTeam']=idParam;
	  dataTeam['lokasi']=data.area.name;
	  dataTeam['website']=data.website;
	  dataTeam['phone']=data.phone;
	  dataTeam['venue']=data.venue;
	  dataTeam['email']=data.email;
	  dataTeam['namaTeam']=data.name;
		
      var articleHTML = `
				<table >
					<thead>
					<tr>
						<td style="text-align: center;" colspan="3" >
							<img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 170px; height: 150px; padding: 15px;">
							<br/>
							<span class="card-title">${data.name}</span>
						</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>
							League Location
						</td>
						<td>
							:
						</td>
						<td>
							${data.area.name}
						</td>
					</tr>
					<tr>
						<td>
							Email
						</td>
						<td>
							:
						</td>
						<td>
							${data.email}
						</td>
					</tr>
					<tr>
						<td>
							Phone
						</td>
						<td>
							:
						</td>
						<td>
							${data.phone}
						</td>
					</tr>
					<tr>
						<td>
							Venue
						</td>
						<td>
							:
						</td>
						<td>
							${data.venue}
						</td>
					</tr>
					<tr>
						<td>
							Website
						</td>
						<td>
							:
						</td>
						<td>
							${data.website}
						</td>
					</tr>
					<tr>
						<td colspan="3">
							<p><a class="waves-effect waves-light btn-small modal-trigger" href="#modal1" id="saveFave">Save Favorite</a></p>
						</td>
					</tr>
					
					</tbody>
			    </table>
        `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
	  

	  $('#saveFave').click(function() {
		  dbInsertTeam(dataTeam).then(() => {
        })
		
		$('.modal-trigger').leanModal();
		
	  });
	  
    });
}
 
