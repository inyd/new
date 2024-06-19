document.addEventListener('DOMContentLoaded', function() {
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }

    window.login = function() {
        var user = document.getElementById('user').value;
        var pass = document.getElementById('pass').value;
        var storedPass = getCookie(user);
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
        document.querySelector('h1').innerText = 'Login';

        if (storedPass === null) {
            alert('회원가입하세요');
        } else if (storedPass !== pass) {
            alert('비밀번호가 틀렸습니다');
        } else {
            var lastVisit = getCookie(user + "_lastVisit");
            var currentTime = new Date().getTime();
            var twentyMinutes = 20 * 60 * 1000;  //방문 20분 후부터 방문횟수가 증가되도록 설정함

            if (!lastVisit || (currentTime - lastVisit) > twentyMinutes) {
                var visits = getCookie(user + "_visits");
                visits = visits ? parseInt(visits) + 1 : 1;
                setCookie(user + "_visits", visits, 7);
                setCookie(user + "_lastVisit", currentTime, 7);
                alert(user + '님, ' + visits + '번째 방문입니다!');
            } else {
                var visits = getCookie(user + "_visits");
                alert(user + '님, ' + visits + '번째 방문입니다!');
            }
            window.location.href = "home copy.html";
        }
    }

    window.showSignupForm = function() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
        document.querySelector('h1').innerText = '회원가입';
    }

    window.signup = function() {
        var user = document.getElementById('signupUser').value;
        var pass = document.getElementById('signupPass').value;
        var email = document.getElementById('signupEmail').value;
        var name = document.getElementById('signupName').value;
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
        document.querySelector('h1').innerText = 'Login';
        if (!validateEmail(email)) {
            alert('유효한 이메일 주소를 입력하세요.');
            return;
        }

        if (getCookie(user) !== null) {
            alert('이미 존재하는 ID입니다.');
            return;
        }

        setCookie(user, pass, 7);
        alert('회원가입이 완료되었습니다.');
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }
});
