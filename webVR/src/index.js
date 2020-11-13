
import * as THREE from '../libraries/three/three.module.js';
import {
    OrbitControls
} from '../libraries/three/jsm/OrbitControls.js';
import {
    GLTFLoader
} from '../libraries/three/jsm/GLTFLoader.js';
import {
    RGBELoader
} from '../libraries/three/jsm/RGBELoader.js';
import {
    LoadingBar
} from '../libraries/LoadingBar.js';
import {
    VRButton
} from '../libraries/VRButton.js';
import {
    XRControllerModelFactory
} from '../libraries/three/jsm/XRControllerModelFactory.js';
import {
    Stats
} from '../libraries/stats.module.js';
import {
    CanvasUI
} from '../libraries/CanvasUI.js';

class App {

    constructor() {
        const container = document.createElement('div');
        document.body.appendChild(container);

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 5000000);
        this.camera.position.set(0, 1.6, 0);

        // SCENE
        this.scene = new THREE.Scene();
//        this.scene.castShadow = true;
//        this.scene.receiveShadow = true;
        this.scene.background = new THREE.Color(0xaaaaaaa);

        this.dolly = new THREE.Group();
        this.dolly.position.set(0, 0, 2.0);
        this.dolly.add(this.camera);
        this.scene.add(this.dolly);

        //RENDERER
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setClearColor(0xcccccc);
        container.appendChild(this.renderer.domElement);
        this.setEnvironment();
//        this.renderer.shadowMap.enabled = true;
//        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autorotate = true;
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 1;
         this.controls.minDistance = 10;
         this.controls.maxDistance = 400;
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.update();
                

//         LIGHTING
        var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(200, 13%, 75%)'), 0.3);
        keyLight.position.set(-700, 60, 0);
        keyLight.castShadow = true;

        var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(53, 13%, 75%)'), 0.75);
        fillLight.position.set(100, 0, 100);
        fillLight.castShadow = true;


        var backLight = new THREE.DirectionalLight(0xffffff, 0.55);
        backLight.position.set(100, 0, -100).normalize();
        backLight.castShadow = true;

        var ambientLight = new THREE.AmbientLight(0xCECBB3, 0.25); // soft white light

        var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
        hemisphereLight.position.set(100, 0, -100).normalize();
        hemisphereLight.castShadow = true;

        this.scene.add(keyLight);
        this.scene.add(fillLight);
        this.scene.add(backLight);
        this.scene.add(ambientLight);
        this.scene.add(hemisphereLight);


        this.loadingBar = new LoadingBar();
        this.loadModels();
        
        this.renderer.setAnimationLoop (this.render.bind(this));

        window.addEventListener('resize', this.resize.bind(this));

        //        //MODELS
        //        this.modelsPath = '../models/glbModels/';


    }

    setEnvironment() {
        const loader = new RGBELoader().setDataType(THREE.UnsignedByteType);
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();

        const self = this;

        loader.load('../webVR/assets/hdr/field_sky.hdr', (texture) => {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            pmremGenerator.dispose();

            self.scene.environment = envMap;

        }, undefined, (err) => {
            console.error('An error occurred setting the environment');
        });
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    loadModels() {

        var loader = new GLTFLoader();
        var self = this;

        //MAIN BUILDING ELEMENTS
        loader.load('models/glbModels/building.glb', function (gltf) {
            var building = gltf.scene;
            self.scene.add(building);
            self.building = building;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
         //WOODEN FACADE
        loader.load('models/glbModels/woodenFacade.glb', function (gltf) {
            var wooden = gltf.scene;
            self.scene.add(wooden);
            self.wooden = wooden;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
        
        
        //SITE
        loader.load('models/glbModels/landscape.glb', function (gltf) {
            var site = gltf.scene;
            self.scene.add(site);
            self.site = site;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
         //FIGURES
        loader.load('models/glbModels/figures.glb', function (gltf) {
            var figures = gltf.scene;
            self.scene.add(figures);
            self.figures = figures;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
        //EXTERIOR FACADE
        loader.load('models/glbModels/exteriorFacade.glb', function (gltf) {
            var exterior = gltf.scene;
            self.scene.add(exterior);
            self.exterior = exterior;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        //MULLIONS
        loader.load('models/glbModels/mullions.glb', function (gltf) {
            var mullions = gltf.scene;
            self.scene.add(mullions);
            self.mullions = mullions;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        //GLASS
        loader.load('models/glbModels/glass.glb', function (gltf) {
            var glass = gltf.scene;
            self.scene.add(glass);
            self.glass = glass;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
        //PAVEMENT
        loader.load('models/glbModels/pavement.glb', function (gltf) {
            var pavement = gltf.scene;
            self.scene.add(pavement);
            self.exterior = pavement;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
        //PERGOLAS
        loader.load('models/glbModels/pergolas.glb', function (gltf) {
            var pergolas = gltf.scene;
            self.scene.add(pergolas);
            self.pergolas = pergolas;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        
        //TERRACES
        loader.load('models/glbModels/terraces.glb', function (gltf) {
            var terraces = gltf.scene;
            self.scene.add(terraces);
            self.terraces = terraces;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        //TERRACE SIDINGS
        loader.load('models/glbModels/terraceSidings.glb', function (gltf) {
            var sidings = gltf.scene;
            self.scene.add(sidings);
            self.sidings = sidings;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
        //PLANTERS
        loader.load('models/glbModels/planters.glb', function (gltf) {
            var planters = gltf.scene;
            self.scene.add(planters);
            self.planters = planters;

            self.loadingBar.visible = false;

                            self.setupXR();
        });
        
    
        
        
        
//         called while loading is progressing
//        			function ( xhr ) {
//        
//        				self.loadingBar.progress = (xhr.loaded / xhr.total);
//        				
//        			},
//        			// called when loading has errors
//        			function ( error ) {
//        
//        				console.log( 'An error happened' );
//        
//        			}


    }


    createUI() {
        const headerHeight = 50;
        const panelHeight = 512;
        const footerHeight = headerHeight;

        const self = this;

        let questionIndex = -1;
        let answerIndex = 0;

        function showIntro() {
            self.ui.updateElement("header", "Intro");
            self.ui.updateElement("panel", self.questions.intro);
            self.ui.updateConfig("prev", "display", "none");
            self.ui.updateConfig("next", "display", "none");
            self.playSound(`intro`);
            questionIndex = 0;
            answerIndex = -1;
        }

        function showOption() {

        }

        function showQuestion() {

        }

        function onPrev() {
            answerIndex--;
            showOption();
        }

        function onNext() {
            answerIndex++;
            showOption();
        }

        function onContinue() {
            if (questionIndex < 0) {
                questionIndex = 0;
                showQuestion();
                answerIndex = -1;
            } else if (answerIndex == -1) {
                answerIndex = 0;
                showOption();
            } else {
                const question = self.questions.questions[questionIndex];
                questionIndex = question.options[answerIndex].next;
                if (questionIndex == -1) {
                    showIntro();
                } else {
                    answerIndex = -1;
                    showQuestion();
                }
            }
        }

        const config = {
            renderer: this.renderer,
            panelSize: {
                width: 0.8,
                height: 1.3
            },
            width: 512,
            height: panelHeight,
            opacity: 0.7,
            body: {
                fontFamily: 'Arial',
                fontSize: 30,
                padding: 20,
                backgroundColor: '#000',
                fontColor: '#fff',
                borderRadius: 6,
                border: {
                    width: 2,
                    color: "#fff",
                    style: "solid"
                },
                opacity: 0.7
            },
            header: {
                type: "text",
                position: {
                    x: 0,
                    y: 0
                },
                height: headerHeight
            },
            panel: {
                type: "text",
                position: {
                    x: 0,
                    y: headerHeight
                },
                height: panelHeight - headerHeight - footerHeight,
                backgroundColor: "#ffa",
                fontColor: "#000",
                overflow: "scroll",
                leading: 5
            },
            prev: {
                display: 'none',
                type: "button",
                position: {
                    x: 0,
                    y: panelHeight - footerHeight + 5
                },
                width: footerHeight,
                height: footerHeight,
                fontColor: "#ff4",
                onSelect: onPrev
            },
            next: {
                display: 'none',
                type: "button",
                position: {
                    x: footerHeight,
                    y: panelHeight - footerHeight + 5
                },
                width: footerHeight,
                height: footerHeight,
                fontColor: "#ff4",
                onSelect: onNext
            },
            continue: {
                type: "button",
                position: {
                    x: 212,
                    y: panelHeight - footerHeight
                },
                textAlign: "right",
                width: 300,
                height: footerHeight,
                hover: "#ff0",
                fontColor: "#ff4",
                onSelect: onContinue
            }
        }
        const content = {
            header: "Intro",
            panel: self.questions.intro,
            prev: "<path>m 5 20 l 35 35 l 35 5 z</path>",
            next: "<path>m 35 20 l 5 5 l 5 35 z</path>",
            continue: "Continue"
        }

        const ui = new CanvasUI(content, config);
        ui.mesh.position.set(-0.5, 1.0, -2);
        ui.mesh.rotation.x = -0.2;
        ui.mesh.material.opacity = 0.7;

        this.dolly.add(ui.mesh);

        this.ui = ui;
    }


    //XR FUNCTION
    setupXR() {
        this.renderer.xr.enabled = true;

        const self = this;

        function onSessionStart() {
            // create a global audio source
            if (self.speech === undefined) {
                const atmos = new THREE.Audio(self.listener);

                // load a sound and set it as the Audio object's buffer
                const audioLoader = new THREE.AudioLoader();
                audioLoader.load('audio/atmos.mp3', (buffer) => {
                    atmos.setBuffer(buffer);
                    atmos.setLoop(true);
                    atmos.setVolume(0.5);
                    atmos.play();
                });

                self.atmos = atmos;

                self.speech = new THREE.Audio(self.listener);
            } else {
                self.atmos.play();
            }
            self.playSound('intro');
        }

        function onSessionEnd() {
            if (self.speech && self.speech.isPlaying) self.speech.stop();
            if (self.atmos && self.atmos.isPlaying) self.atmos.pause();
        }

        function onDisconnected(event) {
            const controller = event.target;
            if (controller.children.length > 0) controller.remove(controller.children[0]);
            if (controller == self.controller) {
                self.controller = null;
                self.controllerGrip = null;
            } else {
                self.controller1 = null;
                self.controllerGrip1 = null;
            }
        }

        function onSelect(event) {

            if (self.ui !== undefined) self.ui.select();

        }

        const button = new VRButton(this.renderer, {
            onSessionStart,
            onSessionEnd
        });

        // controller
        this.controller = this.renderer.xr.getController(0);
        this.controller.addEventListener('select', onSelect);
        //this.controller.addEventListener( 'disconnected', onDisconnected );
        this.dolly.add(this.controller);

        const controllerModelFactory = new XRControllerModelFactory();

        this.controllerGrip = this.renderer.xr.getControllerGrip(0);
        this.controllerGrip.add(controllerModelFactory.createControllerModel(this.controllerGrip));
        this.dolly.add(this.controllerGrip);

        // controller
        this.controller1 = this.renderer.xr.getController(1);
        this.controller1.addEventListener('select', onSelect);
        this.controller.addEventListener( 'disconnected', onDisconnected );
        this.dolly.add(this.controller1);

        this.controllerGrip1 = this.renderer.xr.getControllerGrip(1);
        this.controllerGrip1.add(controllerModelFactory.createControllerModel(this.controllerGrip1));
        this.dolly.add(this.controllerGrip1);


        const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);

        const line = new THREE.Line(geometry);
        line.name = 'line';
        line.scale.z = 0;

        this.controller.add(line.clone());
        this.controller1.add(line.clone());

        this.selectPressed = false;

        this.renderer.setAnimationLoop(this.render.bind(this));
    }


    handleController(controller) {
        this.workingMatrix.identity().extractRotation(controller.matrixWorld);

        this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.workingMatrix);

        const intersects = this.raycaster.intersectObject(this.ui.mesh);

        if (intersects.length > 0) {
            this.ui.hover(intersects[0].point);
            controller.children[0].scale.z = intersects[0].distance;
        } else {
            this.ui.hover();
            controller.children[0].scale.z = 10;
        }
    }


    render() {
//        const dt = this.clock.getDelta();
//        if (this.mixer !== undefined) this.mixer.update(dt);
//        if (this.renderer.xr.isPresenting) {
//            if (this.ui !== undefined) this.ui.update();
//            this.handleController(this.controller);
//        }
//        this.stats.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export {
    App
};
