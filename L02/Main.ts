namespace L04_PongAnimated {

    interface KeyPressed {
        [code : string]: boolean;
    }

    import f = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    let viewport: f.Viewport;

    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("PaddleLeft");
    let paddleRight: f.Node = new f.Node("PaddleRight");
    let playArea: f.Node = new f.Node("Playarea");

    let red: f.Color = new f.Color(1, 0, 0, 0);
    let green: f.Color = new f.Color(0, 1, 0, 0);
    let yellow: f.Color = new f.Color(1, 0, 1, 0);


    let ballSpeed: f.Vector3 = new f.Vector3(-.2, .2, 0);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
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
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function update(_event: Event): void {

        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP]) 
            paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN]) 
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        
        if (keysPressed[f.KEYBOARD_CODE.W]) 
            paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        
        if (keysPressed[f.KEYBOARD_CODE.S]) 
            paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        


        moveBall();
        // ball.cmpTransform.local.translation = new f.Vector3(20,5,0);

        if (detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local)) {
            ballSpeed.x = ballSpeed.x * - 1;
            green.r = Math.random();
            green.g = Math.random();
            green.b = Math.random();
        }
        if (detectHit(ball.cmpTransform.local.translation, paddleLeft.cmpTransform.local)) {
            ballSpeed.x = ballSpeed.x * - 1;
            red.r = Math.random();
            red.g = Math.random();
            red.b = Math.random();
        }


        if (inPlayArea(ball.cmpTransform.local.translation, playArea.cmpTransform.local) == false 
        && ball.cmpTransform.local.translation.y > 14 || ball.cmpTransform.local.translation.y < -14) {
            //ballSpeed.x = ballSpeed.x * Math.random();
            ballSpeed.y = ballSpeed.y * - 1;
        }

        if (inPlayArea(ball.cmpTransform.local.translation, playArea.cmpTransform.local) == false 
        && ball.cmpTransform.local.translation.x > 21 || ball.cmpTransform.local.translation.x < -21) {
            //ballSpeed.x = ballSpeed.x * - 1;
            ballSpeed.y = ballSpeed.y * Math.random();
        }


        f.RenderManager.update();
        viewport.draw();
    }

    function detectHit(_ballPos: f.Vector3, paddlePos: f.Matrix4x4): boolean {
        let topLeft: f.Vector3 = (new f.Vector3(paddlePos.translation.x - paddlePos.scaling.x, paddlePos.translation.y + paddlePos.scaling.y, 0));
        let bottomRight: f.Vector3 = (new f.Vector3(paddlePos.translation.x + paddlePos.scaling.x, paddlePos.translation.y - paddlePos.scaling.y, 0));

        // f.Debug.log("tx: " + topLeft.x + "ty: " + topLeft.y + "bx: " + bottomRight.x + "by: " + bottomRight.y);

        // f.Debug.log(_ballPos.x + "      " + _ballPos.y)
        if (_ballPos.x > topLeft.x && _ballPos.y < topLeft.y) {
            if (_ballPos.x < bottomRight.x && _ballPos.y > bottomRight.y) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    function inPlayArea(_ballPos: f.Vector3, playAreaMatrix: f.Matrix4x4) {
        let topLeft: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x - playAreaMatrix.scaling.x, playAreaMatrix.translation.y + playAreaMatrix.scaling.y, 0));
        // let topRight: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x + playAreaMatrix.scaling.x, playAreaMatrix.translation.y + playAreaMatrix.scaling.y, 0));

        // let bottomLeft: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x - playAreaMatrix.scaling.x, playAreaMatrix.translation.y - playAreaMatrix.scaling.y, 0));
        let bottomRight: f.Vector3 = (new f.Vector3(playAreaMatrix.translation.x + playAreaMatrix.scaling.x, playAreaMatrix.translation.y - playAreaMatrix.scaling.y, 0));


        // f.Debug.log(bottomRight.x);
        // f.Debug.log(_ballPos.x);
        // f.Debug.log(topLeft.x);

        if (_ballPos.x > topLeft.x && _ballPos.y < topLeft.y && _ballPos.x) {
            if (_ballPos.x < bottomRight.x && _ballPos.y > bottomRight.y) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function moveBall(): void {
        ball.cmpTransform.local.translate(new f.Vector3(ballSpeed.x, ballSpeed.y, ballSpeed.z));
    }

    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function createPong(): f.Node {
        let pong: f.Node = new f.Node("Pong");


        let mtrSolidRed: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrSolidYellow: f.Material = new f.Material("SolidYellow", f.ShaderUniColor, new f.CoatColored(yellow));
        let meshQuad: f.MeshQuad = new f.MeshQuad();

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
}
