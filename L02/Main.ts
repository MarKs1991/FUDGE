namespace L02FirstFudge {
    import f = FudgeCore;
    
    window.addEventListener("load", handleLoad);
    
    
    export let viewport: f.Viewport;

    var mainnode: f.Node = new f.Node("Main");


    function handleLoad(): void {
        
        let cubenode: f.Node = new f.Node("Quad");
   
        mainnode.appendChild(cubenode);

        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();

        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        cubenode.addComponent(cmpMesh);
   
        cmpMesh.pivot.translateX(1);
       
        let white: f.Color = new f.Color(1,1,1,1);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(white));
        let mtrCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        cubenode.addComponent(mtrCmp);


        let camera: f.ComponentCamera = new f.ComponentCamera();
        //f.Matrix4x4()

       

        


        let leftPlayerNode: f.Node = new f.Node("Player");

        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);

        let leftPlayerMesh: f.MeshQuad = new f.MeshQuad();
        let cmpLeftPlayerMesh: f.ComponentMesh = new f.ComponentMesh(leftPlayerMesh);
        leftPlayerNode.addComponent(cmpLeftPlayerMesh);
   

        let red: f.Color = new f.Color(1,0,0,1);
        
        cmpLeftPlayerMesh.pivot.translateX(-20);

        let mtrSolidRed: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrRedCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidRed);
        leftPlayerNode.addComponent(mtrRedCmp);

        cmpLeftPlayerMesh.pivot.translateY(3);

        


        let rightPlayerNode: f.Node = new f.Node("Player2");

        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);

        let rightPlayerMesh: f.MeshQuad = new f.MeshQuad();
        let cmprightPlayerMesh: f.ComponentMesh = new f.ComponentMesh(rightPlayerMesh);
        rightPlayerNode.addComponent(cmprightPlayerMesh);
   

        let green: f.Color = new f.Color(0,1,0,1);
        
        cmprightPlayerMesh.pivot.translateX(20);

        let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrGreenCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidGreen);
        rightPlayerNode.addComponent(mtrGreenCmp);

        cmprightPlayerMesh.pivot.translateY(3);






        mainnode.appendChild(leftPlayerNode);
        mainnode.appendChild(rightPlayerNode);


        camera.pivot.translateZ(40);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", mainnode, camera, canvas);
   
        

        cmpMesh.pivot.rotateZ(0);

       


        //cubenode.getComponent(f.ComponentMesh)

        
        viewport.draw();

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

}