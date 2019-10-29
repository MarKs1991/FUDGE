"use strict";
var L02FirstFudge;
(function (L02FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    let mainnode = new f.Node("Main");
    let cubenode = new f.Node("Ball");
    let rightPlayerNode = new f.Node("Player1");
    let leftPlayerNode = new f.Node("Player2");
    function handleLoad() {
        //let cubenode: f.Node = new f.Node("Ball");
        mainnode.appendChild(cubenode);
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        cubenode.addComponent(cmpMesh);
        cmpMesh.pivot.translateX(1);
        let white = new f.Color(1, 1, 1, 1);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(white));
        let mtrCmp = new f.ComponentMaterial(mtrSolidWhite);
        cubenode.addComponent(mtrCmp);
        let camera = new f.ComponentCamera();
        leftPlayerNode = renderLeftPlayer();
        rightPlayerNode = renderRightPlayer();
        mainnode.appendChild(leftPlayerNode);
        mainnode.appendChild(rightPlayerNode);
        //let cmpTransform : f.ComponentTransform = new f.ComponentTransform();
        mainnode.appendChild(leftPlayerNode);
        mainnode.appendChild(rightPlayerNode);
        //let cmpTransform = leftPlayerNode.getComponent(f.ComponentTransform);
        //f.Debug.log(cmpTransform);
        camera.pivot.translateZ(40);
        L02FirstFudge.viewport = new f.Viewport();
        L02FirstFudge.viewport.initialize("Viewport", mainnode, camera, canvas);
        cmpMesh.pivot.rotateZ(0);
        let testnode = mainnode.getChildren();
        f.Debug.log(testnode);
        //cubenode.getComponent(f.ComponentMesh)
        L02FirstFudge.viewport.draw();
        f.Debug.log(mainnode);
    }
    function renderLeftPlayer() {
        //let leftPlayerNode: f.Node = new f.Node("Player1");
        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);
        let leftPlayerMesh = new f.MeshQuad();
        let cmpLeftPlayerMesh = new f.ComponentMesh(leftPlayerMesh);
        leftPlayerNode.addComponent(cmpLeftPlayerMesh);
        let red = new f.Color(1, 0, 0, 1);
        //cmpLeftPlayerMesh.pivot.translateX(-20);
        let mtrSolidRed = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrRedCmp = new f.ComponentMaterial(mtrSolidRed);
        leftPlayerNode.addComponent(mtrRedCmp);
        //f.Debug.log(leftPlayerNode.cmpTransform.local);
        leftPlayerNode.getComponent(f.ComponentMesh).pivot.scaleY(3);
        let cmpTransform = new f.ComponentTransform();
        leftPlayerNode.addComponent(cmpTransform);
        cmpTransform.local.translateX(-20);
        return leftPlayerNode;
    }
    function renderRightPlayer() {
        //let rightPlayerNode: f.Node = new f.Node("Player2");
        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);
        let rightPlayerMesh = new f.MeshQuad();
        let cmprightPlayerMesh = new f.ComponentMesh(rightPlayerMesh);
        rightPlayerNode.addComponent(cmprightPlayerMesh);
        let green = new f.Color(0, 1, 0, 1);
        //cmprightPlayerMesh.pivot.translateX(20);
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrGreenCmp = new f.ComponentMaterial(mtrSolidGreen);
        rightPlayerNode.addComponent(mtrGreenCmp);
        //cmpTransform.local.translateX(20);
        //rightPlayerNode.addComponent(cmpTransform);
        //let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
        rightPlayerNode.getComponent(f.ComponentMesh).pivot.scaleY(3);
        return rightPlayerNode;
    }
    window.addEventListener("keydown", event => {
        if (event.keyCode === 87) {
            //let movingNode: f.Node[] = mainnode.getChildrenByName("Player1");
            //   let comp: f.Component[] = movingNode[0].getAllComponents();
            //f.Debug.log(comp);
            let mesh = rightPlayerNode.getComponent(f.ComponentMesh);
            mesh.pivot.translateY(1);
            rightPlayerNode.cmpTransform.local.translateY(2);
            //let node: f.Node[] = mainnode.getChildren("leftPlayerNode");
            //node[0].getComponents()
            L02FirstFudge.viewport.draw();
            f.Debug.log("leftPlayerNode");
        }
        // do something
    });
    window.addEventListener("keydown", event => {
        if (event.keyCode === 83) {
            let mesh = rightPlayerNode.getComponent(f.ComponentMesh);
            mesh.pivot.translateY(-1);
            rightPlayerNode.cmpTransform.local.translateY(-1);
            L02FirstFudge.viewport.draw();
            f.Debug.log("leftPlayerNode");
        }
        // do something
    });
    /*
          function createPong(): void
          {
    
            let pong: f.Node = new f.Node("Pong");
            let ball: f.Node = new f.Node("Ball");
            let leftPaddle: f.Node = new f.Node("leftPaddle");
            let rightPaddle: f.Node = new f.Node("rightPaddle");
    
            let BallMesh: f.MeshQuad = new f.MeshQuad();
            let leftPaddleMesh: f.MeshQuad = new f.MeshQuad();
            let rightPaddleMesh: f.MeshQuad = new f.MeshQuad();
    
            let cmpBallMesh: f.ComponentMesh = new f.ComponentMesh(BallMesh);
            
            pong.addComponent(cmpBallMesh);
    
    
          }
       */
})(L02FirstFudge || (L02FirstFudge = {}));
//# sourceMappingURL=Main.js.map