const btn = document.querySelector('[data-btn]');
const container = document.querySelector('[data-container]');

function fetchData() {
  fetch('http://localhost:3001/getdata', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const checkArrowLength = data.result.length > 0;

      if (checkArrowLength) {
        let template = data.result
          .map(
            ({ email, hero, id, name, password, phoneNumber, skills, text }) =>
              `
    <div class='card'>
      <div class='top'>
        <h2>Welcome</h2>
        <h3>This is a welcome card reserverd for you!...</h3>
      </div>
      <div class='profile'>
        <img
          src='https://whova.com/wp-content/uploads/2020/10/Untitled-design-18.png'
          id='card-img'
        />
      </div>
      <div class='info'>
        <label for='Name'>Id: ${id}</label>     
        <p class='person-info'><span class="head-color">Name:</span>${name}</p>
        <p class='person-info'><span class="head-color">Email:</span>${email}</p>
        <p class='person-info'><span class="head-color">Hero:</span>${hero}</p>
        <p class='person-info'><span class="head-color">Skills:</span>${skills}</p>
        <p class='person-info'><span class="head-color">Phone:</span>${phoneNumber}</p>
        <p class='person-info'><span class="head-color">Comment:</span>${
          text ? text : 'Client did not leave comment'
        }</p>
      </div>
    </div>
    `
          )
          .join('');
        container.insertAdjacentHTML('beforeend', template);
      } else {
        console.log('Something went wrong on the backend. We will back soon');
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

btn.addEventListener('click', fetchData);
