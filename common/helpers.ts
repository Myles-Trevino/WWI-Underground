/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


// Sleeps for the given duration in milliseconds.
export async function sleep(milliseconds?: number): Promise<void> {
	await new Promise((resolve) => { setTimeout(resolve, milliseconds); });
}
