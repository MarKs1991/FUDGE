namespace PongMaster {

    interface KeyPressed {
        [code : string]: boolean;
    }

    import f = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    let viewport: f.Viewport;

    let ballColor: f.Color = new f.Color(0, 1, 0, 0);

    let mtrBall: f.Material = new f.Material("ballColor", f.ShaderUniColor, new f.CoatColored(ballColor));
    let meshQuad: f.MeshCube = new f.MeshCube();


    let heroBlock: f.Node = new f.Node("Hero0");

    let rodeIsland: f.Node = new f.Node("rodeIsland");
    let cleveland: f.Node = new f.Node("cleveland");
    let smasher: f.Node = new f.Node("smasher");
    let smasher3d: f.Node = new f.Node("smasher3d");
    let blueRicky: f.Node = new f.Node("blueRicky");
    let orangeRicky: f.Node = new f.Node("orangeRicky");
    let stableL: f.Node = new f.Node("orangeRicky");
    let cornerBlock: f.Node = new f.Node("cornerBlock");

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createCubeTetris();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translation = new f.Vector3(-8, 8, 35);
        cmpCamera.pivot.rotateX(-20);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();


        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }
    function update(_event: Event): void {
        TesterInput();
        f.RenderManager.update();
        viewport.draw();
    }

    function TesterInput(): void {
        if (keysPressed[f.KEYBOARD_CODE.W]) 
            heroBlock.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        


        if (keysPressed[f.KEYBOARD_CODE.S]) 
            heroBlock.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        


        if (keysPressed[f.KEYBOARD_CODE.A]) 
            heroBlock.cmpTransform.local.translate(new f.Vector3(-0.3, 0, 0));
        


        if (keysPressed[f.KEYBOARD_CODE.D]) {
            heroBlock.cmpTransform.local.translate(f.Vector3.X(0.3));
            f.Debug.log(heroBlock);
        }

        if (keysPressed[f.KEYBOARD_CODE.R]) {
            heroBlock.cmpTransform.local.rotateZ(90);
            f.Debug.log(heroBlock);
            keysPressed[f.KEYBOARD_CODE.R] = false;

        }


        // f.Debug.log(ball.cmpTransform.local.translation.x);
    }


    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }

    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }


    function createCubeTetris(): f.Node {


        let CubeTetris: f.Node = new f.Node("CubeTetris");
        
//==========================================
        let heroBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(2, 3, 0)
        ];
        heroBlock = createBlock(heroBlockPosArray, heroBlock);
        CubeTetris.appendChild(heroBlock);
//==========================================
        let rodeIslandBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(3, 1, 0),
            new f.Vector3(3, 2, 0)
        ];
        rodeIsland = createBlock(rodeIslandBlockPosArray, rodeIsland);
        CubeTetris.appendChild(rodeIsland);
//==========================================
        let clevelandBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 2, 0)
        ];
        cleveland = createBlock(clevelandBlockPosArray, cleveland);
        CubeTetris.appendChild(cleveland);
//==========================================
        let smasherBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 0, 0)
        ];
        smasher = createBlock(smasherBlockPosArray, smasher);
        CubeTetris.appendChild(smasher);
//==========================================
        let smasher3dBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(1, 1, 0),
            new f.Vector3(1, 0, 0),
            new f.Vector3(2, 0, 1),
            new f.Vector3(2, 1, 1),
            new f.Vector3(1, 1, 1),
            new f.Vector3(1, 0, 1)
        ];
        smasher3d = createBlock(smasher3dBlockPosArray, smasher3d);
        CubeTetris.appendChild(smasher3d);
//==========================================
        let blueRickyBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(1, 2, 0)
        ];
        blueRicky = createBlock(blueRickyBlockPosArray, blueRicky);
        CubeTetris.appendChild(blueRicky);
//==========================================
        let orangeRickyBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(3, 2, 0)
        ];
        orangeRicky = createBlock(orangeRickyBlockPosArray, orangeRicky);
        CubeTetris.appendChild(orangeRicky);
//==========================================
        let stableLBlockPosArray: f.Vector3[] = [
            new f.Vector3(2, 0, 0), new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(1, 2, 0),
            new f.Vector3(0, 2, 0)
        ];
        stableL = createBlock(stableLBlockPosArray, stableL);
        CubeTetris.appendChild(stableL);
//==========================================
        let cornerBlockPosArray: f.Vector3[] = [
           // new f.Vector3(2, 0, 0),
            new f.Vector3(2, 0, 1),
            new f.Vector3(2, 0, 2),
            new f.Vector3(2, 1, 0),
            new f.Vector3(2, 2, 0),
            new f.Vector3(2, 1, 1)
        ];
        cornerBlock = createBlock(cornerBlockPosArray, cornerBlock);
        CubeTetris.appendChild(cornerBlock);
//==========================================

        heroBlock.cmpTransform.local.translation = new f.Vector3(4, 0, 0);
        rodeIsland.cmpTransform.local.translation = new f.Vector3(-16, 0, 0);
        cleveland.cmpTransform.local.translation = new f.Vector3(-12, 0, 0);
        smasher.cmpTransform.local.translation = new f.Vector3(-8, 0, 0);
        smasher3d.cmpTransform.local.translation = new f.Vector3(-8, -5, 0);
        blueRicky.cmpTransform.local.translation = new f.Vector3(-4, 0, 0);
        orangeRicky.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        stableL.cmpTransform.local.translation = new f.Vector3(-20, 0, 0);
        cornerBlock.cmpTransform.local.translation = new f.Vector3(-20, -5, 0);
        cornerBlock.cmpTransform.local.rotateY (90);
        return CubeTetris;
    }

    //custom BlockGenerator
    function createBlock(blockPosArray: f.Vector3[], blockRoot: f.Node): f.Node {
        blockRoot.addComponent(new f.ComponentTransform());

        let blockMatrix: Number[][][];
        blockMatrix = [];

        for (let i: number = 0; i < 4; i++) {
            blockMatrix[i] = [];
            for (let j: number = 0; j < 4; j++) {
                blockMatrix[i][j] = [];
                for (let k: number = 0; k < 4; k++) {
                    blockMatrix[i][j][k] = 0;
                }
            }
        }
        let blockArray: f.Node[] = [];

        for (let i: number = 0; i < blockPosArray.length; i++) {
            blockArray[i] = new f.Node("Block" + "1");

            blockArray[i].addComponent(new f.ComponentMesh(meshQuad));
            blockArray[i].addComponent(new f.ComponentMaterial(mtrBall));
            blockArray[i].addComponent(new f.ComponentTransform());

            blockArray[i].cmpTransform.local.translation = blockPosArray[i];

            blockMatrix[blockPosArray[i].x][blockPosArray[i].y][blockPosArray[i].z] = 1;

            blockRoot.appendChild(blockArray[i]);
            
        }
        f.Debug.log(blockMatrix);
        return blockRoot;
    }

}
