import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ArtistInfo {
  'bio' : string,
  'name' : string,
  'contactEmail' : string,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface Work {
  'id' : bigint,
  'title' : string,
  'description' : [] | [string],
  'imageUrl' : string,
}
export interface _SERVICE {
  'addWork' : ActorMethod<[string, string, [] | [string]], Result>,
  'getArtistInfo' : ActorMethod<[], ArtistInfo>,
  'getWorks' : ActorMethod<[], Array<Work>>,
  'updateArtistInfo' : ActorMethod<[string, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
