const alllikes = document.querySelector('.container2');

alllikes.addEventListener('click', async (e) => {
  if (e.target.name === 'update-like') {
    const { id } = e.target;
    const buttonLike = document.getElementById(`post-like-${id}`);
    const response1 = await fetch(`/${id}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    const { likes } = await response1.json();
    if (response1) {
      if (e.target.id === id) {
        e.target.setAttribute('disabled', 'true');
        buttonLike.innerHTML = `${likes} лайков`;
      }
    }
  }
});
