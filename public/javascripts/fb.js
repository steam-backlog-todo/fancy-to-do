function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);

  if (response.status === 'connected') {
    $('.fb-login-button').hide()
    $('.fb-logout-button').show()

    const token = response.authResponse.accessToken;

    // axios
    axios.post('http://localhost:3000/fb-api/facebook', {token:token})
      .then((response) => {
        console.log('==============$$$$$$$$$$$$$$$');
        console.log(response)
        if (response.data) {
          console.log('Successful login for: ' + response.data.fbData.name);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userID', response.data.userData._id);
          localStorage.setItem('userName', response.data.userData.userName);
          // localStorage.setItem('profile_pic_URL', response.data.fbData.picture.data.url);
          // console.log(localStorage.profile_pic_URL);
          // console.log($('#user-welcome').text());
          $('#user-welcome').text(`Welcome, ${localStorage.getItem('userName')}`)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  } else {
    $('.fb-login-button').show();
    $('.fb-logout-button').hide();
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '2012469662326245',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// function login () {
//   FB.login((response)=>{
//     statusChangeCallback(response)
//   }, {scope:'public_profile,email'})
// }

function logout(){
  FB.logout((response)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    statusChangeCallback(response);
    location.reload();
  })
}
