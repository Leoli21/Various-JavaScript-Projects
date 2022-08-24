import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Form Event Listener
searchForm.addEventListener('submit', e => {
    // Get Search Term
    const searchTerm = searchInput.value;
    
    // Get Sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    
    // Get Limit
    const searchLimit = document.getElementById('limit').value;

    // Check input
    if(searchTerm ==='') {
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear input
    searchInput.value = "";

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        console.log(results);
        let output ='<div class="card-columns">';
        
        // Loop through posts
        results.forEach(post => {
            // Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://miro.medium.com/max/1400/1*e3E0OQzfYCuWk0pket5dAA.png';
            output += `
            <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
          `
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });



    e.preventDefault();
});

// Show Message
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');

    // Add classes
    div.className = `alert ${className}`;

    // Add text to message
    div.appendChild(document.createTextNode(message));

    // Get parent 
    const searchContainer = document.getElementById('search-container');

    // Get search
    const search = document.getElementById('search');

    // Add message
    searchContainer.insertBefore(div, search);

    // Alert timeout
    setTimeout(()=> document.querySelector('.alert').remove(), 3000);
}

// Truncate text
function truncateText(postText, limit) {
    const shortened = postText.indexOf(' ', limit);
    if(shortened == -1) {
        return postText;
    }
    return postText.substring(0, shortened)
}

