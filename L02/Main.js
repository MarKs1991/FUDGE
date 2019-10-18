"use strict";
var L02FirstFudge;
(function (L02FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    var mainnode = new f.Node("Main");
    function handleLoad() {
        let cubenode = new f.Node("Quad");
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
        //f.Matrix4x4()
        let leftPlayerNode = new f.Node("Player");
        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);
        let leftPlayerMesh = new f.MeshQuad();
        let cmpLeftPlayerMesh = new f.ComponentMesh(leftPlayerMesh);
        leftPlayerNode.addComponent(cmpLeftPlayerMesh);
        let red = new f.Color(1, 0, 0, 1);
        cmpLeftPlayerMesh.pivot.translateX(-20);
        let mtrSolidRed = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrRedCmp = new f.ComponentMaterial(mtrSolidRed);
        leftPlayerNode.addComponent(mtrRedCmp);
        cmpLeftPlayerMesh.pivot.translateY(3);
        let rightPlayerNode = new f.Node("Player2");
        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);
        let rightPlayerMesh = new f.MeshQuad();
        let cmprightPlayerMesh = new f.ComponentMesh(rightPlayerMesh);
        rightPlayerNode.addComponent(cmprightPlayerMesh);
        let green = new f.Color(0, 1, 0, 1);
        cmprightPlayerMesh.pivot.translateX(20);
        let mtrSolidGreen = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrGreenCmp = new f.ComponentMaterial(mtrSolidGreen);
        rightPlayerNode.addComponent(mtrGreenCmp);
        cmprightPlayerMesh.pivot.translateY(3);
        mainnode.appendChild(leftPlayerNode);
        mainnode.appendChild(rightPlayerNode);
        camera.pivot.translateZ(40);
        L02FirstFudge.viewport = new f.Viewport();
        L02FirstFudge.viewport.initialize("Viewport", mainnode, camera, canvas);
        cmpMesh.pivot.rotateZ(0);
        //cubenode.getComponent(f.ComponentMesh)
        L02FirstFudge.viewport.draw();
        f.Debug.log(mainnode);
    }
    /*
    function renderLeftPlayer(): f.Node {

        

        let leftPlayerNode: f.Node = new f.Node("Player");

  

        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);

        let leftPlayerMesh: f.MeshQuad = new f.MeshQuad();
        let cmpLeftPlayerMesh: f.ComponentMesh = new f.ComponentMesh(leftPlayerMesh);
        leftPlayerNode.addComponent(cmpLeftPlayerMesh);
   

        let red: f.Color = new f.Color(1,1,0,1);
        
        cmpLeftPlayerMesh.pivot.translateX(-20);

        let mtrSolidRed: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrRedCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidRed);
        leftPlayerNode.addComponent(mtrRedCmp);

        cmpLeftPlayerMesh.pivot.translateY(3);

        return leftPlayerNode;
    }

   */
})(L02FirstFudge || (L02FirstFudge = {}));
//# sourceMappingURL=Main.js.map