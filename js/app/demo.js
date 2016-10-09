define([
    "domready",
    "detector",
    "rstats",
    "datgui",
    "twgl",
    "twgldemo"

], function(domReady, Detector, rStats, dat, twgl, TWGLDemo) {

    "use strict";

    var demo,
        stats,

        time = 0,

        ui,

        delta, now,
        then = Date.now(),
        fps = 60,
        fr = 1000 / fps,

        ui_obj = {
            relief: .005,
            speed: .1,
            bump: 3.0
        },

        rstats_obj = {
            values: {
                frame: {
                    caption: 'frame time (ms)',
                    over: 16.67
                },
                raf: {
                    caption: 'last rAF (ms)'
                },
                fps: {
                    caption: 'frame rate (FPS)',
                    below: 30
                }
            }
        },

        textures,

        ready = function() {

            if (!Detector.webgl) {
                var msg = Detector.getWebGLErrorMessage();
                document.body.appendChild(msg);
                return;
            }

            var fragSrc = require("../../shaders/tunnel.frag");
            var vertSrc = null;

            stats = new rStats(rstats_obj);

            
            console.log( dat );

            demo = new TWGLDemo( document.getElementById("canvas"), vertSrc, fragSrc, textures);

            var gl = demo.renderer;
            textures = twgl.createTextures(gl, {
                  texture0 : { src: "textures/tx1.jpg", mag: gl.NEAREST },
                  texture1 : { src: "textures/tx1_height.png", mag: gl.NEAREST }
            });

            ui = new dat.GUI();


             var folder = ui.addFolder('controls');
            folder.add(ui_obj, "relief", 0.0, 0.2).name("relief").onChange(update_ui);
            folder.add(ui_obj, "speed", 0.0, .25).name("speed").onChange(update_ui);
            folder.add(ui_obj, 'bump', 0.0, 8.0).name("bump").onChange(update_ui);
           
            folder.open();


            then = Date.now();
            render();
        },

        update_ui = function(){

        },

        maximize = function() {
            var el = document.querySelector("canvas");
            var fs = el.webkitRequestFullScreen || el.requestFullScreen || msRequestFullScreen;
            fs.call(el);
        },

        render = function() {

            stats('frame').start();
            stats('rAF').tick();
            stats('FPS').frame();

            requestAnimationFrame(render);

            //frame control
            now = Date.now();
            delta = now - then;

            if (delta > fr) {

                then = now - (delta % fr);

                time += 0.015;

                /*
                    uniform float bump_h;
                    uniform float rel;
                    uniform float speed;                    
                   
                                      { 
                        type: "float", 
                        value: 3.0, 
                        min: 0.0, 
                        max: 8.0, 
                        name: "bump_h", 
                        GUIName: "bump"
                      },
                      { 
                        type: "float", 
                        value: 0.005, 
                        min: 0.0, 
                        max: 0.010, 
                        name: "rel",
                        GUIName: "relief"
                      },
                      { 
                        type: "float", 
                        value: 0.1, 
                        min: 0.0, 
                        max: .20, 
                        name: "speed",
                        GUIName: "speed"
                      }
      
                    */

                demo.update(time, {
                    bump_h: ui_obj.bump,
                    speed: ui_obj.speed,
                    rel: ui_obj.relief,
                    texture0: textures["texture0"],
                    texture1: textures["texture1"]
                });
            }

            stats('frame').end();
            stats().update();
        }


    domReady(ready);
})
