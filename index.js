const formatDate = (date) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const a = date.split("T")[0].split("-");
  const y = parseInt(a[0]);
  const m = parseInt(a[1]);
  const d = parseInt(a[2]);

  if (y < 2020) {
    return `${month[m - 1]} ${d} ${y}`;
  } else {
    return `${month[m - 1]} ${d}`;
  }
};

const updatePage = (data) => {
  const reposElement = document.querySelector(".repos");
  const repos = data.repositories.nodes;

  const mobileProfileElement = document.querySelector(".mobile-profile");
  const desktopProfileElement = document.querySelector(".desktop-profile");

  const mobileProfileHtml = `
    <aside class="mobile-profile">
    <div class="top">
      <div class="avatar">
        <img src="${data.avatarUrl}" alt="" />
      </div>
      <div class="details">
        <h5>${data.name}</h5>
        <p>${data.login}</p>
      </div>
    </div>
    <p>
      ${data.bio}
    </p>
  </aside>
    `;

  const desktopProfileHtml = `
    <aside class="desktop-profile">
       <div class="avatar">
          <img src="${data.avatarUrl}" alt="" />
      </div>
      <div class="details">
           <h5>${data.name}</h5>
          <p>${data.login}</p>
          <p>
              ${data.bio}
          </p>
      </div>
    </aside>
    `;

  const repoSync = repos.map((repo) => {
    return `
        <div class="repo">
          <div class="repo-details">
              <a href="#">${repo.name}</a>
              <p>${repo.description ? repo.description : ""}</p>
              ${repo.languages.nodes.map((lang) => {
                return `
                  <p class="meta">
                    <span style="background-color: ${
                      lang.color
                    }" class="colored-circle"></span>
                    <span>${lang.name}</span>
                      ${
                        repo.stargazerCount > 0
                          ? `<span class="item"><svg aria-label="star" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>${repo.stargazerCount}</span>`
                          : ""
                      }

                      ${
                        repo.forkCount > 0
                          ? `<span class="item"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                              <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                              </svg>${repo.forkCount}</span>`
                          : ""
                      }
                      ${formatDate(repo.updatedAt)}
                  </p>`;
              })}



          </div>
          <div class="repo-star-button">
              <button>
              ${
                repo.viewerHasStarred
                  ? '<svg class="octicon octicon-star-fill mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>'
                  : '<svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>'
              }

              ${repo.viewerHasStarred ? "Unstar" : "Star"}
              </button>
          </div>
        </div>
     `;
  });

  mobileProfileElement.insertAdjacentHTML("afterend", mobileProfileHtml);
  desktopProfileElement.insertAdjacentHTML("afterend", desktopProfileHtml);

  repoSync.forEach((element) => {
    reposElement.insertAdjacentHTML("afterend", element);
  });
};

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    updatePage(data.data.user);
  });
