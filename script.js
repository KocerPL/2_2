(function () {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')
  const select = document.querySelector("select");
  const postTitleInput = document.getElementById("postTitleInput");
  const postBodyInput = document.getElementById("postBodyInput");
  genSelectList();
  function delay(miliseconds)
  {
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve();
      },miliseconds);
    })
  }
  function genSelectList()
  {
    for(let i=0;i<10;i++)
    {
      let option = document.createElement("option");
      option.value = i+1;
      option.innerHTML = `${i+1}`;
      select.appendChild(option);
    }
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
    //Z pośpiechu nie zauważyłem że nie dałem przed fetchem - poprawione
     answer.innerHTML  = "Loading...";
    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let posts = await response.json();
    let list = document.createElement("ul");
   
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

  cw2.addEventListener("click", async function () {
    answer.innerHTML  = "Loading...";
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${select.value}`)
    let post = await response.json();
    await delay(1000);
    answer.innerHTML = `<b>${post.title}</b></br>${post.body}`;
  })
  cw3.addEventListener("click", async function () {
    answer.innerHTML = "Processing...";
    let requestBody = {
      title: postTitleInput.value,
      body:postBodyInput.value,
      userId:1
    };
    let response = await fetch("https://jsonplaceholder.typicode.com/posts",
      {
        method:"POST",
        body:JSON.stringify(requestBody),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
    if(!response.ok)
    {
      answer.innerHTML = "Błędna odpowiedź. Zobacz konsole po więcej informacji";
      console.error(answer);
      return;
    }
    let json = await response.json();
    await delay(1000);
    answer.innerHTML = `Dodano nowy post o ID = ${json.id}`;
  })

})();
