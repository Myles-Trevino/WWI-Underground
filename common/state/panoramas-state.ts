/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {makeAutoObservable} from 'mobx';
import * as Three from 'three';
import * as _ from 'lodash';

import type * as Types from '../types';


export default class PanoramasState {

	public readonly minimumFov = 35;
	public readonly maximumFov = 140;
	public readonly defaultFov = 110;

	public panoramas: Record<string, Types.Panorama> = {};
	public panoramaName?: string;
	public editMode = false;
	public fov = this.defaultFov;
	public rotation = new Three.Vector2();
	public camera = new Three.Camera();
	public viewNodeName?: string;
	public editNodeName?: string;
	public loading = true;


	// Constructor.
	public constructor(){ makeAutoObservable(this); }


	// Getters.
	public getPanorama(name?: string): Types.Panorama | undefined {
		const panoramaName = name ? name : this.panoramaName;
		if(!panoramaName) return undefined;
		const panorama = this.panoramas[panoramaName];
		return panorama;
	}

	public getDefinedPanorama(name?: string): Types.Panorama {
		const panorama = this.getPanorama(name);
		if(!panorama) throw new Error('No panorama loaded.');
		return panorama;
	}

	public getNode(name: string): Types.Node {
		const node = name ? this.getDefinedPanorama().nodes[name] : undefined;
		if(!node) throw new Error('Invalid node name.');
		return node;
	}


	// General setters.
	public setPanoramas(panoramas: Record<string, Types.Panorama>): void {
		this.panoramas = panoramas;
	}

	public setPanorama(name: string): void {
		this.panoramaName = name;
		if(!_.has(this.panoramas, name))
			this.panoramas[name] = {defaultRotation: {x: 0, y: 0}, nodes: {}};
	}

	public setDefaultRotation(rotation: Types.Rotation): void {
		this.getDefinedPanorama().defaultRotation = rotation;
	}

	public toggleEditMode(): void { this.editMode = !this.editMode; }

	public setFov(fov: number): void { this.fov = fov; }

	public setRotation(rotation: Three.Vector2): void { this.rotation = rotation; }

	public setCamera(camera: Three.Camera): void { this.camera = camera; }

	public setLoading(loading: boolean): void { this.loading = loading; }


	// Node setters.
	public addNode(name: string, node: Types.Node): void {
		this.getDefinedPanorama().nodes[name] = node;
	}

	public setViewNode(name: string | undefined): void { this.viewNodeName = name; }

	public setEditNode(name: string | undefined): void { this.editNodeName = name; }

	public setNodeName(name: string | undefined, newName: string): void {

		if(!name) return;

		// If the new name is already taken, throw an error.
		const panorama = this.getDefinedPanorama();
		if(_.has(panorama.nodes, newName))
			throw new Error('A node with this name already exists.');

		// Set the new name.
		const nodeCopy = _.cloneDeep(panorama.nodes[name]);
		delete panorama.nodes[name];
		panorama.nodes[newName] = nodeCopy;
	}

	public setNode(name: string, value: Types.Node): void {
		this.getDefinedPanorama().nodes[name] = value;
	}

	public deleteNode(name: string): void {
		delete this.getDefinedPanorama().nodes[name];
	}
}
