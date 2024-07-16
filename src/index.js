// index.js

document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const detailImage = document.getElementById('detail-image');
    const detailName = document.getElementById('detail-name');
    const detailRestaurant = document.getElementById('detail-restaurant');
    const detailRating = document.getElementById('detail-rating');
    const detailComment = document.getElementById('detail-comment');
    const ramenForm = document.getElementById('ramen-rating-form');
    const newRating = document.getElementById('new-rating');
    const newComment = document.getElementById('new-comment');
    let currentRamenId = null;

    fetch('http://localhost:3000/ramens')
        .then(response => response.json())
        .then(data => {
            data.forEach(ramen => {
                const img = document.createElement('img');
                img.src = ramen.image;
                img.alt = ramen.name;
                img.addEventListener('click', () => displayRamenDetails(ramen));
                ramenMenu.appendChild(img);
            });
        });

    function displayRamenDetails(ramen) {
        currentRamenId = ramen.id;
        detailImage.src = ramen.image;
        detailName.textContent = ramen.name;
        detailRestaurant.textContent = ramen.restaurant;
        detailRating.textContent = ramen.rating;
        detailComment.textContent = ramen.comment;
        ramenDetail.classList.remove('hidden');
        ramenForm.classList.remove('hidden');
    }

    ramenForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentRamenId) {
            const updatedRating = newRating.value;
            const updatedComment = newComment.value;
            detailRating.textContent = updatedRating;
            detailComment.textContent = updatedComment;

            fetch(`http://localhost:3000/ramens/${currentRamenId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: updatedRating, comment: updatedComment }),
            });
        }
    });
});
