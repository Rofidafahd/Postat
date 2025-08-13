let postsSection = document.querySelector('.posts');
async function getData(link) {
    postsSection.innerHTML = "";
    let response = await fetch(link);
    let data = await response.json();
    let posts = data.posts;
    posts.map((p) => {
        postsSection.innerHTML += `
        <div class="post-card">
                <h3>${p.title}</h3>
                <p>${p.body}</p>
                <div class="tags">
                    ${p.tags.map((tag) => { 
                        return `<p><i class="fa-solid fa-hashtag"></i>${tag}</p>` }).join(" ")}
                </div>
                <hr>
                <div class="stats">
                    <p class="views"><i class="fa-solid fa-eye"></i> ${p.views}</p>
                    <p class="likes"><i class="fa-solid fa-heart"></i> ${p.reactions.likes}</p>
                    <p class="dislikes"><i class="fa-solid fa-thumbs-down"></i> ${p.reactions.dislikes}</p>
                </div>

        </div>
        `;
    });
    if (recipes.length == 0) {
        recipesSection.innerHTML = `<div class="no-results">No results found</div>`;
    }
}
getData("https://dummyjson.com/posts");

let searchInput = document.querySelector("input");
searchInput.addEventListener("input",()=>{
    let newLink = `https://dummyjson.com/posts/search?q=${searchInput.value}`;
    getData(newLink);
});

let categoriesSection = document.querySelector(".categories");
async function getCategories() {
    let response = await fetch('https://dummyjson.com/posts/tag-list');
    let tags = await response.json();

    tags.map(tag => {
        categoriesSection.innerHTML += `
            <p onclick="getData('https://dummyjson.com/posts/tag/${tag}')"><i class="fa-solid fa-hashtag"></i>${tag}</p>
        `;
    });
}

getCategories();