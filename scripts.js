import uitoolkit from './@zoom/videosdk-ui-toolkit/index.js'

const urlParams = new URLSearchParams(window.location.search);
const preSetSession = urlParams.get('session');
const preSetpasscode = urlParams.get('passcode');

const sessionContainer = document.getElementById('sessionContainer')

if(preSetSession) {
    // set session in inputs
    document.getElementById('sessionName').value = preSetSession
}

if(preSetpasscode) {
    // set passcode in inputs
    if(preSetpasscode.length > 10) {
        document.getElementById('passcodeLength').style.display = 'block'
    } else {
        document.getElementById('sessionPasscode').value = preSetpasscode
    }
}

var config = {
    videoSDKJWT: '',
    sessionName: 'SessionA',
    userName: 'UserA',
    sessionPasscode: 'abc123',
    features: ['video', 'audio', 'settings', 'users', 'chat', 'share']
};

window.getVideoSDKJWT = getVideoSDKJWT

function getVideoSDKJWT() {
    document.getElementById('nameRequired').style.display = 'none'
    document.getElementById('sessionNameRequired').style.display = 'none'
    document.getElementById('passcodeLength').style.display = 'none'
    document.getElementById('rating').style.display = 'none'
    
    config.userName = document.getElementById('yourName').value
    config.sessionName = document.getElementById('sessionName').value
    config.sessionPasscode = document.getElementById('sessionPasscode').value

    if(config.userName && config.sessionName) {
        fetch('https://or116ttpz8.execute-api.us-west-1.amazonaws.com/default/videosdk', {
            method: 'POST',
            body: JSON.stringify({
                sessionName:  config.sessionName,
                role: 1,
                telemetryTrackingId: `tommy-ui-toolkit-${config.sessionName}-${config.userName}-${Date.now()}`
            })
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            config.videoSDKJWT = data.signature
            joinSession()
        }).catch((error) => {
            console.log(error)
        })
    } else {
        if(!config.userName) {
            document.getElementById('nameRequired').style.display = 'block'
        }

        if(!config.sessionName) {
            document.getElementById('sessionNameRequired').style.display = 'block'
        }
    }
}

function joinSession() {
    uitoolkit.joinSession(sessionContainer, config)

    document.getElementById('header').style.display = 'none'
    document.getElementById('join-flow').style.display = 'none'

    uitoolkit.onSessionClosed(sessionClosed)
}

var sessionClosed = (() => {
    console.log('session closed')
    uitoolkit.closeSession(sessionContainer)
    document.getElementById('header').style.display = 'block'
    document.getElementById('join-flow').style.display = 'block'
    document.getElementById('rating').style.display = 'block'
})