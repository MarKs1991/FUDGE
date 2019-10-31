
namespace L04_PongAnimated {

  interface KeyPressed {
      [code: string]: boolean;
  }

  import f = FudgeCore;
  let keysPressed: KeyPressed = {};

  window.addEventListener("load", hndLoad);
  let viewport: f.Viewport;

  let ball: f.Node = new f.Node("Ball");
  let paddleLeft: f.Node = new f.Node("PaddleLeft");
  let paddleRight: f.Node = new f.Node("PaddleRight");
  

  let ballSpeed: f.Vector3 = new f.Vector3(0.1, 0, 0);

  function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
      f.RenderManager.initialize();
      f.Debug.log(canvas);

      let pong: f.Node = createPong();

      let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
      cmpCamera.pivot.translateZ(42);


      paddleRight.cmpTransform.local.translateX(20);
      paddleLeft.cmpTransform.local.translateX(-20);
      paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(4);
      paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(4);

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

      if (keysPressed[f.KEYBOARD_CODE.ARROW_UP])
          paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
      if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN])
          paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
      if (keysPressed[f.KEYBOARD_CODE.W])
          paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
      if (keysPressed[f.KEYBOARD_CODE.S])
          paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));

      moveBall();
      //ball.cmpTransform.local.translation = new f.Vector3(20,5,0);
      
      if (detectHit(ball.cmpTransform.local.translation, paddleRight.cmpTransform.local))
        {
            f.Debug.log("right");
            ballSpeed.x * - 1;
            ballSpeed.y * - 1;
        }

      else if (detectHit(ball.cmpTransform.local.translation, paddleLeft.cmpTransform.local))
        {
            f.Debug.log("left");
        }

      f.RenderManager.update();
      viewport.draw();
  }

  function detectHit(_ballPos: f.Vector3, paddlePos: f.Matrix4x4): boolean
    {  
      let topLeft: f.Vector3 = (new f.Vector3(paddlePos.translation.x - paddlePos.scaling.x, paddlePos.translation.y + paddlePos.scaling.y, 0));
      let bottomRight: f.Vector3 = (new f.Vector3(paddlePos.translation.x + paddlePos.scaling.x, paddlePos.translation.y - paddlePos.scaling.y, 0));

      //f.Debug.log("tx: " + topLeft.x + "ty: " + topLeft.y + "bx: " + bottomRight.x + "by: " + bottomRight.y);

      //f.Debug.log(_ballPos.x + "      " + _ballPos.y)
      if (_ballPos.x > topLeft.x && _ballPos.y < topLeft.y){
            if (_ballPos.x < bottomRight.x && _ballPos.x > bottomRight.y){
                
                return true;
            }
            else{
                return false;
            }  
        }

        else {
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

      let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
      let meshQuad: f.MeshQuad = new f.MeshQuad();

      ball.addComponent(new f.ComponentMesh(meshQuad));
      paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
      paddleRight.addComponent(new f.ComponentMesh(meshQuad));

      ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
      paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
      paddleRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));

      ball.addComponent(new f.ComponentTransform());
      paddleLeft.addComponent(new f.ComponentTransform());
      paddleRight.addComponent(new f.ComponentTransform());

      pong.appendChild(ball);
      pong.appendChild(paddleLeft);
      pong.appendChild(paddleRight);

      return pong;
  }
}