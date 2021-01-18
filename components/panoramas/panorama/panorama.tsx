/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import React, {useContext, useEffect, useRef} from 'react';
import {observer} from 'mobx-react-lite';
import * as Three from 'three';

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

let panorama: Types.Panorama | undefined = undefined;
let previousPointerPosition: Three.Vector2 | undefined = undefined;
let pointerPosition: Three.Vector2 | undefined = undefined;
let dragging = false;
let fovVelocity = 0;
const rotationVelocity = new Three.Vector2();
const rotation = new Three.Vector2();
let animationFrameHandle: number | undefined = undefined;
let firstRender = true;


export default observer(function Panorama(): JSX.Element {

	const state = useContext(StateContext);

	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);


	// Reinitialize when the selected panorama changes.
	useEffect(() => { initializer(); }, [state.panoramas.panoramaName]);


	// Returns a euler created from the current rotation.
	function getEuler(): Three.Euler {
		return new Three.Euler(-rotation.y, -rotation.x, 0, 'YXZ');
	}


	// Initializer.
	async function initializer(): Promise<void> {

		try {
			// Return if there is no panorama loaded.
			panorama = state.panoramas.getPanorama();
			if(!panorama) return;

			// Set the loading message.
			state.app.setMessage('Loading panorama.');
			state.panoramas.setLoading(true);

			// Get the panorama container.
			const container = containerRef.current;
			if(!container) throw new Error('No panorama container.');

			// Create the scene if necessary.
			if(!scene) scene = new Three.Scene();

			// Load the cubemap.
			await Helpers.sleep(80); // Wait for content to update before loading.
			const texture = await new Promise<Three.CubeTexture>((resolve) => {

				if(!state.panoramas.panoramaName) throw new Error('No panorama.');

				new Three.CubeTextureLoader()
					.setPath(`/images/${state.panoramas.panoramaName}/`)
					.load(['r.webp', 'l.webp', 'u.webp',
						'd.webp', 'f.webp', 'b.webp'], resolve);
			});

			scene.background = texture;

			// Create the camera if necessary.
			if(!camera) camera = new Three.PerspectiveCamera(state.panoramas.defaultFov,
				window.innerWidth/window.innerHeight, nearClip, farClip);

			// Set the default FOV and rotation.
			camera.fov = state.panoramas.defaultFov;
			state.panoramas.setFov(state.panoramas.defaultFov);
			rotation.set(panorama.defaultRotation.x, panorama.defaultRotation.y);
			camera.setRotationFromEuler(getEuler());
			camera.updateProjectionMatrix();

			// Create the renderer if necessary.
			if(!renderer){
				const canvas = canvasRef.current;
				if(!canvas) throw new Error('No panorama canvas.');
				renderer = new Three.WebGLRenderer({canvas});
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(window.innerWidth, window.innerHeight);
			}

			container.appendChild(renderer.domElement);

			// Bind the event callbacks.
			container.style.touchAction = 'none';
			window.removeEventListener('resize', onWindowResize);
			window.addEventListener('resize', onWindowResize);

			document.removeEventListener('pointerup', onPointerUp);
			document.addEventListener('pointerup', onPointerUp);

			// Set the loading message.
			state.app.setMessage('Loaded.');

			// Start updating.
			firstRender = true;
			if(animationFrameHandle !== undefined)
				cancelAnimationFrame(animationFrameHandle);
			update();
		}

		catch(error: unknown){ state.app.setErrorMessage(error as Error); }
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
		const fovRotationSpeedModifier = state.panoramas.fov*0.015;
		rotationVelocity.add(pointerDelta.multiplyScalar(
			rotationSpeed*fovRotationSpeedModifier));

		if(rotationVelocity.length() > minimumVelocity){
			rotationVelocity.divideScalar(rotationDamping);
			rotation.add(rotationVelocity);
			rotation.y = Three.MathUtils.clamp(rotation.y, -pitchLimit, pitchLimit);
			camera.setRotationFromEuler(getEuler());
		}

		else rotationVelocity.set(0, 0);

		// Update the FOV.
		if(Math.abs(fovVelocity) > minimumVelocity){
			fovVelocity /= fovDamping;
			state.panoramas.setFov(Three.MathUtils.clamp(state.panoramas.fov+fovVelocity,
				state.panoramas.minimumFov, state.panoramas.maximumFov));
			camera.fov = state.panoramas.fov;
		}

		else fovVelocity = 0;

		// Update the camera if necessary.
		if(rotationVelocity.length() !== 0 || fovVelocity !== 0){
			camera.updateProjectionMatrix();
			state.panoramas.setCamera(camera.clone());
		}

		// Render.
		renderer.render(scene, camera);
		animationFrameHandle = requestAnimationFrame(update);

		if(firstRender){
			firstRender = false;
			state.panoramas.setCamera(camera.clone());
			state.panoramas.setLoading(false);
		}
	}


	// Window resize event callback.
	function onWindowResize(): void {
		if(!camera || !renderer) return;
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
		state.panoramas.setCamera(camera.clone());
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
	function onPointerMove(event: React.PointerEvent): void {
		if(!event.isPrimary) return;
		if(!pointerPosition) pointerPosition = new Three.Vector2();
		console.log('Move');
		pointerPosition.set(event.clientX, event.clientY);
	}


	// Pointer up callback.
	function onPointerUp(event: PointerEvent): void {
		if(!event.isPrimary) return;
		console.log('Up');
		dragging = false;
	}


	// Wheel event callback.
	function onWheel(event: React.WheelEvent): void {
		if(!camera) return;
		fovVelocity += event.deltaY*fovSpeed;
	}


	// Sets the panorama's default rotation.
	function setDefaultRotation(): void {
		state.panoramas.getDefinedPanorama().defaultRotation = rotation.clone();
		state.app.setMessage('Default rotation set.');
	}


	// Render.
	const editModeInformation =
		<div className={Styles.editModeInformation}>
			<span>Edit Mode</span>
			<span>Panorama: {state.panoramas.panoramaName}</span>
			<button onClick={setDefaultRotation}>Set Default Rotation</button>
		</div>;

	return (
		<div ref={containerRef}>

			{/* Canvas. */}
			<canvas ref={canvasRef} className={Styles.canvas} onWheel={onWheel}
				onPointerDown={onPointerDown} onPointerMove={onPointerMove}></canvas>

			{/* Information. */}
			{state.panoramas.editMode && editModeInformation}

			{/* Crosshair. */}
			<div className={Styles.crosshair}></div>

		</div>
	);
});
