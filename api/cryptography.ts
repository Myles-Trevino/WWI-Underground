/*
	Copyright Myles Trevino
	Licensed under the Apache License, Version 2.0
	http://www.apache.org/licenses/LICENSE-2.0
*/


import Sodium from 'sodium-native';

import type * as Types from '../common/types';


// Hashes the given password with Argon2id.
export function hashPassword(password: string, salt?: Buffer): Types.Hash {

	const hashBytes= 16; // crypto_pwhash_argon2id_BYTES_MIN
	const saltBytes = 16; // crypto_pwhash_argon2id_SALTBYTES
	const operationsLimit = 2; // crypto_pwhash_argon2id_OPSLIMIT_INTERACTIVE
	const memoryLimit = 67108864; // crypto_pwhash_argon2id_MEMLIMIT_INTERACTIVE (64 MiB)

	const hash = Buffer.alloc(hashBytes);

	if(!salt){
		salt = Buffer.alloc(saltBytes);
		Sodium.randombytes_buf(salt);
	}

	Sodium.crypto_pwhash(hash, Buffer.from(password), salt, operationsLimit,
		memoryLimit, Sodium.crypto_pwhash_ALG_ARGON2ID13);

	return {hash, salt};
}


// Generates a cryptographically secure, random base-64 string.
export function generateRandomString(bytes = 32): string {

	const buffer = Buffer.alloc(bytes);
	Sodium.randombytes_buf(buffer);
	return buffer.toString('base64');
}
