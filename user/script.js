const APIURL = 'https://api.github.com/users/'
// data.map(getUser)
const searchParam = new URLSearchParams(location.search)
const theme = searchParam.get('theme') || "radical"
getUser(searchParam.get('profile') || "pinghuskar" )
var b = document.getElementById("head")

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        // b.innerHTML += ``
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
        const { data } = await axios(APIURL + username + '/repos?sort=updated')

        addReposToCard(data,username)
    } catch(err) {
        console.log(err)
    }
}
function addReposToCard(repos,username) {
  var bb = document.getElementById("repo")
//   bb.innerHTML += `<div>`
  repos
      .slice(0, 30)
      .forEach(repo => {
          bb.innerHTML += `<a class="repo ${repo.topics.join(" ")}" href="${repo.html_url}" target="_blank"><p class="hidden">${repo.name}</p><img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo.name}"></a>`
      })
//   bb.innerHTML += `</div>`
}
function createUserCard(user) {
    // add favicon
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = `https://unavatar.io/github/${user.login}`
    document.title = `${user.login}'s Github`
    // end add favicon
    // document.getElementById("bio").innerHTML = `<h2>${user.bio||""}</h2>`
  b.innerHTML += `
  <div>
  <img src="https://github-readme-stats.vercel.app/api?username=${user.login}&count_private=true&show_icons=true&theme=${theme}" alt="${user.name}Stats">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=${theme}&langs_count=10" alt="${user.name}TopLang">
  <img src="https://github-readme-streak-stats.herokuapp.com?user=${user.login}&theme=${theme}&hide_border=true&date_format=j%20M%5B%20Y%5D" alt="${user.name}Streak">
  </div>`
}