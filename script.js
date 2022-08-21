const APIURL = 'https://api.github.com/users/'
var user = [
    "pinghuskar",
    // "annibuliful",
    // "mayanth",
    // "wichaisw",
    // "ohmiler",
    // "rektplorer64"
]
var devil = [
    "UncleEngineer",
    "dtinth",
    "immortalgky",
    "angelabauer",
    "thangman22",
]
var official = [
    "WISESIGHT",
    "python-thailand",
    "BorntoDev",
    "appbrewery",
    "sitepoint",
    "PacktPublishing",
    "oreillymedia",
    "datacamp"
]
// data = [...user,...devil,...official]
// data = [...user,...devil]
// data = [...official]
data = [...user]
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
        getStars(username)
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
async function getStars(username) {
  try {
    const { data } = await axios(APIURL + username + '/starred')
    star(data,username)
  } catch(err) {
    console.log(err)
  }
}

function star(repos,username) {
  // console.log(repos)
  repos.slice(0, 30).forEach(repo => {
    console.log(repo)
    // document.getElementById(`${username.toLowerCase()}stars`).innerHTML += `${repo.full_name}<br>`
  })
}
function addReposToCard(repos,username) {
  // var rep = ""
  repos
      // .slice(0, 30)
      .slice(0, 10)
      // .slice(0, 5)
      .forEach(repo => {
        // console.log(username)
        // console.log(repo.topics)
          // rep += `<a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`
          // document.getElementById(`${username.toLowerCase()}repos`).innerHTML += `<a class="repo ${repo.topics.join(" ")}" href="${repo.html_url}" target="_blank">${repo.name}</a>`
          document.getElementById(`${username.toLowerCase()}repos`).innerHTML += `<a class="repo ${repo.topics.join(" ")}" href="${repo.html_url}" target="_blank"><p class="hidden">${repo.name}</p><img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}"></a>`
      })
      // b.innerHTML += `<td id="repos">${rep}</td></tr>`
}
function createUserCard(user) {
  // console.log(user)
  // console.log(username)
  // const statsCard = 
  const showGuide = true;
  b.innerHTML += `
    <tr class='${user.type}' id="${user.login.toLowerCase()}row">
    <td>
    <div id="name">
    <a href="${user.html_url}" target="_blank">
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar image">
    <div class="overlay">
    <div class="text">${ user.name ? `${user.name} (${user.login})` : user.login }</div>
    </div>
    </a>
    <!--<h4 class="font-bold">${user.name||user.login}</h4>-->
    </div>
    <div>
    <p class="company font-bold italic">${user.company||""}</p>
    </div>
    </td>

    <td id='${user.login.toLowerCase()}repos'></td>


      <td id='${user.login.toLowerCase()}stars'>
      <p class="bio flex justify-center items-center text-center">${user.bio||""}</p>
      ${user.type == "User" ? `<div class="flex justify-center items-center text-center flex-col">
      <img class="mb-5 statsCard" src="https://github-readme-stats.vercel.app/api?username=${user.login}&count_private=true&show_icons=true&theme=tokyonight" alt="${user.name}Stats">
      <img class="mostLang" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=tokyonight&langs_count=10" alt="${user.name}TopLang">
      </div>`: ""}
      </td>
      <td>
      <div class="justify-center items-center text-center text-3xl flex-col w-full block">
      <div class="bg-emerald-500 otherInfo">${showGuide ? "#PublicRepos : " : ""} ${user.public_repos}</div>
      <div class="sep invisible">/</div>
      <div class="bg-sky-500 otherInfo">${showGuide ? "#Followers : " : ""} ${user.followers}</div>
      <div class="sep invisible">/</div>
      <div class="bg-rose-500 otherInfo">${showGuide ? "#Following : " : ""} ${user.following}</div>
      </div></td>
      </tr>
    `
    // console.log(`${user.name}repos`)
}

const myFunction = () => {
  // var foundUser = document.getElementById("foundUser")
  // foundUser.innerHTML = ""
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  // document.getElementById("foundUser") += ``
}