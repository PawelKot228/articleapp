const BASE_URL = "http://127.0.0.1:8000/api";
const URL_CATEGORIES = `${BASE_URL}/article-category/get`;
const URL_ARTICLES = (id) => {
    return `${BASE_URL}/article-category/get-articles/${id}`;
};
const URL_ARTICLE = (id) => {
    return `${BASE_URL}/article/get/${id}`;
};


function createArticleElement(article, add_button = true) {
    let html = `<div class="row wrap">`

    //Article cover image
    if (article.cover) {
        html += `<div class="col-md-4 mb-4">`
        html += `    <div class="bg-image hover-overlay shadow-1-strong rounded ripple ripple-surface-light h-100">`
        html += `        <img src="${article.cover}" class="img-fluid h-100" style="object-fit: cover; max-height: none">`
        html += `    </div>`
        html += `</div>`
    }

    //Article text
    html += `<div class="col-md-8 mb-4 flex-grow-1">`
    html += `<h5>${article.title}</h5>`
    html += `<p>${article.lead}</p>`
    if (add_button) {
        html += `<button type="button" class="btn btn-primary article_button" data-id="${article.id}">Read</button>`
    }
    html += `</div>`

    html += `</div>`
    return html;
}

function createCategoryElement(cat) {
    let html = `<div href="#" class="list-group-item list-group-item-action py-3" id="category_element" data-id="${cat.id}" onclick="updateArticleList(this)">`;

    html += `<div class="row">`;

    if (cat.cover) {
        html += `<div class="col-md-4"><img class="thumb h-100" src="${cat.cover}" alt="" style="object-fit: cover"></div>`
    }

    html += `<div class="col-md-8 flex-grow-1">`
    html += `<strong class="mb-1">${cat.title}</strong>`;
    html += `<div class="col-10 mb-1 small">${cat.lead}</div>`
    html += `</div>`
    html += `</div>`

    html += "</div>";

    return html;
}