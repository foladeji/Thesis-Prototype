/**
 * 
 */
class Node {

    constructor(_geometry, _material) {
        this.geometry = new THREE.SphereGeometry(5, 8, 8);
        if (_geometry) {
            this.geometry = _geometry;
        }
        this.material = new THREE.MeshPhongMaterial();
        if (_material) {
            this.material = _material;
        }
        //this.material.wireframe = true;
        this.material.castShadow = true;
        this.material.receiveShadow = true;

        // instance
        this.obj = new THREE.Mesh(this.geometry, this.material);
    }
    


    addToScene(scene) {
        scene.add(this.obj);
    }
}