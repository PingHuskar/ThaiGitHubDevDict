const APIURL = 'https://api.github.com/users/'
var data = [
  "immortalgky",
  "pinghuskar",
  // "mayanth",
  // "wichaisw",
  // "dtinth",
  // "ohmiler",
  // "rektplorer64",
  // "BorntoDev",
  // "datacamp"
]
data = [...new Set(data)]
data.map(getUser)
// getUser(user)
var b = document.getElementById("data")
b.innerHTML = ""

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch(err) {
        if(err.response.status == 404) {
          console.log(err+404)
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data,username)
    } catch(err) {
        console.log(err)
    }
}
function addReposToCard(repos,username) {
  // var rep = ""
  repos
      .slice(0, 5)
      .forEach(repo => {
        console.log(username)
          // rep += `<a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`
          document.getElementById(`${username.toLowerCase()}repos`).innerHTML += `<a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`
      })
      // b.innerHTML += `<td id="repos">${rep}</td></tr>`
}
function createUserCard(user) {
  // console.log(user)
  b.innerHTML += `
    <tr>
      <td id='${user.login.toLowerCase()}repos'></td>
      <td>${user.name}</td>
      <td>${user.bio}</td>
      <td>${user.followers}</td>
      <td>${user.following}</td>
      <td>${user.public_repos}</td>
      <td><img src="${user.avatar_url}" alt="${user.name}" class="avatar"></td>
      </tr>
    `
    // console.log(`${user.name}repos`)
}

const myFunction = () => {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}