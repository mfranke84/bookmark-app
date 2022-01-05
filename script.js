const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal'); 
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');
const bookmarkDelete = document.getElementById('delete-bookmark');

let bookmarks = [];

// Show Modal & focus on input
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', ()  => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false ));

// Validate form
function validate(nameValue, urlValue){
    const expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue){
        alert('Please submit values for both fields');
        return false;
    }
    if (!urlValue.match(regex)){
        alert('Please provide a valid url');
        return false;
    }
    // valid
    return true;
    
}

// Build Bookmarks DOM
function buildBookmarks(){
    // Remove all bookmarks
    bookmarksContainer.textContent = '';
    // Build items
    bookmarks.forEach(bookmark => {
        const { name, url} = bookmark;
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title', 'Delete bookmark');
        closeIcon.setAttribute('onClick', `deleteBookmark('${url}')`);
        // Favicon / Link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // Favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://www.google.com/s2/u/0/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'favicon');
        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        // Append to bookmarks container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.append(item);

    });
}


// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        //Create bookmarks array in localStoreage
        bookmarks = [
            {
                name: 'Run2Peak',
                url: 'https://www.run2peak.de',
            }
        ];
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks();
}

// Delete bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark,i) => {
        if (bookmark.url === url){
            bookmarks.splice(i,1);
        }
    });
    // Update bookmarks array in localStorage, re-populate DOM 
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Handle data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrl.value;
    if(!urlValue.includes('http://', 'https://')){
        urlValue = `https://${urlValue}`;
    } 
    if(!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);

// On Load
fetchBookmarks();