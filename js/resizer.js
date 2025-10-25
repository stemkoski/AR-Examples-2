// this component determines bounding box of a loaded model
// and scales it to fit within a 1x1x1 box centered at 0,0,0.
// example use: to further change size and position
// <a-entity gltf-model="#creature" resizer="size:2.0; position:3 1 4;"></a-entity>

AFRAME.registerComponent('resizer', 
{
  schema: 
  { 
    size: { type: 'float', default: 1.0 },
    position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
  },

  init: function() 
  {
    this.el.addEventListener('model-loaded', () => {
        // code will execute after model has loaded
        console.log('model loaded, running component');
        let mesh   = this.el.getObject3D('mesh');
        let bounds = new THREE.Box3().setFromObject(mesh);

        // vectors to store bounding box data
        let size = new THREE.Vector3();
        let center = new THREE.Vector3();

        // scale to fit within unit box by dividing by largest dimension
        bounds.getSize(size);
        let scaleFactor = this.data.size * 1.0 / Math.max(size.x, size.y, size.z);
        mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // update bound calculations
        bounds.setFromObject(mesh);
        
        // center the object at (0,0,0) by translating as needed
        bounds.getCenter(center);
        mesh.position.sub(center);
        // add new position
        mesh.position.add(this.data.position);
    });
  }
});