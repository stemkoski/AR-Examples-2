// work in progress. does not take camera position into account.

AFRAME.registerShader('orb-glow', {

    // declare shader parameters
    schema: 
    {
        color: {type:'color', is:'uniform', default:'blue'},
        opacity: {type:'number', is:'uniform', default:1.0},
        time: {type: 'time', is: 'uniform'},
    },
    
    vertexShader:
    `
    precision mediump float;
    uniform float time;
    varying vec3 vPos;
    varying vec2 vUV;
    varying vec3 vNormal;

    void main() 
    {
        vUV = uv;
        vPos = position;
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `,

    fragmentShader: 
    `
    precision mediump float;
    varying vec3 vPos;
    varying vec2 vUV;
    varying vec3 vNormal;

    // receive values from schema
    uniform vec3 color;
    uniform float opacity;
    uniform float time;

    void main () 
    {
        // float intensity = pow( 0.8 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 12.0 );
        gl_FragColor = vec4( color, opacity ); //  * intensity;
    }
    `

});
