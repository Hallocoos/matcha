async function handleSubmit(username, password) {

  var body = JSON.stringify({ username, password });

  const response = await fetch('/login', {
    method: 'POST',
    body: body
  })
  
  const { token } = await response.json()

  console.log(token);
  await login({ token })
}