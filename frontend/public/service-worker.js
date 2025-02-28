/* eslint-disable no-restricted-globals */
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        // For navigation requests, respond with index.html
        event.respondWith(
            fetch('/index.html')
        );
    }
}); 