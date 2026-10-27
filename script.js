(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  function delay(miliseconds)
  {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve();
      },miliseconds);
    })
  }
  example.addEventListener("click", function () {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", async function () {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let posts = await response.json();
    let list = document.createElement("ul");
    answer.innerHTML  = "Loading...";
    await delay(1000);
    for(let post of posts)
    {
      let item = document.createElement("li");
      item.innerHTML = `<b>${post.title}</b></br>${post.body}`;
      list.appendChild(item);
    }
    answer.innerHTML ="";
    answer.appendChild(list);
  });

  cw2.addEventListener("click", function () {
    //TODO
  })

  cw3.addEventListener("click", function () {
    //TODO
  })

})();
