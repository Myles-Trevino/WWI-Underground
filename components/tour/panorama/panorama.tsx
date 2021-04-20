/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {useContext, useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import classNames from 'classnames';
import * as Three from 'three';
import * as _ from 'lodash';

import type * as Types from '../../../common/types';
import * as Helpers from '../../../common/helpers';
import Styles from './panorama.module.scss';
import StateContext from '../../../common/state/state-context';


const nearClip = 0.1;
const farClip = 10;
const fovSpeed = 0.015;
const fovDamping = 1.25;
const rotationSpeed = Three.MathUtils.degToRad(0.03);
const rotationDamping = 1.25;
const pitchLimit = Three.MathUtils.degToRad(89);
const minimumVelocity = 0.0001;

let camera: Three.PerspectiveCamera | undefined = undefined;
let scene: Three.Scene | undefined = undefined;
let renderer: Three.WebGLRenderer | undefined = undefined;

let previousPointerPosition: Three.Vector2 | undefined = undefined;
let pointerPosition: Three.Vector2 | undefined = undefined;
let dragging = false;
let fovVelocity = 0;
const rotationVelocity = new Three.Vector2();
let animationFrameHandle: number | undefined = undefined;
let firstRender = true;

type Props = {demoMode?: boolean};


export default observer<React.PropsWithChildren<Props>>(function Panorama(
	{children, demoMode = false}): JSX.Element {

	const state = useContext(StateContext);
	let panorama: Types.Panorama | undefined = undefined;

	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);


	// Returns a euler created from the current rotation.
	function getEuler(): Three.Euler {
		return new Three.Euler(-state.tour.rotation.y,
			-state.tour.rotation.x, 0, 'YXZ');
	}


	// When the selected panorama changes, load it.
	useEffect(() => { load(); }, [state.tour.panorama]);

	async function load(): Promise<void> {

		try {
			// Return if already loading.
			if(state.tour.loading) return;

			// Return if there is no requested panorama.
			const requestedPanorama = state.tour.getPanorama();

			if(!requestedPanorama){
				panorama = undefined;
				return;
			}

			// Return if the requested panorama is already loaded.
			if(_.isEqual(panorama, requestedPanorama)) return;
			panorama = requestedPanorama;

			// Set the loading message.
			state.tour.setLoading(true);
			if(!demoMode) state.app.setMessage('Loading panorama...');

			// Get the panorama container.
			const container = containerRef.current;
			if(!container) throw new Error('No panorama container.');

			// Create the scene if necessary.
			if(!scene) scene = new Three.Scene();

			// Load the cubemap.
			await Helpers.sleep(80); // Wait for content to update before loading.
			const texture = await new Promise<Three.CubeTexture>((resolve) => {

				if(!panorama) throw new Error('No panorama.');

				new Three.CubeTextureLoader()
					.setPath(`${panorama.image}/`)
					.load(['r.webp', 'l.webp', 'u.webp',
						'd.webp', 'f.webp', 'b.webp'], resolve);
			});

			scene.background = texture;

			// Create the camera if necessary.
			if(!camera) camera = new Three.PerspectiveCamera(state.tour.defaultFov,
				window.innerWidth/window.innerHeight, nearClip, farClip);

			// Set the default FOV and rotation.
			camera.fov = state.tour.defaultFov;
			state.tour.setFov(state.tour.defaultFov);
			state.tour.setRotation(new Three.Vector2(
				panorama.defaultRotation.x, panorama.defaultRotation.y));
			camera.setRotationFromEuler(getEuler());
			camera.updateProjectionMatrix();

			// Create the renderer if necessary.
			const canvas = canvasRef.current;
			if(!canvas) throw new Error('No panorama canvas.');
			renderer = new Three.WebGLRenderer({canvas});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);

			// Bind the event callbacks.
			container.style.touchAction = 'none';
			window.removeEventListener('resize', onWindowResize);
			window.addEventListener('resize', onWindowResize);

			document.removeEventListener('pointerup', onPointerUp);
			document.addEventListener('pointerup', onPointerUp);
			document.addEventListener('pointermove', onPointerMove);

			// Set the loading message.
			if(!demoMode) state.app.setMessage('Loaded.');

			// Start updating.
			firstRender = true;
			if(animationFrameHandle !== undefined)
				cancelAnimationFrame(animationFrameHandle);
			update();
		}

		catch(error: unknown){ state.app.setErrorMessage(error); }
	}


	// Update callback.
	function update(): void {
		if(!renderer || !scene || !camera) return;

		// Update the pointer delta.
		const pointerDelta = new Three.Vector2(0, 0);

		if(pointerPosition){

			// Update the pointer delta.
			if(dragging && previousPointerPosition)
				pointerDelta.subVectors(previousPointerPosition, pointerPosition);

			// Update the previous pointer position.
			previousPointerPosition = pointerPosition.clone();
		}

		// Update the rotation.
		const fovRotationSpeedModifier = state.tour.fov*0.015;
		rotationVelocity.add(pointerDelta.multiplyScalar(
			rotationSpeed*fovRotationSpeedModifier));

		if(rotationVelocity.length() > minimumVelocity || demoMode){

			rotationVelocity.divideScalar(rotationDamping);
			const rotation = state.tour.rotation.clone();

			rotation.add(rotationVelocity);
			if(demoMode) rotation.add(new Three.Vector2(0.001, 0));

			rotation.y = Three.MathUtils.clamp(rotation.y, -pitchLimit, pitchLimit);
			state.tour.setRotation(rotation);
			camera.setRotationFromEuler(getEuler());
		}

		else rotationVelocity.set(0, 0);

		// Update the FOV.
		if(Math.abs(fovVelocity) > minimumVelocity){
			fovVelocity /= fovDamping;
			state.tour.setFov(Three.MathUtils.clamp(state.tour.fov+fovVelocity,
				state.tour.minimumFov, state.tour.maximumFov));
			camera.fov = state.tour.fov;
		}

		else fovVelocity = 0;

		// Update the camera if necessary.
		if(rotationVelocity.length() !== 0 || fovVelocity !== 0){
			camera.updateProjectionMatrix();
			state.tour.setCamera(_.cloneDeep(camera));
		}

		// Render.
		renderer.render(scene, camera);
		animationFrameHandle = requestAnimationFrame(update);

		if(firstRender){
			firstRender = false;
			state.tour.setCamera(_.cloneDeep(camera));
			state.tour.setLoading(false);
		}
	}


	// Window resize event callback.
	function onWindowResize(): void {
		if(!camera || !renderer) return;
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		state.tour.setCamera(_.cloneDeep(camera));
		renderer.setSize(window.innerWidth, window.innerHeight);
	}


	// Pointer down callback.
	function onPointerDown(event: React.PointerEvent): void {
		if(!event.isPrimary) return;
		const downPointerPosition = new Three.Vector2(event.clientX, event.clientY);
		pointerPosition = downPointerPosition.clone();
		previousPointerPosition = downPointerPosition.clone();
		dragging = true;
	}


	// Pointer move event callback.
	function onPointerMove(event: PointerEvent): void {
		if(!event.isPrimary) return;
		if(!pointerPosition) pointerPosition = new Three.Vector2();
		pointerPosition.set(event.clientX, event.clientY);
	}


	// Pointer up callback.
	function onPointerUp(event: PointerEvent): void {
		if(!event.isPrimary) return;
		dragging = false;
	}


	// Wheel event callback.
	function onWheel(event: React.WheelEvent): void {
		if(!camera) return;
		fovVelocity += event.deltaY*fovSpeed;
	}


	// Render.
	return (
		<div className={classNames(Styles.container, {[Styles.demoMode]: demoMode})}
			onWheel={onWheel} ref={containerRef}>

			{/* Canvas. */}
			<canvas ref={canvasRef} className={Styles.canvas}
				onPointerDown={onPointerDown}/>

			{/* Children. */}
			{children}

		</div>
	);
});
