// tutorial from https://www.youtube.com/watch?v=cp-H_6VODko

let renderer, scene, camera, controls;

init();



function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
   
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("skyBox").appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();
    //    scene.background = new THREE.Color('#DEFEFF');
     scene.castShadow = true;
     scene.receiveShadow = true;

    // Camera
   camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500000);
    camera.position.set(-720, 60, 0);

//     var helper = new THREE.CameraHelper(camera);
//     scene.add(helper);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autorotate = true;
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 1;
    // controls.minDistance = 10;
    // controls.maxDistance = 400;
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.update();

    // LIGHTING
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
    
    var hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 2 );
    hemisphereLight.position.set(100, 0, -100).normalize();
    hemisphereLight.castShadow = true;

    var spotLight1 = createSpotlight(0xf6cd8b);
    var spotLight2 = createSpotlight(0xf6cd8b);
    var spotLight3 = createSpotlight(0xf6cd8b);
    var spotLight4 = createSpotlight(0xf6cd8b);
    var spotLight5 = createSpotlight(0xf6cd8b);
    var spotLight6 = createSpotlight(0xf6cd8b);
    var spotLight7 = createSpotlight(0xf6cd8b);
    var spotLight8 = createSpotlight(0xf6cd8b);


    spotLight1.position.set(-1140, 250, -200);
    spotLight1.target.position.set(-1140, 0, -200);


    spotLight2.position.set(-990, 250, -200);
    spotLight2.target.position.set(-990, 0, -200);

    spotLight3.position.set(-840, 250, -200);
    spotLight3.target.position.set(-840, 0, -200);

    spotLight4.position.set(-690, 250, -200);
    spotLight4.target.position.set(-690, 0, -200);

    spotLight5.position.set(-540, 250, -200);
    spotLight5.target.position.set(-540, 0, -200);

    spotLight6.position.set(-280, 250, -200);
    spotLight6.target.position.set(-280, 0, -200);

    spotLight7.position.set(-150, 250, -200);
    spotLight7.target.position.set(-150, 0, -200);


    scene.add(spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight6, spotLight7);
    scene.add(spotLight1.target, spotLight2.target, spotLight3.target, spotLight4.target, spotLight5.target, spotLight6.target, spotLight7.target);




    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    scene.add(ambientLight);
    scene.add( hemisphereLight );

    
    //MATERIAL 
    
    
    //MAIN BUILDING ELEMENTS
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/building.glb', function (building) {
        // add model to scene
        scene.add(building.scene);
        
   

        //scaleModel(gltf, 12)
//        switchToWhite(building);

        building.scene.traverse(function (child) {
//            if (child instanceof THREE.Group) {
//                child.material = new THREE.MeshPhysicalMaterial();
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });

    }, undefined, function (error) {
        console.error(error);
    });

    
    
    //SITE
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/landscape.glb', function (site) {
        scene.add(site.scene);

        //scaleModel(gltf, 12)
        switchToGray(site);

        site.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
//            child.material = new THREE.MeshPhongMaterial();
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });

    }, undefined, function (error) {
        console.error(error);
    });

    
    
    //FIGURES
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/figures.glb', function (figures) {

        // add model to scene
        scene.add(figures.scene);

        //scaleModel(gltf, 12)
        switchToGris(figures);

        figures.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
//            child.material = new THREE.MeshPhongMaterial();
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        function switchToGris(model) {
    let objects = model.scene.children[0].children
    for (const object of objects) {
        object.material.color = new THREE.Color(0x400404);

    }
}
        
    }, undefined, function (error) {
        console.error(error);
    });


   
    //EXTERIOR FACADE
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/exteriorFacade.glb', function (pebbles) {

        // add model to scene
        scene.add(pebbles.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        pebbles.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });

    
    //MULLIONS
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/mullions.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });

    
    //GLASS
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/glass.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });

    
    //PAVEMENT
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/pavement.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });
    
    
    //PERGOLAS
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/pergolas.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });
    
    
    //TERRACES
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/terraces.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });
    
    
        //TERRACES SIDINGS
    var borders;
    var loader = new THREE.GLTFLoader();
    loader.load('models/glbModels/terraceSidings.glb', function (borders) {

        // add model to scene
        scene.add(borders.scene);

        //scaleModel(gltf, 12)
//        switchToGris(pebbles);

        borders.scene.traverse(function (child) {

//            if (child instanceof THREE.Group) {
            
                child.castShadow = true;
                child.receiveShadow = true;
//            }
        });
        
        

    }, undefined, function (error) {
        console.error(error);
    });
    
    
    
    
    
    
    //  **** NETWORK *****

//    // Axes
//    var axesHelper = new THREE.AxesHelper(50);
//    scene.add(axesHelper)
//
//    let nodes = [];
//    for (let i = 0; i < 30; i++) {
//        let tmp = new Node();
//        let posX = (Math.random() * 720);
//        let posY = (Math.random() * 24);
//        tmp.obj.position.set(posX, posY, -144)
//        translateNode(tmp, new THREE.Vector3(-1195, 24, -80))
//        nodes.push(tmp);
//        tmp.addToScene(scene);
//    }
//
//    // let nodeA = new Node();
//    // let nodeB = new Node();
//    // nodeA.obj.position.set(0, 0, -144);
//    // nodeB.obj.position.set(720, 0, -144);
//    // translateNode(nodeA, new THREE.Vector3(-1195, 24, -80))
//    // translateNode(nodeB, new THREE.Vector3(-1195, 24, -80))
//    // nodes.push(nodeA)
//    // nodes.push(nodeB)
//    // nodeA.addToScene(scene);
//    // nodeB.addToScene(scene);
//
//    let edges = [];
//
//    for (let i = 0; i < 100; i++) {
//        let sourceIndex = Math.floor(Math.random() * nodes.length);
//        let targetIndex = Math.floor(Math.random() * nodes.length);
//        if (sourceIndex == targetIndex) {
//            targetIndex = Math.floor(Math.random() * nodes.length);
//        }
//        let edgeST = new Edge(nodes[sourceIndex], nodes[targetIndex], Math.floor(Math.random() * 4));
//        edges.push(edgeST);
//        edgeST.addToScene(scene);
//    }


    animate();
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.render(scene, camera);
}

function switchToWhite(model) {
    let objects = model.scene.children[0].children
    for (const object of objects) {
        object.material.color = new THREE.Color(0xfcfcf4);

    }
}

function switchToGris(model) {
    let objects = model.scene.children[0].children
    for (const object of objects) {
        object.material.color = new THREE.Color(0x400404);

    }
}

function switchToGray(model) {
    let objects = model.scene.children[0].children
    for (const object of objects) {
        object.material.color = new THREE.Color(0x566573);
    }
}


function scaleModel(model, units) {
    let objects = model.scene.children[2].children
    for (const object of objects) {
        object.scale.set(units, units, units)
    }
}

function translateNode(node, vector) {
    let currentPos = node.obj.position;
    let newPosition = currentPos.add(vector)
    node.obj.position.set(newPosition.x, newPosition.y, newPosition.z);
}

function createSpotlight(color) {

    var spotLight = new THREE.SpotLight(color, 2);

    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 10;
    spotLight.penumbra = 0.2;
    spotLight.intensity = 6;
    spotLight.distance = 500;
    spotLight.decay = 6;



    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    return spotLight;

}
