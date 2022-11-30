const post = document.querySelector('.container2');

post.addEventListener('click', async (e) => {
  if (e.target.name === 'remove-post') {
    const div = e.target.closest('div');

    const { id } = e.target;
    const response = await fetch(`/allPosts/${id}`, {
      method: 'delete',

    });

    if (response.status === 200) {
      div.remove();
    }
  }
});
