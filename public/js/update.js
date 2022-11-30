const allthemes1 = document.querySelector('.container2');
allthemes1.addEventListener('click', async (e) => {
  if (e.target.name === 'update-post') {
    const theme2 = e.target.closest('div');

    const { id } = e.target.parentNode;

    const titleHeader = document.getElementById(`post-photo-${id}`);
    const textBody = document.getElementById(`post-text-${id}`);
    const stupdbutton = document.getElementById(`button-edit-${id}`);

    const title = titleHeader?.src;
    const text = textBody?.textContent;

    titleHeader.remove();
    textBody.remove();
    stupdbutton.remove();

    const titleInput = document.createElement('input');
    const textInput = document.createElement('textarea');
    const buttonSubmit = document.createElement('button');

    buttonSubmit.setAttribute('type', 'button');
    buttonSubmit.setAttribute('id', 'button-submit');
    buttonSubmit.setAttribute('name', 'newPost-submit');
    buttonSubmit.innerText = 'Поменять';

    titleInput.value = title;
    titleInput.setAttribute('id', 'new-title');
    textInput.value = text;
    textInput.setAttribute('id', 'new-text');

    theme2.insertAdjacentElement('beforeend', titleInput);
    theme2.insertAdjacentElement('beforeend', textInput);
    theme2.insertAdjacentElement('beforeend', buttonSubmit);
  }
  if (e.target.name === 'newPost-submit') {
    const titleHeader = document.getElementById('new-title');
    const textBody = document.getElementById('new-text');
    const { id } = e.target.parentNode;

    const response2 = await fetch(`/allPosts/${id}/update`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        url: titleHeader.value,
        post: textBody.value,
      }),
    });

    if (response2.status === 200) {
      window.location.href = '/allPosts';
    }
  }
});
