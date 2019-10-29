namespace L02FirstFudge {
    import f = FudgeCore;
    
    window.addEventListener("load", handleLoad);
  
    
    export let viewport: f.Viewport;

    let mainnode: f.Node = new f.Node("Main");
    let cubenode: f.Node = new f.Node("Ball");
    let rightPlayerNode: f.Node = new f.Node("Player1");
    let leftPlayerNode: f.Node = new f.Node("Player2");


    function handleLoad(): void {
        
        //let cubenode: f.Node = new f.Node("Ball");
   
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
        viewport = new f.Viewport();
        viewport.initialize("Viewport", mainnode, camera, canvas);
        
        

        cmpMesh.pivot.rotateZ(0);

        let testnode: f.Node[] = mainnode.getChildren();
        f.Debug.log(testnode);
        //cubenode.getComponent(f.ComponentMesh)

        
        viewport.draw();

        f.Debug.log(mainnode);
    }
    
    function renderLeftPlayer(): f.Node {
  
        //let leftPlayerNode: f.Node = new f.Node("Player1");
  
        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);

        let leftPlayerMesh: f.MeshQuad = new f.MeshQuad();
        let cmpLeftPlayerMesh: f.ComponentMesh = new f.ComponentMesh(leftPlayerMesh);
        leftPlayerNode.addComponent(cmpLeftPlayerMesh);
   

        let red: f.Color = new f.Color(1,0,0,1);
        
        //cmpLeftPlayerMesh.pivot.translateX(-20);

        let mtrSolidRed: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(red));
        let mtrRedCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidRed);
        leftPlayerNode.addComponent(mtrRedCmp);


        //f.Debug.log(leftPlayerNode.cmpTransform.local);

        (<f.ComponentMesh>leftPlayerNode.getComponent(f.ComponentMesh)).pivot.scaleY(3);

        let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
        leftPlayerNode.addComponent(cmpTransform);
        cmpTransform.local.translateX(-20);

        return leftPlayerNode;
    }


    function renderRightPlayer(): f.Node {
  

        //let rightPlayerNode: f.Node = new f.Node("Player2");

        //let cube: f.ComponentMesh = cubenode.getComponent(f.ComponentMesh);

        let rightPlayerMesh: f.MeshQuad = new f.MeshQuad();
        let cmprightPlayerMesh: f.ComponentMesh = new f.ComponentMesh(rightPlayerMesh);
        rightPlayerNode.addComponent(cmprightPlayerMesh);
   

        let green: f.Color = new f.Color(0,1,0,1);
        
        //cmprightPlayerMesh.pivot.translateX(20);

        let mtrSolidGreen: f.Material = new f.Material("SolidGreen", f.ShaderUniColor, new f.CoatColored(green));
        let mtrGreenCmp: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidGreen);
        rightPlayerNode.addComponent(mtrGreenCmp);

        //cmpTransform.local.translateX(20);
        //rightPlayerNode.addComponent(cmpTransform);
        //let cmpTransform: f.ComponentTransform = new f.ComponentTransform();

        (<f.ComponentMesh>rightPlayerNode.getComponent(f.ComponentMesh)).pivot.scaleY(3);

        return rightPlayerNode;
    }

            

    window.addEventListener("keydown", event => {
        if (event.keyCode === 87) {

            //let movingNode: f.Node[] = mainnode.getChildrenByName("Player1");
           //   let comp: f.Component[] = movingNode[0].getAllComponents();
            //f.Debug.log(comp);
          let mesh: f.ComponentMesh = rightPlayerNode.getComponent(f.ComponentMesh);

          mesh.pivot.translateY(1);
            rightPlayerNode.cmpTransform.local.translateY(2);
          //let node: f.Node[] = mainnode.getChildren("leftPlayerNode");

          
          //node[0].getComponents()
            viewport.draw();



            f.Debug.log("leftPlayerNode");

         
        }
        // do something
      });

    window.addEventListener("keydown", event => {
        if (event.keyCode === 83) {

        
        let mesh: f.ComponentMesh = rightPlayerNode.getComponent(f.ComponentMesh);

        mesh.pivot.translateY(-1);
        rightPlayerNode.cmpTransform.local.translateY(-1);
    
        viewport.draw();

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

}