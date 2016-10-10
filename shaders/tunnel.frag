	// oldskool bumpmapping tunnel - 24/05/2016 .48am - spleen666@gmail.com

	#ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vUv;

    uniform float iGlobalTime;
    uniform vec2 iResolution;

    uniform float bump_h;
    uniform float rel;
    uniform float speed;
    uniform sampler2D texture0;
    uniform sampler2D texture1;

    #define time iGlobalTime
    #define resolution iResolution.xy

	void main() {

		vec2 uv = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
		vec3 color = vec3(0);

		float time = time;
        float  r_inv  = 1./length(uv*2.);

        uv *= r_inv ;     
        time *= speed;

        float bump_height = 5.;
        
        float v1 = texture2D( texture1, uv+vec2(rel, 0.0) - vec2( r_inv + time,0.) ).r;
        float v2 = texture2D( texture1, uv+vec2(-rel, 0.0) - vec2( r_inv +time, 0.) ).r;
        float v3 = texture2D( texture1, uv+vec2(0.0, rel) - vec2( r_inv +time,0.) ).r;
        float v4 = texture2D( texture1, uv+vec2(0.0, -rel) - vec2( r_inv +time,0.) ).r;

        float bumpx = (v2-v1)*bump_h;
        float bumpy = (v3-v4)*bump_h;

        float light = 1. - length( vec2(uv+ r_inv -1.)-vec2(bumpx,bumpy) );

        color = texture2D(texture0, uv - vec2( r_inv + time, 0.)  ).rgb * light;

		gl_FragColor = vec4(color, 1.0);
	}
