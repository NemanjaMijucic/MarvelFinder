let characters = [];
let charNameImg = [];
let filteredChars = [];
const search = document.getElementById("search");
const grid = document.querySelector(".grid");
const removeBookmark = document.querySelector(".removebookmark");
const gridButtons = grid.querySelectorAll("button");
console.log(gridButtons);

const loadingText = () => {
  grid.innerHTML = "<p class='load'>Loading...<p>";
  setTimeout(() => {
    if (localStorage.getItem("bookmark") !== null) {
      let hero = JSON.parse(localStorage.getItem("bookmark"));
      grid.innerHTML = "";
      const card = document.createElement("div");
      card.classList.add("character");
      card.innerHTML = `<img src="${hero[0].img}" />
       <p>${hero[0].name}</p>
       <p>bookmarked</p>
       `;
      removeBookmark.setAttribute("value", hero[0].name);
      removeBookmark.disabled = false;
      removeBookmark.innerText = "remove bookmark";
      grid.appendChild(card);
    } else {
      grid.innerHTML = "";
      removeBookmark.disabled = true;
      removeBookmark.innerText = "no bookmark";
    }
  }, 5000);
};
document.addEventListener("DOMContentLoaded", loadingText);

async function loadCharacters() {
  const response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=0`
  );
  const data = await response.json();

  const response1 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=100`
  );
  const data1 = await response1.json();

  const response2 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=200`
  );
  const data2 = await response2.json();

  const response3 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=300`
  );
  const data3 = await response3.json();

  const response4 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=400`
  );
  const data4 = await response4.json();

  const response5 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=500`
  );
  const data5 = await response5.json();

  const response6 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=600`
  );
  const data6 = await response6.json();

  const response7 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=700`
  );
  const data7 = await response7.json();

  const response8 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=800`
  );
  const data8 = await response8.json();

  const response9 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=900`
  );
  const data9 = await response9.json();

  const response10 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=1000`
  );
  const data10 = await response10.json();

  const response11 = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=38124a9788308e47188fa72969e2fce4&hash=c1d845427a6cdbc254218a2c228e51a2&limit=100&offset=1100`
  );
  const data11 = await response11.json();

  characters.push(
    data,
    data1,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    data10,
    data11
  );
  characters.forEach((char) => {
    char.data.results.forEach((res) => {
      charNameImg.push({
        id: res.id,
        name: res.name,
        img:
          res.thumbnail.path +
          "/" +
          "portrait_fantastic" +
          "." +
          res.thumbnail.extension,
        bookmark: false,
      });
    });
  });

  search.addEventListener("keydown", (e) => {
    grid.innerHTML = "";
    const searchString = e.target.value.toLowerCase();
    if (searchString !== "") {
      const filteredChars = charNameImg.filter((char) => {
        return char.name.toLowerCase().indexOf(searchString) != -1;
      });
      displayCharacters(filteredChars);
    } else {
      grid.innerHTML = " ";
    }
  });

  //display characters into grid
  const displayCharacters = (filteredChars) => {
    filteredChars.forEach((char) => {
      const card = document.createElement("div");
      card.classList.add("character");
      card.innerHTML = `<img src="${char.img}" />
       <p>${char.name}</p>
       <button type="button" class="bookmark" value="${char.name}">add bookmark</button>
       `;
      grid.appendChild(card);
    });

    //add bookmark
    const bookmarks = document.querySelectorAll(".bookmark");
    bookmarks.forEach((bookmark) => {
      bookmark.addEventListener("click", (e) => {
        e.target.innerText = "bookmarked";
        storeInLocalStorage(
          e.target.value,
          e.target.previousElementSibling.previousElementSibling.src
        );
        removeBookmark.disabled = false;
      });
    });
  };
}

function storeInLocalStorage(element, img) {
  let bookmarkedName = [];
  if (localStorage.getItem("bookmark") === element) {
    alert("already exists");
  } else {
    bookmarkedName.push({ name: element, img: img });
    localStorage.setItem("bookmark", JSON.stringify(bookmarkedName));
    removeBookmark.innerText = "remove bookmark";
    removeBookmark.setAttribute("value", element);
  }
}
loadCharacters();

removeBookmark.addEventListener("click", (e) => {
  const gridButtons = grid.querySelectorAll("button");
  console.log(gridButtons);

  if (localStorage.getItem("bookmark") !== null) {
    let x = JSON.parse(localStorage.getItem("bookmark"));
    if (e.target.value === x[0].name) {
      localStorage.removeItem("bookmark");
      console.log("hello");
      removeBookmark.innerText = "no bookmark";
      gridButtons.forEach((button) => {
        if (button.innerText === "bookmarked") {
          button.innerText = "add bookmark";
        }
      });
    }

    console.log(localStorage.getItem("bookmark"));
    console.log(x[0].name);
  }
});
