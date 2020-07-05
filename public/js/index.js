console.log('Client side js loaded');

const urlForm = document.querySelector('form');
const URLInput = document.querySelector('input');
const loading = document.querySelector('#loading');
const shortUrl = document.querySelector('#shortUrl');

urlForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalUrl = URLInput.value;
    loading.textContent = 'Creating...'
    shortUrl.textContent = '';
    fetch('/shortUrl', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            originalUrl
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                loading.textContent = '';
                alert(data.error);
            } else {
                alert(data.message);
                loading.textContent = '';
                shortUrl.innerHTML = `Your shortUrl is: <a target="_blank" href=${data.shortUrl} rel="noopener noreferer">${data.shortUrl} </a>`
            }
        }).catch((e) => {
            console.log(e);
            loading.textContent = '';
            shortUrl.textContent = 'Network Error! Please try again'
    });
});
