const websiteNameInput = document.getElementById("websiteName");
const websiteURLInput = document.getElementById("websiteURL");
const addBookmarkButton = document.getElementById("addBookmark");
const bookmarksList = document.getElementById("bookmarksList");


addBookmarkButton.addEventListener("click", addBookmark);

function addBookmark() {
    const websiteName = websiteNameInput.value.trim();
    const websiteURL = websiteURLInput.value.trim();

    if (!websiteName || !websiteURL) {
        alert("Please enter both website name and URL.");
        return;
    }

    
    const bookmark = {
        name: websiteName,
        url: websiteURL
    };

    
    saveBookmark(bookmark);

    
    websiteNameInput.value = "";
    websiteURLInput.value = "";

    
    displayBookmarks();
}

function saveBookmark(bookmark) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarksList.innerHTML = "";

    bookmarks.forEach((bookmark, index) => {
    
        const bookmarkCard = document.createElement("div");
        bookmarkCard.classList.add("bookmark");

        
        bookmarkCard.innerHTML = `
            <h3>${bookmark.name}</h3>
            <a href="${bookmark.url}" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i>${bookmark.url}</a>    
            <div class="actions">
         <button class="edit" onclick="editBookmark(${index})">
         <i class="fa fa-pencil-square-o" aria-hidden="true"></i>  Edit</button>
                <button class="delete" onclick="deleteBookmark(${index})">
                 <i class="fa fa-trash" aria-hidden="true"></i>   Delete</button>
            </div>
        `;

        bookmarksList.appendChild(bookmarkCard);
    });
}

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

function editBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const bookmark = bookmarks[index];

    websiteNameInput.value = bookmark.name;
    websiteURLInput.value = bookmark.url;

    deleteBookmark(index);
}

displayBookmarks();