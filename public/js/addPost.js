const mainDiv = document.querySelector('#add');
const allPosts = document.querySelector('.container2');
const addUser = document.querySelector('.addUser');

mainDiv.addEventListener('click', async (e) => {
  if (e.target.id === 'add') {
    const url = e.target.parentNode.children[0].children[1].value;
    const post = e.target.parentNode.children[1].children[1].value;
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ url, post }),
    });

    const result = await response.json();
    console.log("====>>>>", result);
    if (result.posts === 'OK') {
      allPosts.insertAdjacentHTML(
        'afterbegin',
        `<div id='${result.id}' className="post">
            <img src='${result.url}' alt="photo loaded" />
               <p>${result.userName} пишет:</p>
               <p>${result.post}</p>
               <p>Дата создания: ${result.time}</p>
              <div>
      <button id="${result.id}" type="submit" name="update-like" className="heart" disabled="${result.userName}">❤</button>
                  <p id="post-like-${result.id}" className="heartValue" name="liked">
                  ${result.like} лайков 
                  </p>
                </>
            </div>
            <hr />
           </div>`,
      );
      addUser.reset();
    }
  }
});
