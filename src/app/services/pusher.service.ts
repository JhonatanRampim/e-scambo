import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
const PUSHER_API_KEY = '4b3cc172e338959251f6';
const PUSHER_CLUSTER = 'us2';

@Injectable()
export class PusherService {
    private _pusher: any;

    constructor() {
        this._pusher = new Pusher(PUSHER_API_KEY, {
            cluster: PUSHER_CLUSTER,
        });
    }
    // any time it is needed we simply call this method
    getPusher() {
        return this._pusher;
    }

}