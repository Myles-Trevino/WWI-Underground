/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import {makeAutoObservable} from 'mobx';
import * as Three from 'three';
import * as _ from 'lodash';

import type * as Types from '../types';


export default class TourState {

	public readonly minimumFov = 35;
	public readonly maximumFov = 140;
	public readonly defaultFov = 110;

	public id?: string;
	public tour?: Types.Tour;
	public panorama?: string;
	public editMode = false;
	public fov = this.defaultFov;
	public rotation = new Three.Vector2();
	public camera = new Three.Camera();
	public viewNodeName?: string;
	public editNodeName?: string;
	public loading = false;


	// Constructor.
	public constructor(){ makeAutoObservable(this); }


	// Setters.
	public reset(): void {
		this.id = undefined;
		this.tour = undefined;
		this.panorama = undefined;
		this.fov = this.defaultFov;
		this.rotation = new Three.Vector2();
		this.camera = new Three.Camera();
		this.viewNodeName = undefined;
		this.editNodeName = undefined;
	}

	public setTour(tour: Types.Tour, id: string): void {
		this.id = id;
		this.tour = tour;
		this.panorama = tour.defaultPanorama;
	}

	public setPanorama(panorama: string): void { this.panorama = panorama; }

	public toggleEditMode(): void { this.editMode = !this.editMode; }

	public setFov(fov: number): void { this.fov = fov; }

	public setRotation(rotation: Three.Vector2): void { this.rotation = rotation; }

	public setCamera(camera: Three.Camera): void { this.camera = camera; }

	public setLoading(loading: boolean): void { this.loading = loading; }


	// Getters.
	public getPanorama(name?: string): Types.Panorama | undefined {
		const panoramaName = name ? name : this.panorama;
		if(!panoramaName) return undefined;
		return this.tour?.panoramas[panoramaName];
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


	// Node setters.
	public addNode(name: string, node: Types.Node): void {
		const panorama = this.getDefinedPanorama();
		panorama.nodes[name] = node;
	}

	public addFeaturedNode(featuredNode: Types.FeaturedNode): void {
		this.tour?.featuredNodes.push(featuredNode);
	}

	public removeFeaturedNode(featuredNode: Types.FeaturedNode): void {
		const index = this.tour?.featuredNodes.indexOf(featuredNode);
		if((index !== undefined) && index > -1) {
			this.tour?.featuredNodes.splice(index, 1);
		}
		else throw new Error('Node not found.');
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
