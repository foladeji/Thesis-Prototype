class SkyBox {

    constructor(_width, _height, _depth) {
        // Textures
        let texture_north = new THREE.TextureLoader().load('../testSkybox/textures/north.png');
        let texture_sky = new THREE.TextureLoader().load('../testSkybox/textures/top.png');
        let texture_west = new THREE.TextureLoader().load('../testSkybox/textures/west.png');
        let texture_south = new THREE.TextureLoader().load('../testSkybox/textures/south.png');
        let texture_ground = new THREE.TextureLoader().load('../testSkybox/textures/ground.png');
        let texture_east = new THREE.TextureLoader().load('../testSkybox/textures/east.png');

        let materials = [];
        // X+ EAST
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_east
        }));
        // X- WEST
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_west
        }));
        // Y+ SKY
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_sky
        }));
        // Y- GROUND
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_ground
        }));
        // Z- SOUTH
        materials.push(new THREE.MeshBasicMaterial({
            color: "#000000"
        }));
        // Z+ NORTH
        materials.push(new THREE.MeshBasicMaterial({
            map: texture_north
        }));


        materials.forEach(element => {
            element.side = THREE.BackSide;
        });

        // Geometry 
        let skyBoxGeo = new THREE.BoxGeometry(_width, _height, _depth); // volumen in inches
        this.skyBox = new THREE.Mesh(skyBoxGeo, materials);

    }

    addToScene(scene) {
        scene.add(this.skyBox);
    }

}