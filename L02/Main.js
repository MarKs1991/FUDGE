"use strict";
var L04_PongAnimated;
(function (L04_PongAnimated) {
    var f = FudgeCore;
    let keysPressed = {};
    window.addEventListener("load", hndLoad);
    let viewport;
    let ball = new f.Node("Ball");
    let paddleLeft = new f.Node("PaddleLeft");
    let paddleRight = new f.Node("PaddleRight");
    let playArea = new f.Node("Playarea");
    let scoreLeftPlayer = 0;
    let scoreRightPlayer = 0;
    let t0 = 10;
    let t1 = 10;
    let blocked = false;
    let red = new f.Color(1, 0, 0, 0);
    let green = new f.Color(0, 1, 0, 0);
    let yellow = new f.Color(1, 0, 1, 0);
    let ballSpeed = new f.Vector3(.2, .2, 0);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = createPong();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(6);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(6);
        // playArea.cmpTransform.local.translateX();
        playArea.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        playArea.cmpTransform.local.scaling.x = 21;
        playArea.cmpTransform.local.scaling.y = 14;
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        f.Debug.log(playArea);
        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function update(_event) {
        KeyboardInput();
        moveBall();
        if (detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local)) {
            if (ball.cmpTransform.local.translation.x >= 0 && ball.cmpTransform.local.translation.x <= 4) {
                ballSpeed.x = (ballSpeed.x * .6) * -1;
                f.Debug.log("MitteR");
            }
            else if (ball.cmpTransform.local.translation.y >= 0 && ball.cmpTransform.local.translation.y <= -4) {
                ballSpeed.x = (ballSpeed.x * .6) * -1;
                f.Debug.log("MitteL");
            }
            else if (ball.cmpTransform.local.translation.y >= 4 && ball.cmpTransform.local.translation.y <= 8) {
                ballSpeed.x = (ballSpeed.x * 1) * -1;
                f.Debug.log("a1r");
            }
            else if (ball.cmpTransform.local.translation.y >= -4 && ball.cmpTransform.local.translation.y <= -8) {
                ballSpeed.x = (ballSpeed.x * 1) * -1;
                f.Debug.log("a1l");
            }
            else if (ball.cmpTransform.local.translation.y >= 8 && ball.cmpTransform.local.translation.y <= 12) {
                ballSpeed.x = (ballSpeed.x * 1.4) * -1;
                f.Debug.log("a2r");
            }
            else if (ball.cmpTransform.local.translation.y >= -8 && ball.cmpTransform.local.translation.y <= -12) {
                ballSpeed.x = (ballSpeed.x * 1.4) * -1;
                f.Debug.log("a2l");
            }
            else if (ball.cmpTransform.local.translation.y >= 12 && ball.cmpTransform.local.translation.y <= 20) {
                ballSpeed.x = (ballSpeed.x * 1.4) * -1;
                f.Debug.log("a3r");
            }
            else if (ball.cmpTransform.local.translation.y >= -12 && ball.cmpTransform.local.translation.y <= -20) {
                ballSpeed.x = (ballSpeed.x * 1.4) * -1;
                f.Debug.log("a3l");
            }
            else {
                ballSpeed.x = (ballSpeed.x * 1.0) * -1;
                f.Debug.log("es");
            }
        }
        if (detectHit(ball.cmpTransform.local.translation, paddleLeft.cmpTransform.local)) {
            ballSpeed.x = ballSpeed.x * -1;
            // red.r = Math.random();
            // red.g = Math.random();
            // red.b = Math.random();
        }
        if (inPlayArea(ball.cmpTransform.local.translation, playArea.cmpTransform.local) == false && ball.cmpTransform.local.translation.y > 14 || ball.cmpTransform.local.translation.y < -14) { // ballSpeed.x = ballSpeed.x * Math.random();
            if (ball.cmpTransform.local.translation.x >= 0 && ball.cmpTransform.local.translation.x <= 7 && !blocked) {
                ballSpeed.y = (ballSpeed.y * .6) * -1;
                f.Debug.log("MitteR");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x <= 0 && ball.cmpTransform.local.translation.x <= -7 && !blocked) {
                ballSpeed.y = (ballSpeed.y * .6) * -1;
                f.Debug.log("MitteL");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x >= 7 && ball.cmpTransform.local.translation.x <= 14 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1) * -1;
                f.Debug.log("a1r");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x <= -7 && ball.cmpTransform.local.translation.x <= -14 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1) * -1;
                f.Debug.log("a1l");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x >= 14 && ball.cmpTransform.local.translation.x <= 21 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1.1) * -1;
                f.Debug.log("a2r");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x <= -14 && ball.cmpTransform.local.translation.x <= -21 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1.1) * -1;
                f.Debug.log("a2l");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x >= 21 && ball.cmpTransform.local.translation.x <= 40 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1.2) * -1;
                f.Debug.log("a3r");
                isBlocked();
            }
            else if (ball.cmpTransform.local.translation.x <= -21 && ball.cmpTransform.local.translation.x <= -40 && !blocked) {
                ballSpeed.y = (ballSpeed.y * 1.2) * -1;
                f.Debug.log("a3l");
                isBlocked();
            }
            else {
                //ballSpeed.y = (ballSpeed.y * 1.0) * - 1;
                //f.Debug.log("es");
                isBlocked();
            }
        }
        t1 = performance.now();
        if (inPlayArea(ball.cmpTransform.local.translation, playArea.cmpTransform.local) == false && ball.cmpTransform.local.translation.x > 21 || ball.cmpTransform.local.translation.x < -21) {
            ballSpeed.x = ballSpeed.x * -1;
            if (ball.cmpTransform.local.translation.x > 21) {
                scoreLeftPlayer++;
            }
            console.log("1");
            if (ball.cmpTransform.local.translation.x < -21 && !blocked) {
                scoreRightPlayer++;
                console.log("2");
                isBlocked();
            }
        }
        if (t1 - t0 > 122) {
            blocked = false;
            console.log("open");
        }
        else {
            console.log("close" + (t1 - t0));
        }
        let scoreCounterLeftPlayer = document.getElementById("scoreLeftPlayer");
        let scoreCounterRightPlayer = document.getElementById("scoreRightPlayer");
        scoreCounterLeftPlayer.innerHTML = scoreLeftPlayer.toString();
        scoreCounterRightPlayer.innerHTML = scoreRightPlayer.toString();
        f.RenderManager.update();
        viewport.draw();
    }
    function isBlocked() {
        if (blocked == true) {
            t1 = performance.now();
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
        }
        t0 = performance.now();
        blocked = true;
    }
    function detectHit(_ballPos, paddlePos) {
        let topLeft = (new f.Vector3(paddlePos.translation.x - paddlePos.scaling.x, paddlePos.translation.y + paddlePos.scaling.y, 0));
        let bottomRight = (new f.Vector3(paddlePos.translation.x + paddlePos.scaling.x, paddlePos.translation.y - paddlePos.scaling.y, 0));
        // f.Debug.log("tx: " + topLeft.x + "ty: " + topLeft.y + "bx: " + bottomRight.x + "by: " + bottomRight.y);
        // f.Debug.log(_ballPos.x + "      " + _ballPos.y)
        if (_ballPos.x > topLeft.x && _ballPos.y < topLeft.y) {
            if (_ballPos.x < bottomRight.x && _ballPos.y > bottomRight.y) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    function inPlayArea(_ballPos, playAreaMatrix) {
        let topLeft = (new f.Vector3(playAreaMatrix.translation.x - playAreaMatrix.scaling.x, playAreaMatrix.translation.y + playAreaMatrix.scaling.y, 0));
        // let topRight: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x + playAreaMatrix.scaling.x, playAreaMatrix.translation.y + playAreaMatrix.scaling.y, 0));
        // let bottomLeft: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x - playAreaMatrix.scaling.x, playAreaMatrix.translation.y - playAreaMatrix.scaling.y, 0));
        let bottomRight = (new f.Vector3(playAreaMatrix.translation.x + playAreaMatrix.scaling.x, playAreaMatrix.translation.y - playAreaMatrix.scaling.y, 0));
        // f.Debug.log(bottomRight.x);
        // f.Debug.log(_ballPos.x);
        // f.Debug.log(topLeft.x);
        if (_ballPos.x > topLeft.x && _ballPos.y < topLeft.y && _ballPos.x) {
            if (_ballPos.x < bottomRight.x && _ballPos.y > bottomRight.y) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    function KeyboardInput() {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP])
            paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN])
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        if (keysPressed[f.KEYBOARD_CODE.W])
            paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.S])
            paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));
    }
    function moveBall() {
        ball.cmpTransform.local.translate(new f.Vector3(ballSpeed.x, ballSpeed.y, ballSpeed.z));
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function createPong() {
        let pong = new f.Node("Pong");
        let mtrSolidRed = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrSolidYellow = new f.Material("SolidYellow", f.ShaderUniColor, new f.CoatColored(yellow));
        let meshQuad = new f.MeshQuad();
        ball.addComponent(new f.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        paddleRight.addComponent(new f.ComponentMesh(meshQuad));
        // playArea.addComponent(new f.ComponentMesh(meshQuad));
        ball.addComponent(new f.ComponentMaterial(mtrSolidYellow));
        paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidRed));
        paddleRight.addComponent(new f.ComponentMaterial(mtrSolidGreen));
        // playArea.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new f.ComponentTransform());
        paddleLeft.addComponent(new f.ComponentTransform());
        paddleRight.addComponent(new f.ComponentTransform());
        playArea.addComponent(new f.ComponentTransform());
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(playArea);
        return pong;
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
//# sourceMappingURL=Main.js.map