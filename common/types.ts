/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


export type Position = {
	x: number;
	y: number;
	z: number;
};


export type NodeType = 'Information' | 'Navigation';

export type Node = {
	type: NodeType;
	size: number;
	position: Position;
	description?: string;
	panorama?: string;
};


export type Rotation = {
	x: number;
	y: number;
};

export type Panorama = {
	defaultRotation: Rotation;
	nodes: Record<string, Node>;
};
